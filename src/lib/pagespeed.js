const psi = require('psi');

const { promiseToCreateFile } = require('./fs');

/**
 * performPageSpeedAudit
 */

async function performPageSpeedAudit({ url, outputDirectory } = {}) {
  const timestamp = Date.now();
  const reportId = `pagespeed-${timestamp}`;
  const outputPath = `./${outputDirectory}/${reportId}.json`

  try {
    const { data } = await psi(url);

    await promiseToCreateFile({
      path: outputPath,
      content: JSON.stringify(data, null, 2)
    });
  } catch(e) {
    console.log(`Failed to execute PageSpeed audit: ${e.message}`);
    throw e;
  }

  return {
    reportId
  }
}

module.exports.performPageSpeedAudit = performPageSpeedAudit;