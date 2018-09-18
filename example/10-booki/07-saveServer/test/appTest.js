const kdd = require('kdd')
const app = require('../app')
const server = app.listen()
const request = require('supertest').agent(server)

describe('Booki', function() {
  after(function() {
    server.close()
  })

  describe('GET /book/wd106b/Home', function() {
    it('should see 網頁設計', function(done) {
      request
      .get('/book/wd106b/Home')
      .expect(200, function(err, res) {
        if (err) return done(err)
        kdd.has(res.text, '網頁設計')
        done()
      })
    })
  })
  describe('GET /book/wd106b/xxx', function() {
    it('should see 404 error (not found)', function(done) {
      request
      .get('/book/wd106b/xxx')
      .expect(404, function(err, res) {
        if (err) return done(err)
        done()
      })
    })
  })

  describe('POST file check', function() {
    it('POST /book/wd106b/abc.md, should save abc... into abc.md', function(done) {
      request
      .post('/book/wd106b/abc.md')
      .send({text:'# abc\n123467'})
      .expect(200, function(err, res) {
        if (err) return done(err);
        done()
      })
    })
    it('GET /book/wd106b/abc.md and check is abc in it', function(done) {
      request
      .get('/book/wd106b/abc.md')
      .expect(200, function(err, res) {
        if (err) return done(err)
        kdd.has(res.text, 'abc\n')
        done()
      })
    })
  })
})
