const V = require('./view')
const M = require('./model')
const logger = require('koa-logger')
const router = require('koa-router')()
const koaBody = require('koa-body')
const session = require('koa-session')

const Koa = require('koa')
const app = (module.exports = new Koa())

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
  renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false) */
}

app.use(logger())
app.use(koaBody())
app.use(session(CONFIG, app))

router
  .get('/', home)
  .get('/login', showLogin)
  .get('/signup', showSignup)
  .post('/login', login)
  .post('/signup', signup)
  .get('/logout', logout)
  .get('/users', listUsers)
  .get('/:user/posts', userPosts)
  .get('/:user/post/new', addPost)
  .get('/:user/post/:id', showPost)
  .post('/:user/post', createPost)

app.use(router.routes())

async function home (ctx) {
  ctx.redirect('/users')
}

async function showLogin (ctx) {
  ctx.body = V.showLogin()
}

async function showSignup (ctx) {
  ctx.body = V.showSignup()
}

async function login (ctx) {
  const passport = ctx.request.body
  if (M.login(passport.user, passport.password)) {
    ctx.session.user = passport.user
    ctx.redirect(`/${passport.user}/posts`)
  } else {
    ctx.status = 401
    ctx.body = '登入失敗！'
  }
}

async function signup (ctx) {
  console.log('signup: body=', ctx.request.body)
  const passport = ctx.request.body
  if (M.signup(passport.user)) {
    M.addUser(passport)
    ctx.body = '註冊成功！'
  } else {
    ctx.status = 401
    ctx.body = '登入失敗！'
  }
}

async function logout (ctx) {
  ctx.session.user = null
  ctx.body = V.logout()
}

async function listUsers (ctx) {
  const users = M.listUsers()
  ctx.body = await V.listUsers(users)
}

async function userPosts (ctx) {
  const user = ctx.params.user
  const posts = M.listPosts(user)
  ctx.body = await V.listPosts(user, posts, ctx)
}

async function addPost (ctx) {
  const user = ctx.params.user
  ctx.body = await V.newPost(user)
}

async function showPost (ctx) {
  const user = ctx.params.user
  const post = M.getPost(user, ctx.params.id)
  if (!post) ctx.throw(404, 'invalid post id')
  ctx.body = await V.showPost(user, post)
}

async function createPost (ctx) {
  const user = ctx.params.user
  const post = ctx.request.body
  if (ctx.session.user === user) {
    M.addPost(user, post)
    ctx.redirect(`/${user}/posts`)
  } else {
    ctx.status = 401
    ctx.body = '貼文失敗，你不是板主！'
  }
}

if (!module.parent) {
  app.listen(3000)
  console.log('Server run at http://localhost:3000')
}
