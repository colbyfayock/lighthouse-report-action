const fs = require('fs');
const psi = require('psi');


/**
 * buildLighthouseCommand
 */

async function performLighthouseAudit({ url, outputDirectory } = {}) {
  const timestamp = Date.now();
  const reportId = `lighthouse-${timestamp}`;
  const outputPath = `./${outputDirectory}/${reportId}.json`

  try {
    const { data } = await psi(url);

    await promiseToCreateFile({
      path: outputPath,
      content: JSON.stringify(data, null, 2)
    });
  } catch(e) {
    console.log(`Failed to execute lighthouse: ${e.message}`);
    throw e;
  }

  return {
    reportId
  }
}

module.exports.performLighthouseAudit = performLighthouseAudit;

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