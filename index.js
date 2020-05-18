const core = require('@actions/core');
const { performLighthouseAudit } = require('./lib/lighthouse');

async function run() {
  try {
    const url = core.getInput('url');

    console.log(`Performing audit on ${url}`);

    const { reportId } = await performLighthouseAudit(url);

    core.setOutput('reportId', reportId);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();