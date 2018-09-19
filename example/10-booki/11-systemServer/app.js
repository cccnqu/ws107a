const fs = require('mz/fs')
const path = require('path')
const Koa = require('koa')
const koaBody = require('koa-body')
const Router = require('koa-router')
const koaStatic = require('koa-static')
const session = require('koa-session')
const V = require('./view')
const Setting = require('./setting/setting.json')

const showdown  = require('showdown')
const converter = new showdown.Converter()
converter.setFlavor('github')
// converter.setOption('tables', true)


const app = module.exports = new Koa()
const router = new Router()

app.keys = ['some secret hurr']

const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
}

const showRoot = async function (ctx, next) {
  ctx.redirect('/book/home/Home.md')
}

const showHtml = async function (ctx, next) {
  try {
    const book = ctx.params.book
    let file = ctx.params.file || 'Home'
    if (!file.endsWith('.md')) file = file + '.md'
    console.log('book=%s file=%s', book, file)
    const sidePath = path.join('../book/', book, '_Sidebar.md')
    const footPath = path.join('../book/', book, '_Footer.md')
    const mainPath = path.join('../book/', book, file)
    const page = { book: book, file: file }
    page.sideText = await fs.readFile(sidePath, 'utf8')
    page.mainText = await fs.readFile(mainPath, 'utf8')
    page.footText = await fs.readFile(footPath, 'utf8')
    page.sideHtml = converter.makeHtml(page.sideText)
    page.mainHtml = converter.makeHtml(page.mainText)
    page.footHtml = converter.makeHtml(page.footText)
    // console.log('ctx.request.url=', ctx.request.url)
    ctx.body = V.bookPage(ctx, page)
    ctx.type = 'html'
  } catch (err) {
    ctx.status = 404
    ctx.body = 'File not found !'
  }
}

const saveFile = async function (ctx, next) {
  try {
    if (ctx.session.user == null) throw Error('not login yet!')
    const book = ctx.params.book
    let file = ctx.params.file || 'Home'
    if (!file.endsWith('.md')) file = file + '.md'
    const post = ctx.request.body
    const mainPath = path.join('../book/', book, file)
    await fs.writeFile(mainPath, post.text, 'utf8')
    // ctx.status = 200
    await showHtml(ctx, next)
    // ctx.redirect(`/book/${book}/${file}`)
  } catch (err) {
    ctx.status = 401
    ctx.body = err
  }
}

const deleteFile = async function (ctx, next) {
  try {
    const book = ctx.params.book
    let file = ctx.params.file || 'Home'
    if (!file.endsWith('.md')) file = file + '.md'
    const filePath = path.join('../book/', book, file)
    await fs.unlink(filePath)
    ctx.status = 200
  } catch (err) {
    ctx.status = 404
    ctx.body = 'File not found !'
  }
}

const loginPage =  async function (ctx, next) {
  let op = ctx.query.op || ''
  ctx.body = V.loginPage(ctx, op)
  ctx.type = 'html'
}

const login = async function (ctx, next) {
  const post = ctx.request.body
  var user = Setting.users[post.user]
  console.log('login: post=', post)
  if (user != null && user.password === post.password) {
    ctx.session.user = post.user
    ctx.status = 200
    ctx.body = V.loginPage(ctx, 'success')
  } else {
    ctx.status = 401
    ctx.body = V.loginPage(ctx, 'fail')
  }
}

var logout = async function (ctx, next) {
  if (ctx.session.user) {
    delete ctx.session.user
    ctx.status = 200
    ctx.body = V.loginPage(ctx, 'logout')
  } else {
    ctx.status = 401
    ctx.body = V.loginPage(ctx, 'logout')
  }
}

router
  .get('/', showRoot)
  .get('/book/:book/:file?', showHtml)
  .post('/book/:book/:file?', saveFile)
  .delete('/book/:book/:file?', deleteFile)
  .get('/login', loginPage)
  .post('/login', login)
  .post('/logout', logout)

app.use(koaBody())
app.use(session(CONFIG, app))
app.use(koaStatic(path.join(__dirname, 'web')))
app.use(router.routes())

if (!module.parent) {
  app.listen(3000)
  console.log('http server started: http://localhost:3000')
}
