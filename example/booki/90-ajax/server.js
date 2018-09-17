var fs = require('mz/fs')
var logger = require('koa-logger')
var koaStatic = require('koa-static')
var cobody = require('co-body')
// var bodyParser = require('koa-bodyparser') // 不能用 ，因為不支援檔案上傳 multipart
var asyncBusboy = require('async-busboy')
var path = require('path')
var session = require('koa-session')
var aslk = require('aslk')
var M = require('../lib/model')
var V = require('./view')
var Koa = require('koa')
var Router = require('koa-router')

var app = new Koa()
var router = new Router()

var response = function (self, code, msg) {
  self.body = JSON.stringify(msg)
}

var isPass = function (self) {
  return typeof self.session.user !== 'undefined'
}

var parse = async function (self) {
  var json = await cobody(self)
  return (typeof json === 'string') ? JSON.parse(json) : json
}

var view = async function (ctx, next) { // view(mdFile):convert *.md to html
  console.log('view()')
  var book = ctx.params.book
  var file = ctx.params.file || 'README.md'
  var type = path.extname(file)
  console.log('book=%s file=%s', book, file)
  if (['.md', '.json', '.mdo', '.html'].indexOf(type) >= 0) {
    var bookObj, fileObj
    var isError = false
    try {
      bookObj = await M.getBook(book)
    } catch (error) {
      isError = true
      bookObj = { book: book }
      fileObj = { book: book, file: file, text: '# Error\nBook not found.\nYou may [Create New Book](/view/system/createBook.html) ?' }
    }
    if (!isError) {
      try {
        fileObj = await M.getBookFile(book, file)
      } catch (error) {
        fileObj = { book: book, file: file, text: '# Error\nFile not found.\nYou may edit and save to create a new file !' }
      }
    }
    console.log('user=%s', ctx.session.user)
    var page = V.viewRender(bookObj, fileObj, M.setting.useLocal, ctx.session.user)
    ctx.body = page
  } else {
    ctx.type = path.extname(ctx.path)
    ctx.body = fs.createReadStream(M.getFilePath(book, file))
  }
}

var save = async function (ctx, next) { // save markdown file.
  console.log('save()')
  var book = ctx.params.book
  var file = ctx.params.file
  console.log('=> book=%s file=%s', book, file)
  if (!isPass(ctx)) {
    console.log('=> !pass')
    return
  }
  var bookObj = await M.getBook(book)
  if (bookObj.editor !== ctx.session.user) {
    console.log('=> editor != user')
    return
  }
  try {
    var post = await parse(ctx)
    console.log('=> post != %j', post)
    await M.saveBookFile(book, file, post.text)
    console.log('=> save success')
    response(ctx, 200, 'Save Success!')
  } catch (e) {
  }
}

var signup = async function (ctx, next) {
  if (!M.setting.signup) {
    return
  }
  var post = await parse(ctx)
  var user = post.user
  var password = post.password
  var isSuccess = await M.addUser(user, password)
  if (isSuccess) {
    response(ctx, 200, 'Signup success!')
  } else {
  }
}

var login = async function (ctx, next) {
  console.log('login()')
  var post = await parse(ctx)
  console.log('  post=%j', post)
  var user = M.users[post.user]
  if (user.password === post.password) {
    response(ctx, 200, 'Login Success!')
    ctx.session.user = post.user
  } else {
  }
}

var logout = async function (ctx, next) {
  delete ctx.session.user
  response(ctx, 200, 'Logout Success!')
}

var createBook = async function (ctx, next) {
  if (!isPass(ctx)) {
  } else {
    try {
      await M.createBook(ctx.params.book, ctx.session.user)
      response(ctx, 200, 'Create Book Success!')
    } catch (err) {
    }
  }
}

// 下面還是用 koa-busboy, 這樣還是和 koa-bodyparser 不能相容。
// 參考： https://chenshenhai.github.io/koa2-note/note/upload/pic-async.html
// 另一個可能性是 https://github.com/dlau/koa-body/tree/koa2
// 原始碼看來並沒有支援 multipart : https://github.com/koajs/bodyparser/blob/master/index.js
var upload = async function (ctx, next) {
  var book = ctx.params.book
  console.log('upload: book=%s', book)
  const {files} = await asyncBusboy(ctx.req)
  console.log('files=%j', files)
  for (var i in files) {
    var file = files[i].filename
    console.log('upload file=%s', file)
    var stream = fs.createWriteStream(path.join(M.bookRoot, book, file))
    files[i].pipe(stream)
  }
  ctx.body = JSON.stringify(files, null, 2)
}

var mt = async function (ctx, next) {
  try {
    var post = await parse(ctx)
    var s2t = ctx.params.s2t
    var format = ctx.params.format
    switch (format) {
      case 'obj' : result = aslk.objMt(post.source, s2t); break
      case 'text': result = aslk.textMt(post.source, s2t); break
      case 'ruby': result = aslk.rubyMt(post.source, s2t); break
      case 'parse': result = JSON.stringify({s: p.s, t: p.t, cuts: p.cuts, tags: p.tags}); break
      default: throw 'Error format!'
    }
    response(ctx, 200, result)
  } catch (e) {
  }
}

app.keys = ['#*$*#$)_)*&&^^']

var CONFIG = {
  key: 'koa:sess', // (string) cookie key (default is koa:sess)
  maxAge: 86400000, // (number) maxAge in ms (default is 1 days)
  overwrite: true, // (boolean) can overwrite or not (default true)
  httpOnly: true, // (boolean) httpOnly or not (default true)
  signed: true // (boolean) signed or not (default true)
}

app.use(logger())
app.use(session(CONFIG, app))
app.use(koaStatic(path.join(__dirname, 'web')))
app.use(koaStatic(path.join(__dirname, 'user')))

router
  .get('/', function (ctx, next) {
    console.log('ctx=%j', ctx)
    ctx.redirect(M.setting.home)
  })
  .get('/view/:book/:file?', view)
  .post('/createbook/:book', createBook)
  .post('/save/:book/:file', save)
  .post('/login', login)
  .post('/logout', logout)
  .post('/signup', signup)
  .post('/upload/:book', upload)
  .post('/mt/:s2t/:format', mt)

async function main() {
  await M.init(__dirname + '/../')
  V.init(__dirname)
  var port = M.setting.port || 8080
  app.use(router.routes()).listen(port)
  console.log('http server started: http://localhost:' + port)
}

main()
