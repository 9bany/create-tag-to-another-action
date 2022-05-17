const core = require('@actions/core');
const { Octokit } = require("octokit");
const getBranchSHA = require('./branch');
const tagCreate = require('./tag_create');

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
    branch
}) {

    let object = await getBranchSHA({
        token: personalToken,
        owner: owner,
        repo: reponame,
        branch: branch
    })

    let tagSha = await tagCreate({
        token: personalToken,
        repo: reponame,
        owner: owner,
        tag: tag,
        object: object,
        name: name,
        email: email,
        message: message,
    })

    const octokit = new Octokit({
        auth: personalToken
    })

    await octokit.request(`POST /repos/${owner}/${reponame}/git/refs`, {
        owner: owner,
        repo: reponame,
        ref: `refs/tags/${tag}`,
        sha: tagSha
    })
}