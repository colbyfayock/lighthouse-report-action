const psi = require('psi');

const { promiseToCreateFile } = require('./fs');


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