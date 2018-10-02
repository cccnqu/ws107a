const fs = require('mz/fs')
const path = require('path')
const Koa = require('koa')
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
    const filePath = path.join('../book/', book, file)
    const sideText = await fs.readFile(sidePath, 'utf8')
    const fileText = await fs.readFile(filePath, 'utf8')
    const footText = await fs.readFile(footPath, 'utf8')
    const sideHtml = converter.makeHtml(sideText)
    // console.log('sideText=', sideText)
    // console.log('sideHtml=', sideHtml)
    const fileHtml = converter.makeHtml(fileText)
    const footHtml = converter.makeHtml(footText)
    ctx.body = V.sideMain(sideHtml, fileHtml, footHtml, fileText)
    ctx.type = 'html'
  } catch (err) {
    ctx.status = 404
    ctx.body = 'File not found !'
  }
}

router
  .get('/view/:book/:file?', showHtml)

app.use(koaStatic(path.join(__dirname, 'web')))
app.use(router.routes())


if (!module.parent) {
  app.listen(3000)
  console.log('http server started: http://localhost:3000')
}
