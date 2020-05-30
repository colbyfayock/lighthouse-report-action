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
    console.log('Running PageSpeed Insights...');
    const { data } = await psi(url);
    console.log('Finished PageSpeed Insights...');

    const report = {
      id: reportId,
      data
    }

    const reportPretty = JSON.stringify(report, null, 2);

    console.log(reportPretty);

    console.log(`Creating report file ${outputPath}...`);
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
