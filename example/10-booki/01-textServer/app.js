const fs = require('mz/fs')
const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')

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

router
  .get('/text/:book/:file', showText)

app.use(router.routes()).listen(3000)
console.log('http server started: http://localhost:3000')
