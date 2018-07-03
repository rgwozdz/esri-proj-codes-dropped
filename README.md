# @esri/proj-codes-dropped

The official canonical list ESRI Coordinate Reference Systems (CRS) can be queried with [@esri/proj-codes](https://www.npmjs.com/package/@esri/proj-codes).  However, updates to the canonical list can drop codes that are still in use.  This module includes a look up for dropped codes and a utility for diffing successive versions of [@esri/proj-codes](https://www.npmjs.com/package/@esri/proj-codes).  

## Updating dropped codes

See [update.js](./update.js). Edit the `oldTag` and `latestTag` constants and run.