const fs = require('mz/fs')
const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')

const showdown  = require('showdown')
const converter = new showdown.Converter()
converter.setOption('tables', true)

const app = new Koa()
const router = new Router()

const showText = async function (ctx, next) {
  const book = ctx.params.book
  const file = ctx.params.file
  const type = path.extname(file)
  console.log('book=%s file=%s', book, file)
  const filePath = path.join('../book/', book, file)
  const fileText = await fs.readFile(filePath, 'utf8')
  ctx.body = fileText
  ctx.type = 'text/plain'
}

const showHtml = async function (ctx, next) {
  const book = ctx.params.book
  const file = ctx.params.file
  const type = path.extname(file)
  console.log('book=%s file=%s', book, file)
  const filePath = path.join('../book/', book, file)
  const fileText = await fs.readFile(filePath, 'utf8')
  const html = converter.makeHtml(fileText)
  ctx.body = `
  <html>
  <head>
    <title>${filePath}</title>
  </head>
  <body>
  ${html}
  </body>
  </html>
  `
  ctx.type = 'html'
}

router
  .get('/text/:book/:file', showText)
  .get('/view/:book/:file', showHtml)

app.use(router.routes()).listen(8080)
console.log('http server started: http://localhost:8080')
