const fs = require('fs')
const diff = require('deep-diff')
const files = ['geographic.json', 'projected.json', 'transformations.json', 'vertical-transformations.json', 'vertical.json']
const cwd = process.cwd()

/**
 * Given the paths to two versions of the proj-code repo, update key-value stores to capture any deletetions that have occured
 * in latest version
 * @param {string} previousVersionPath
 * @param {string} latestVersionPath
 */
function diffAndWrite (previousVersionPath, latestVersionPath) {
  files.forEach(file => {
    const latestJson = require(`${cwd}/${latestVersionPath}${file}`)
    const previousJson = require(`${cwd}/${previousVersionPath}${file}`)
    const currentDiff = require(`${cwd}/${file}`)
    const deleted = diffOmits(previousJson, latestJson)
    const merged = Object.assign({}, currentDiff, deleted)
    try {
      fs.writeFileSync(file, JSON.stringify(merged))
      console.log(`Wrote ${Object.keys(deleted).length} new key-values to ${file}`)
    } catch (err) {
      console.error(err)
    }
  })
}

/**
 * Find deleted JSON key-values by diffing latest and previous versions of a JSON file
 * @param {object} previousJSON file JSON from previous or prior version of the proj-codes repo
 * @param {object} latestJSON file JSON from latest version of the proj-codes repo
 */
function diffOmits (previousJSON, latestJSON) {
  const hash = {}
  // Diff the JSON
  const result = diff(previousJSON, latestJSON)

  // Filter out all items except deletions and add those to hash
  result.forEach(item => {
    if (item.kind === 'D') hash[item.path] = item.lhs
  })
  return hash
}

module.exports = { diffAndWrite }
