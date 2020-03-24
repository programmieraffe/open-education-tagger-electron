

See [https://github.com/programmieraffe/open-education-tagger] for all details

Little tool to sync a Google Drive Spreadsheet to an elasticsearch instance, using Bulk-API to minimize API usage. This will save spreadsheet-ID for each entry, before syncing all entries with the given spreadsheet will be cleared/deleted.

## Test it

1. `npm install`
2. `npm start`

(You can register a free elasticsearch instance at appbase.io or bonsai.io)

## 2DO:
- better solve "callback hell"
- implement config values for syncing
- copy all values to elasticsearch
- save them via electron-store
- implement index or update (not implemented right now)
- ! crossbrowser test
-  replace bootstrap & jquery with local installation, no cdn
- use https://www.npmjs.com/package/electron-workers ? (example: https://github.com/trusktr/electron-web-worker-example)
- clean up
- check last successful update & store it locally? (otherwise api limit will be reached)

- (later) command line output without developer tools?
- error handling
- add option for multiple spreadsheets
- use google spreadsheet ID row ? "id":{
               "$t":"https://spreadsheets.google.com/feeds/list/1gqRt0UxtcTNGKduQnTlV1MR3U5ByBkzCyTMkWE6wb04/od6/public/values/ciyn3"
            },

## How it was developed

template:
https://github.com/electron/simple-samples/tree/master/hash
(outdated, needs to be updated to latest electron, relies on nodeIntegration:true)

https://www.electronjs.org/docs/tutorial/first-app

add

"scripts": {
  "start": "electron .",


  npm install --save-dev electron


  npm start


  https://github.com/ccnokes/electron-tutorials/tree/master/storing-sensitive-data

  https://github.com/sindresorhus/electron-store

  npm install electron-store

  https://codeburst.io/build-a-todo-app-with-electron-d6c61f58b55a


Update old package dependencies:
https://flaviocopes.com/update-npm-dependencies/
