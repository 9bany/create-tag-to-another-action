const getBranchSHA = require("../src/branch");
var assert = require('assert');
const { ERROR } = require("../src/connstant");

let testCases = [
    {
        name: "OK",
        stub: (check) => {
            return getBranchSHA({
                branch: 'master',
                repo: 'create-tag-to-another-action-example',
                owner: '9bany'
            }).then(check).catch(check)
        },
        check: (data) => {
            assert.equal(data.length, 40);
        }
    },
    {
        name: "Not found",
        stub: (check) => {
            return getBranchSHA({
                branch: 'master',
                repo: 'create-tag-to-action-example',
                owner: '9bany'
            }).then(check).catch(check)
        },
        check: (data) => {
            assert.equal(data, ERROR.CANNOT_GET_BRANCH);
        }
    },
    {
        name: "Not found",
        stub: (check) => {
            return getBranchSHA({
                branch: 'master',
                repo: 'create-tag-to-another-action-example',
                owner: '0any'
            }).then(check).catch(check)
        },
        check: (data) => {
            assert.equal(data, ERROR.CANNOT_GET_BRANCH);
        }
    }
]

describe('Get branch', function () {
    testCases.forEach(element => {
        it(element.name, function () {
            return element.stub(element.check)
        });
    })
});
