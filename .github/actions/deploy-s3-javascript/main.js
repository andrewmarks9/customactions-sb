const core = require('@actions/core');
const exec = require('@actions/exec');

function run () {
    // Get input values
    const bucket = core.getInput('bucket', {required: true});
    const bucketRegion = core.getInput('bucket-region', {required: false});
    const distFolder = core.getInput('dist-folder', {required: true});
    

    // upload files to S3
    const s3Uri = `s3://${bucket}`;
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri}`, { region: `${bucketRegion}` });

    core.notice('Hello from the deploy-s3-javascript action!');
}

run()