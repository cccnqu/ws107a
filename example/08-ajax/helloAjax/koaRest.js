const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  ctx.remove('Content-Length'); 
  ctx.type = 'json' // 'text/plain'
  ctx.body = `[ { "id":1, "title": "title1", "body": "body1"}, { "id":2, "title": "title2", "body": "body2"}]\n`
})

app.listen(3000)
console.log('server run at http://localhost:3000/')