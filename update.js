const fs = require('fs')
const del = require('del')
const { diffAndWrite } = require('./lib')
const oldTag = 'v1.0.3'
const latestTag = 'v1.0.4'
const Git = require("nodegit");
let repo

(async function () {
  try {
    // Checkout old release
    const repoOld = await Git.Clone("https://github.com/Esri/proj-codes", oldTag)
    const branchOld = await repoOld.getBranch(`refs/tags/${oldTag}`)
    await repoOld.checkoutRef(branchOld);

    // Checkout latest release
    const repoLatest = await Git.Clone("https://github.com/Esri/proj-codes", latestTag)
    const branchLatest = await repoLatest.getBranch(`refs/tags/${latestTag}`)
    await repoLatest.checkoutRef(branchLatest);

    // Diff the releases and write to JSON files
    diffAndWrite(`./${oldTag}/`, `./${latestTag}/`)
  } catch (err) {
    console.error(err)
  } finally {
    // Clean-up
    await del(`./${oldTag}`)
    await del(`./${latestTag}`)
  }
}) ()


// Compare Version 1.0.3 and 1.0.4.  Write any proj-codes in 1.0.3, but not in 1.0.4 to the appropriate JSON file
//diffAndWrite(version1_0_3, version1_0_4)