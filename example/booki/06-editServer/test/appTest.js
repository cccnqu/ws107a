const kdd = require('kdd')
const app = require('../app')
const server = app.listen()
const request = require('supertest').agent(server)

describe('Booki', function() {
  after(function() {
    server.close()
  })

  describe('GET /view/wd106b/Home', function() {
    it('should see 網頁設計', function(done) {
      request
      .get('/view/wd106b/Home')
      .expect(200, function(err, res) {
        if (err) return done(err)
        kdd.has(res.text, '網頁設計')
        done()
      })
    })
  })
  describe('GET /view/wd106b/xxx', function() {
    it('should see 404 error (not found)', function(done) {
      request
      .get('/view/wd106b/xxx')
      .expect(404, function(err, res) {
        if (err) return done(err)
        done()
      })
    })
  })
})
