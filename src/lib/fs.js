const fs = require('fs');

/**
 * promiseToCreateFile
 */

function promiseToCreateFile({ path, content }) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, function(error) {
      if ( error ) {
        reject(error);
        return;
      }
      resolve();
    })
  });
}

module.exports.promiseToCreateFile = promiseToCreateFile;