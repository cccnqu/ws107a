const V = require('./view')
const M = require('./model')

const C = module.exports = {
  user: {},
  post: {},
  board: {}
}

C.start = async function () {
  await M.start()
}

C.stop = async function () {
  await M.stop()
}

C.board.list = async function (ctx) {
  const boards = await M.board.list()
  ctx.body = await V.board.list(boards, ctx)
}

// User 相關路由函數
C.user.loginForm = async function (ctx) {
  ctx.body = V.user.loginForm(ctx)
}

C.user.signupForm = async function (ctx) {
  ctx.body = V.user.signupForm(ctx)
}

C.user.login = async function (ctx) {
  const passport = ctx.request.body
  if (await M.user.login(passport.user, passport.password)) {
    ctx.session.user = passport.user
    ctx.redirect(`/post/list?board=${passport.user}`)
  } else {
    ctx.status = 401
    ctx.body = V.fail(ctx)
  }
}

C.user.signup = async function (ctx) {
  const passport = ctx.request.body
  if (await M.user.signup(passport.user)) {
    await M.user.create(passport)
    ctx.body = V.success(ctx)
  } else {
    ctx.status = 401
    ctx.body = V.fail(ctx)
  }
}

C.user.logout = async function (ctx) {
  ctx.session.user = null
  ctx.body = V.user.logout(ctx)
}

C.user.profileForm = async function (ctx) {
  const myProfile = await M.user.profileRead(ctx.session.user)
  ctx.body = await V.user.profileShow(myProfile, ctx)
}

C.user.profileUpdate = async function (ctx) {
  const profile = ctx.request.body
  await M.user.profileUpdate(profile)
  ctx.body = V.success(ctx)
}

// post 相關路由函數
C.post.list = async function (ctx) {
  const board = ctx.query.board
  const posts = await M.post.list(board)
  ctx.body = await V.post.list(board, posts, ctx)
}

C.post.createForm = async function (ctx) {
  const board = ctx.query.board
  ctx.body = await V.post.createForm(board, ctx)
}

C.post.show = async function (ctx) {
  const post = await M.post.read(ctx.query.board, ctx.query.file)
  if (!post) ctx.throw(404, 'invalid post')
  ctx.body = await V.post.show(post, ctx)
}

C.post.updateForm = async function (ctx) {
  const post = await M.post.read(ctx.query.board, ctx.query.file)
  if (!post) ctx.throw(404, 'invalid post')
  ctx.body = await V.post.updateForm(post, ctx)
}

C.post.create = async function (ctx) {
  const board = ctx.query.board
  const post = ctx.request.body
  let isSuccess = await M.post.create(ctx.session.user, board, post)
  if (isSuccess) {
    ctx.redirect(`/post/list?board=${board}`)
  } else {
    ctx.status = 401
    ctx.body = V.fail(ctx)
  }
}

C.post.update = async function (ctx) {
  const board = ctx.query.board
  const post = ctx.request.body
  let isSuccess = await M.post.update(ctx.session.user, board, post)
  if (isSuccess) {
    ctx.redirect(`/post/list?board=${board}`)
  } else {
    ctx.status = 401
    ctx.body = V.fail(ctx)
  }
}
