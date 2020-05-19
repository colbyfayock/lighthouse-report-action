const { exec } = require('child_process');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const LIGHTHOUSE_EXECUTABLE = './node_modules/lighthouse/lighthouse-cli/index.js';

const opts = {
  chromeFlags: ['--headless']
};

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({
    chromeFlags: opts.chromeFlags
  }).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results => {
      // use results.lhr for the JS-consumable output
      // https://github.com/GoogleChrome/lighthouse/blob/master/types/lhr.d.ts
      // use results.report for the HTML/JSON/CSV output as a string
      // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
      return chrome.kill().then(() => results.lhr)
    });
  });
}

function promiseToLaunchChromeAndRunLighthouse({ url }) {
  return new Promise((resolve) => {
    launchChromeAndRunLighthouse(url, opts).then(results => {
      resolve(results);
    });
  })
}

async function performLighthouseAudit({ url, outputDirectory } = {}) {
  const result = await promiseToLaunchChromeAndRunLighthouse({ url })
  console.log('result', result);
}

// /**
//  * buildLighthouseCommand
//  */

// async function performLighthouseAudit({ url, outputDirectory } = {}) {
//   const timestamp = Date.now();
//   const reportId = `lighthouse-${timestamp}`;
//   const command = buildLighthouseCommand({
//     url,
//     chromeFlags: '--headless',
//     outputType: 'json',
//     outputPath: `./${outputDirectory}/${reportId}.json`
//   });

//   try {
//     await promiseToExec(command);
//   } catch(e) {
//     console.log(`Failed to execute lighthouse: ${e.message}`);
//     throw e;
//   }

//   return {
//     reportId
//   }

// }

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