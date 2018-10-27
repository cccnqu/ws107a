/* eslint-env mocha */
const expect = require('chai').expect
const server = require('./server').listen()
const request = require('supertest').agent(server)

describe('多人網誌系統', function () {
  after(function () {
    server.close()
  })

  describe('GET /users', function () { // 路徑 GET /
    it('內文標題應該為 <title>所有留言板列表</title>，而且有 0 則貼文', function (done) {
      request.get('/users').expect(200, function (err, res) {
        if (err) return done(err)

        expect(res.header['content-type']).to.include('html') // 根目錄是個 html 文件
        expect(res.text).to.include('<title>所有留言板列表</title>')
        done()
      })
    })
  })

  describe('GET /ccc/posts', function () { // 路徑 GET /
    it('內文標題應該為 <h1>ccc 的留言板</h1>，而且有 3 則貼文', function (done) {
      request.get('/ccc/posts').expect(200, function (err, res) {
        if (err) return done(err)

        expect(res.header['content-type']).to.include('html') // 根目錄是個 html 文件
        expect(res.text).to.include('<h1>ccc 的留言板</h1>')
        expect(res.text).to.include('<p>您總共有 <strong>3</strong> 則貼文!</p>')
        done()
      })
    })
  })

  describe('GET /ccc/post/0', function () { // 路徑 GET /
    it('內文標題應該為 <h2>週三上網站設計</h2>', function (done) {
      request.get('/ccc/post/0').expect(200, function (err, res) {
        if (err) return done(err)

        expect(res.header['content-type']).to.include('html') // 根目錄是個 html 文件
        expect(res.text).to.include('<h2>週三上網站設計</h2>')
        done()
      })
    })
  })

  describe('POST /george/post', function () { // 路徑 POST /post/new
    it('應該會貼文失敗，因為還沒有註冊', function (done) {
      request
        .post('/george/post')
        .send({ title: '貼文 0', body: '內容 0' })
        .expect(401, function (err, res) {
          if (err) return done(err)

          done()
        })
    })
  })

  describe('signup ; login ; post', function () {

    describe('POST /signup (user:george, password:george123)', function () {
      it('應該會登入成功', function (done) {
        request
          .post('/signup')
          .send({ user: 'george', password: 'george123', email: 'geroge@gmail.com' })
          .expect(200, function (err, res) {
            if (err) return done(err)

            done()
          })
      })
    })

    describe('POST /login (user:george, password:george123)', function () {
      it('應該會登入成功', function (done) {
        request
          .post('/login')
          .send({ user: 'george', password: 'george123' })
          .expect(302, function (err, res) {
            if (err) return done(err)

            expect(res.header.location).to.equal('/george/posts')
            done()
          })
      })
    })

    describe('POST /george/post', function () { // 路徑 POST /post/new
      it('應該會貼文成功，已經登入了', function (done) {
        request
          .post('/george/post')
          .send({ title: '貼文 0', body: '內容 0' })
          .expect(302, function (err, res) {
            if (err) return done(err)

            expect(res.header.location).to.equal('/george/posts')
            done()
          })
      })
    })

    describe('GET /george/post/0', function () { // 路徑 GET /
      it('內文標題應該為 <h2>貼文 0</h2>', function (done) {
        request.get('/george/post/0').expect(200, function (err, res) {
          if (err) return done(err)

          expect(res.text).to.include('<h2>貼文 0</h2>')
          done()
        })
      })
    })

    describe('GET /george/posts', function () { // 路徑 GET /
      it('內文標題應該為 <h1>george 的留言板</h1>，而且有 1 則貼文', function (done) {
        request.get('/george/posts').expect(200, function (err, res) {
          if (err) return done(err)

          expect(res.header['content-type']).to.include('html') // 根目錄是個 html 文件
          expect(res.text).to.include('<h1>george 的留言板</h1>')
          expect(res.text).to.include('<p>您總共有 <strong>1</strong> 則貼文!</p>')
          done()
        })
      })
    })
  })
})
