

var assert = require('assert');
const { ERROR } = require("../src/connstant");
const tagCreate = require('../src/tag_create');

let testCases = [
    {
        name: "OK",
        stub: (check, object) => {
            return tagCreate({
                repo: 'create-tag-to-another-action-example',
                owner: '9bany',
                tag: 'v.1.0'+ Date.now(),
                object: object,
                name: '9bany',
                email: 'bany@gmail.com'
            }).then(check).catch(check)
        },
        check: (data) => {
            assert.equal(data.length, 40);
        }
    },
    {
        name: "Can not create with failed repo name",
        stub: (check, object) => {
            return tagCreate({
                repo: 'create-tag-to--action-example',
                owner: '9bany',
                tag: 'v.1.0'+ Date.now(),
                object: object,
                name: '9bany',
                email: 'bany@gmail.com'
            }).then(check).catch(check)
        },
        check: (data) => {
            assert.equal(data, ERROR.CANNOT_CREATE_TAG);
        }
    },
    {
        name: "Can not create with failed username",
        stub: (check, object) => {
            return tagCreate({
                repo: 'create-tag-to--action-example',
                owner: '9bany',
                tag: 'v.1.0'+ Date.now(),
                object: object,
                name: '9bany',
                email: 'bany@gmail.com'
            }).then(check).catch(check)
        },
        check: (data) => {
            assert.equal(data, ERROR.CANNOT_CREATE_TAG);
        }
    },
]

describe('Tag create', function () {
    testCases.forEach(element => {
        it(element.name, function () {
            return element.stub(element.check, 'd700ff3a6b485aef898b594542a41d7c7ad18eaf')
        });
    })
});
