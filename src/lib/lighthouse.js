const { exec } = require('child_process');

const LIGHTHOUSE_EXECUTABLE = 'node_modules/lighthouse/lighthouse-cli/index.js';

/**
 * buildLighthouseCommand
 */

async function performLighthouseAudit(url) {
  const timestamp = Date.now();
  const reportId = `lighthouse-${timestamp}`;
  const command = buildLighthouseCommand({
    url,
    chromeFlags: '--headless',
    outputType: 'json',
    outputPath: `./reports/${reportId}.json`
  });

  try {
    await promiseToExec(command);
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
 * buildLighthouseCommand
 */

function buildLighthouseCommand({ url, chromeFlags, outputType, outputPath }) {
  const args = [];

  if ( chromeFlags ) {
    args.push(`--chrome-flags="${chromeFlags}"`);
  }

  if ( url ) {
    args.push(url);
  }

  if ( outputType ) {
    args.push(`--output="${outputType}"`);
  }

  if ( outputType ) {
    args.push(`--output-path="${outputPath}"`);
  }

  return `${LIGHTHOUSE_EXECUTABLE} ${args.join(' ')}`;
}

/**
 * promiseToExec
 */

function promiseToExec(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout, stderr);
    });
  })
}