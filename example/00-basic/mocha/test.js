var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('在 [1,2,3]陣列裏找 4 應該傳回 -1', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
    /*
    it('should return not 2 when the value is not present', function() {
        assert.equal([1,2,3].indexOf(4), 2);
    });
    */
    it('在 [1,2,3]陣列裏找 2 應該傳回 1', function() {
      assert.equal([1,2,3].indexOf(2), 1);
    });
  });
});