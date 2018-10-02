var fs = require('mz/fs')
var path = require('path')
var logger = require('koa-logger')
var koaStatic = require('koa-static')
var session = require('koa-session')
var Koa = require('koa')
var Router = require('koa-router')
var M = require('../lib/model')
var V = require('./view')

var app = new Koa()
var router = new Router()

var json = async function (ctx, next) { // view(mdFile):convert *.md to html
  console.log('json()')
  const book = ctx.params.book
  const file = ctx.params.file || 'README.md'
  const type = path.extname(file)
  console.log('book=%s file=%s', book, file)
  const bookObj = await M.getBook(book)
  const fileObj = await M.getBookFile(book, file)
  const bookFile = { book:bookObj, file:fileObj }
  console.log('bookFile=%j', bookFile)
  ctx.body = JSON.stringify(bookFile, null, 2)
  ctx.type = 'json'
}

var view = async function (ctx, next) { // view(mdFile):convert *.md to html
  console.log('view()')
  const book = ctx.params.book
  const file = ctx.params.file || 'README.md'
  const type = path.extname(file)
  console.log('book=%s file=%s', book, file)
  const bookObj = await M.getBook(book)
  const fileObj = await M.getBookFile(book, file)
  const bookFile = {book:bookObj, file:fileObj}
  console.log('bookFile=%j', bookFile)

  const html = V.layout(bookObj, fileObj)
  // ctx.body = JSON.stringify(bookFile, null, 2)
  ctx.body = html
  ctx.type = 'html'
  /*
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
  */
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
  .get('/json/:book/:file?', json)
  /*
  .post('/createbook/:book', createBook)
  .post('/save/:book/:file', save)
  .post('/login', login)
  .post('/logout', logout)
  .post('/signup', signup)
  .post('/upload/:book', upload)
  */

async function main() {
  await M.init(__dirname + '/../')
  V.init(__dirname)
  var port = M.setting.port || 8080
  app.use(router.routes()).listen(port)
  console.log('http server started: http://localhost:' + port)
}

main()
