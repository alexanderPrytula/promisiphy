const 
    assert = require('assert'),
    fs = require('fs'),
    http = require('http'),
    promisify = require('..');

describe('promisify', () => {

    it('should return a promise from a thunk', () => {
        assert(promisify(fs, 'stat', 'test/sample') instanceof Promise);
    });

    it('should return a promise from a thunk method of some class. Providiing context check', () => {
        assert(promisify(http, 'get', 'http://registry.npmjs.org', {ctx: http}) instanceof Promise);
    });

});
