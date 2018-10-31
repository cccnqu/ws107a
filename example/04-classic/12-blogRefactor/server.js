// 注意：函數命名固定採用 CURD 用語，Create, Update, Read, Delete
const C = require('./lib/controller')
const path = require('path')
const logger = require('koa-logger')
const router = require('koa-router')()
const koaBody = require('koa-body')
const session = require('koa-session')
const koaStatic = require('koa-static')

const Koa = require('koa')
const app = (module.exports = new Koa())

app.keys = ['adfkadflakjdsf']

const CONFIG = {
  key: 'kdlasfe,dalj.amvlkdajfas', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false) */
}

app.use(logger())
app.use(koaBody())
app.use(session(CONFIG, app))
app.use(koaStatic(path.join(__dirname, 'public')))

async function home (ctx) {
  ctx.redirect('/board/list')
}

// 基本路由
router
  .get('/', home)
  .get('/board/list', C.board.list)

// 帳號 user 相關路由
router
  .get('/user/loginForm', C.user.loginForm)
  .get('/user/signupForm', C.user.signupForm)
  .get('/user/logout', C.user.logout)
  .get('/user/profileForm', C.user.profileForm)
  .post('/user/login', C.user.login)
  .post('/user/signup', C.user.signup)
  .post('/user/profileUpdate', C.user.profileUpdate)

// 貼文 post 相關路由
router
  .get('/post/list', C.post.list)
  .get('/post/createForm', C.post.createForm)
  .get('/post/updateForm', C.post.updateForm)
  .get('/post/show', C.post.show)
  .post('/post/create', C.post.create)
  .post('/post/update', C.post.update)

app.use(router.routes())

app.stop = async function () {
  await C.stop()
}

app.start = async function () {
  await C.start()
  if (!module.parent) app.listen(3000)
  console.log('Server run at http://localhost:3000')
}

app.start()
