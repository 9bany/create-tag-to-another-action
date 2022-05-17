
const { Octokit } = require("octokit");
const { ERROR } = require("./connstant");

function getBranchSHA({ 
    token = process.env.TOKEN, 
    branch, 
    owner, 
    repo
}) {
    return new Promise((resolve, reject) => {
        const octokit = new Octokit({
            auth: token
        })
    
        octokit.request(`GET /repos/${owner}/${repo}/branches/${branch}`, {
            owner: owner,
            repo: repo,
            branch: branch
        }).catch(error => {
            reject(ERROR.CANNOT_GET_BRANCH)
        }).then(response => {
            let { data } = response
            resolve(data.commit.sha)    
        })
        
    })
}

module.exports = getBranchSHA;