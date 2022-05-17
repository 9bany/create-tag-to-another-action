const core = require('@actions/core');
const github = require('@actions/github');
const sha256 = require('simple-sha256')

try {
    
    const token = core.getInput('token');
    const owner = core.getInput('owner');
    const reponame = core.getInput('reponame');
    const tag = core.getInput('tag');
    const message = core.getInput('message');
    const name = core.getInput('name');
    const email = core.getInput('email');

    createTag({
        personalToken: token,
        owner,
        reponame,
        tag,
        message,
        name,
        email,
    })
} catch (error) {
    core.setFailed(error.message);
}

async function createTag({
    personalToken,
    owner,
    reponame,
    tag,
    message,
    name,
    email,
}) {
    const octokit = new Octokit({
        auth: personalToken
    })
    const hash = await sha256(tag)
    const time = (new Date()).toTimeString();
    
    await octokit.request(`POST /repos/${owner}/${reponame}/git/tags`, {
        owner: owner,
        repo: reponame,
        tag: tag,
        message: !message ? tag : message,
        object: hash,
        type: 'commit',
        tagger: {
            name: name,
            email: email,
            date: time
        }
    })
}