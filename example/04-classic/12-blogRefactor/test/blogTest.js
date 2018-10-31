/* eslint-env mocha */
const expect = require('chai').expect
const app = require('../server')
const server = app.listen()
const request = require('supertest').agent(server)
/*
const db = {
  profiles: {
    // george: {password: 'george123'},
    ccc: {password: 'ccc123'},
    snoopy: {password: 'snoopy123'}
  },
  boards: {
    ccc: {},
    snoopy: {}
  },
  posts: [
    {id: 0, user: 'ccc', board: 'ccc', title: '週三上網站設計', body: '9:10-12:00 在 e321 教室'},
    {id: 1, user: 'ccc', board: 'ccc', title: '週四上計算機結構', body: '9:10-12:00 在 e320 教室'},
    {id: 2, user: 'ccc', board: 'ccc', title: '週五上軟體工程', body: '9:10-12:00 在 e320 教室'},
    {id: 3, user: 'ccc', board: 'ccc', title: '周日吃狗食', body: '照三餐吃'},
    {id: 4, user: 'ccc', board: 'ccc', title: '周一吃狗食', body: '照三餐吃'},
    {id: 5, user: 'ccc', board: 'ccc', title: '周二吃狗食', body: '照三餐吃'},
    {id: 6, user: 'ccc', board: 'ccc', title: '周三吃狗食', body: '照三餐吃'},
    {id: 7, user: 'ccc', board: 'ccc', title: '周四吃狗食', body: '照三餐吃'},
    {id: 8, user: 'ccc', board: 'ccc', title: '周五吃狗食', body: '照三餐吃'},
    {id: 9, user: 'ccc', board: 'ccc', title: '周六吃狗食', body: '照三餐吃'}
  ]
}
*/
describe('多人網誌系統', function () {
  after(function () {
    app.stop()
    server.close()
  })

  describe('GET /board/list', function () {
    it('內文標題應該為 <title>留言板列表</title>', function (done) {
      request.get('/board/list').expect(200, function (err, res) {
        if (err) return done(err)

        expect(res.header['content-type']).to.include('html')
        expect(res.text).to.include('<title>留言板列表</title>')
        done()
      })
    })
  })

  describe('GET /post/list?board=ccc', function () {
    it('內文標題應該為 《ccc 留言板》，而且有 3 則貼文', function (done) {
      request.get('/post/list?board=ccc').expect(200, function (err, res) {
        if (err) return done(err)

        expect(res.header['content-type']).to.include('html') // 根目錄是個 html 文件
        expect(res.text).to.include('ccc 留言板')
        expect(res.text).to.include('總共有 <strong>3</strong> 則貼文!')
        done()
      })
    })
  })

  describe('GET /post/show?board=ccc&file=0', function () {
    it('內文標題應該為 週三上網站設計', function (done) {
      request.get('/post/show?board=ccc&file=0').expect(200, function (err, res) {
        if (err) return done(err)

        expect(res.header['content-type']).to.include('html')
        expect(res.text).to.include('週三上網站設計')
        done()
      })
    })
  })

  describe('POST /post/create?board=george', function () {
    it('應該會貼文失敗，因為還沒有註冊', function (done) {
      request
        .post('/post/create?board=george')
        .send({ file: '0', title: '貼文 0', body: '內容 0' })
        .expect(401, function (err, res) {
          if (err) return done(err)

          done()
        })
    })
  })

  describe('signup ; login ; post', function () {

    describe('POST /user/signup (user:george, password:george123)', function () {
      it('應該會註冊成功', function (done) {
        request
          .post('/user/signup')
          .send({ user: 'george', password: 'george123', email: 'geroge@gmail.com' })
          .expect(200, function (err, res) {
            if (err) return done(err)

            done()
          })
      })
    })

    describe('POST /user/login (user:george, password:george123)', function () {
      it('應該會登入成功', function (done) {
        request
          .post('/user/login')
          .send({ user: 'george', password: 'george123' })
          .expect(302, function (err, res) {
            if (err) return done(err)

            expect(res.header.location).to.equal('/post/list?board=george')
            done()
          })
      })
    })

    describe('POST /post/create?board=george', function () {
      it('應該會貼文成功，已經登入了', function (done) {
        request
          .post('/post/create?board=george')
          .send({ file: '0', title: '貼文 0', body: '內容 0' })
          .expect(302, function (err, res) {
            if (err) return done(err)

            expect(res.header.location).to.equal('/post/list?board=george')
            done()
          })
      })
    })

    describe('GET /post/list?board=george', function () {
      it('內文標題應該為 《george 留言板》，而且有 1 則貼文', function (done) {
        request.get('/post/list?board=george').expect(200, function (err, res) {
          if (err) return done(err)

          expect(res.header['content-type']).to.include('html') // 根目錄是個 html 文件
          expect(res.text).to.include('george 留言板')
          expect(res.text).to.include('總共有 <strong>1</strong> 則貼文!')
          done()
        })
      })
    })
  })
})
