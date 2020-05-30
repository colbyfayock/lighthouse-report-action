const core = require('@actions/core');
const fs = require('fs');
const { performPageSpeedAudit } = require('./lib/pagespeed');

async function run() {
  try {
    const url = core.getInput('url');
    const outputDirectory = core.getInput('outputDirectory');

    console.log(`Performing audit on ${url}`);
    console.log(`Checking if ${outputDirectory} exists...`);

    if ( !fs.existsSync(outputDirectory) ){
      console.log(`Creating ${outputDirectory}`);
      fs.mkdirSync(outputDirectory);
    }

    console.log('Starting audit...');

    const { reportId } = await performPageSpeedAudit({
      url,
      outputDirectory
    });

    console.log(`Report is available in ${outputDirectory}`);
    console.log(`Completed audit ${reportId} on ${url}`);

    core.setOutput('reportId', reportId);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
