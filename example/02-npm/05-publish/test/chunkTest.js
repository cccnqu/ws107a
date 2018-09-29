const assert = require('assert')
const chunk = require('../lib/chunk')

describe('chunk', function () {
  it("_.chunk(['a', 'b', 'c', 'd'], 2) equalTo [ [ 'a', 'b' ], [ 'c', 'd' ] ]", function () {
    assert.deepStrictEqual(chunk(['a', 'b', 'c', 'd'], 2), [ [ 'a', 'b' ], [ 'c', 'd' ] ])
  })
  it("_.chunk(['a', 'b', 'c', 'd'], 3) equalTo [ [ 'a', 'b', 'c' ], [ 'd' ] ]", function () {
    assert.deepStrictEqual(chunk(['a', 'b', 'c', 'd'], 3), [ [ 'a', 'b', 'c' ], [ 'd' ] ])
  })
  it("_.chunk(['a', 'b', 'c', 'd'], 3) notEqualTo [ [ 'a', 'b'], ['c' , 'd' ] ]", function () {
    assert.notDeepStrictEqual(chunk(['a', 'b', 'c', 'd'], 3), [ [ 'a', 'b' ], ['c', 'd'] ])
  })
})