var assert = require('assert');
var M = require('./mop')

describe('mop: 數學運算函式庫', function() {
    it('M.add(2,3) 應該等於 5', function() {
        assert.equal(M.add(2,3), 5);
    });
    it('M.mul(10,3) 應該等於 30', function() {
        assert.equal(M.mul(10,3), 30);
    });
});