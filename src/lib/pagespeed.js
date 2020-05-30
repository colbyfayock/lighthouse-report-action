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
    const report = {
      id: reportId,
      data
    }
    
    const reportPretty = JSON.stringify(report, null, 2);
    
    console.log(`Begin report ${reportId}...`);
    console.log(reportPretty);
    console.log(`End report ${reportId}...`);

    await promiseToCreateFile({
      path: outputPath,
      content: reportPretty
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
