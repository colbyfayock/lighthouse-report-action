const core = require('@actions/core');
const fs = require('fs');
const { performLighthouseAudit } = require('./lib/lighthouse');

async function run() {
  try {
    const url = core.getInput('url');
    const outputDirectory = core.getInput('outputDirectory');

    console.log(`Performing audit on ${url}`);

    if ( !fs.existsSync(outputDirectory) ){
      fs.mkdirSync(outputDirectory);
    }

    const { reportId } = await performLighthouseAudit({
      url,
      outputDirectory
    });

    core.setOutput('reportId', reportId);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();