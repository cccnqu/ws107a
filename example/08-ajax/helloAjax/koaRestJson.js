const json = require('koa-json')
const Koa = require('koa');
const app = new Koa();
app.use(json({ pretty: true, param: 'pretty' }))
app.use(ctx => {
  ctx.body = [ { id:1, title:"title1", body: "body1"}, { id:2, title: "title2", body: "body2"}]
})

app.listen(3000)
console.log('server run at http://localhost:3000/')