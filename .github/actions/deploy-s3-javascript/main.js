const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
    // Get input values
    const bucket = core.getInput('bucket', {required: true});
    const bucketRegion = core.getInput('bucket-region', {required: false});
    const distFolder = core.getInput('dist-folder', {required: true});

    // Construct the AWS CLI command
    let command = `aws s3 sync ${distFolder} s3://${bucket}`;
    if (bucketRegion) {
        command += ` --region ${bucketRegion}`;
    }

    // Upload files to S3
    try {
        await exec.exec(command);
        const websiteUrl = `https://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
    } catch (error) {
        core.setFailed(`Action failed with error: ${error}`);
    }
}

run();