const fs = require('mz/fs')
const path = require('path')
const Koa = require('koa')
const koaBody = require('koa-body')
const Router = require('koa-router')
const koaStatic = require('koa-static')
const V = require('./view')

const showdown  = require('showdown')
const converter = new showdown.Converter()
converter.setOption('tables', true)

const app = module.exports = new Koa()
const router = new Router()

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
    ctx.body = V.mainPage(page)
    ctx.type = 'html'
  } catch (err) {
    ctx.status = 404
    ctx.body = 'File not found !'
  }
}

/*
async function create(ctx) {
  const post = ctx.request.body;
  const id = posts.push(post) - 1;
  post.created_at = new Date();
  post.id = id;
  ctx.redirect('/');
}
*/
const saveFile = async function (ctx, next) {
  try {
    const book = ctx.params.book
    let file = ctx.params.file || 'Home'
    if (!file.endsWith('.md')) file = file + '.md'
    const post = ctx.request.body
    const mainPath = path.join('../book/', book, file)
    await fs.writeFile(mainPath, post.text, 'utf8')
    ctx.redirect(`/book/${book}/${file}`)
    ctx.status = 200
  } catch (err) {
    ctx.status = 404
    ctx.body = 'File not found !'
  }
}

router
  .get('/book/:book/:file?', showHtml)
  .post('/book/:book/:file?', saveFile)

app.use(koaBody());
app.use(koaStatic(path.join(__dirname, 'web')))
app.use(router.routes())

if (!module.parent) {
  app.listen(3000)
  console.log('http server started: http://localhost:3000')
}
