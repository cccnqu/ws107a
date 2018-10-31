const V = require('./lib/view')
const M = require('./lib/model')
const path = require('path')
const logger = require('koa-logger')
const router = require('koa-router')()
const koaBody = require('koa-body')
const session = require('koa-session')
const koaStatic = require('koa-static')

const Koa = require('koa')
const app = (module.exports = new Koa())

app.keys = ['kdlasfe,dalj.amvlkdajfas']

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

router
  .get('/', home)
  .get('/user/loginForm', loginForm) // 帳號相關 user
  .get('/user/signupForm', signupForm)
  .get('/user/logout', logout)
  .get('/user/profileForm', profileForm)
  .post('/user/login', login)
  .post('/user/signup', signup)
  .post('/user/profileUpdate', profileUpdate)
  .get('/board/list', boardList) // 留言板相關 board
  .get('/post/list', postList) // 貼文相關 post
  .get('/post/createForm', postCreateForm)
  .get('/post/updateForm', postUpdateForm)
  .get('/post/show', postShow)
  .post('/post/create', postCreate)
  .post('/post/update', postUpdate)

app.use(router.routes())

async function home (ctx) {
  ctx.redirect('/board/list')
}

async function loginForm (ctx) {
  ctx.body = V.loginForm(ctx)
}

async function signupForm (ctx) {
  ctx.body = V.signupForm(ctx)
}

async function login (ctx) {
  const passport = ctx.request.body
  if (await M.login(passport.user, passport.password)) {
    ctx.session.user = passport.user
    ctx.redirect(`/post/list?board=${passport.user}`)
  } else {
    ctx.status = 401
    ctx.body = V.fail(ctx)
  }
}

async function signup (ctx) {
  const passport = ctx.request.body
  if (await M.signup(passport.user)) {
    await M.userCreate(passport)
    ctx.body = V.success(ctx)
  } else {
    ctx.status = 401
    ctx.body = V.fail(ctx)
  }
}

async function logout (ctx) {
  ctx.session.user = null
  ctx.body = V.logout(ctx)
}

async function profileUpdate (ctx) {
  const profile = ctx.request.body
  await M.profileUpdate(profile)
  ctx.body = V.success(ctx)
}

async function boardList (ctx) {
  const boards = await M.boardList()
  ctx.body = await V.boardList(boards, ctx)
}

async function postList (ctx) {
  const board = ctx.query.board
  const posts = await M.postList(board)
  ctx.body = await V.postList(board, posts, ctx)
}

async function postCreateForm (ctx) {
  const board = ctx.query.board
  ctx.body = await V.postCreateForm(board, ctx)
}

async function profileForm (ctx) {
  const myProfile = await M.profileGet(ctx.session.user)
  ctx.body = await V.profileShow(myProfile, ctx)
}

async function postShow (ctx) {
  const post = await M.postGet(ctx.query.board, ctx.query.file)
  if (!post) ctx.throw(404, 'invalid post')
  ctx.body = await V.postShow(post, ctx)
}

async function postUpdateForm (ctx) {
  const post = await M.postGet(ctx.query.board, ctx.query.file)
  if (!post) ctx.throw(404, 'invalid post')
  ctx.body = await V.postUpdateForm(post, ctx)
}

async function postCreate (ctx) {
  const board = ctx.query.board
  const post = ctx.request.body
  let isSuccess = await M.postCreate(ctx.session.user, board, post)
  if (isSuccess) {
    ctx.redirect(`/post/list?board=${board}`)
  } else {
    ctx.status = 401
    ctx.body = V.fail(ctx)
  }
}

async function postUpdate (ctx) {
  const board = ctx.query.board
  const post = ctx.request.body
  let isSuccess = await M.postUpdate(ctx.session.user, board, post)
  if (isSuccess) {
    ctx.redirect(`/post/list?board=${board}`)
  } else {
    ctx.status = 401
    ctx.body = V.fail(ctx)
  }
}

app.stop = async function () {
  await M.close()
}

app.start = async function () {
  await M.init()
  if (!module.parent) app.listen(3000)
  console.log('Server run at http://localhost:3000')
}

app.start()
