const { Octokit } = require("octokit");
const { ERROR } = require("./connstant");

function tagCreate({
    token = process.env.TOKEN, 
    message, 
    owner, 
    repo,
    tag,
    object,
    name,
    email
}) {
    return new Promise((resolve, reject) => {
        const octokit = new Octokit({
            auth: token
        })
        octokit.request(`POST /repos/${owner}/${repo}/git/tags`, {
            owner: owner,
            repo: repo,
            tag: tag,
            message: !message ? tag : message,
            object: object,
            type: 'commit',
            tagger: {
                name: name,
                email: email
            }
        }).catch(error => {
            reject(ERROR.CANNOT_CREATE_TAG)
        }).then(response => {
            let { data } = response
            resolve(data.sha)
        })
    })
}

module.exports = tagCreate;