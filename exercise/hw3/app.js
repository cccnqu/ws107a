const Koa = require('koa');
const app = module.exports = new Koa();

app.use(async function(ctx) {
  // console.log('url=', ctx.url)
  switch (ctx.url) {
    case '/hello': ctx.body = '你好'; break
    // '/name' : ...; break
    // '/id'   : ...; break
    default : ctx.status = 404
  }
  // ctx.body = 'Hello World';
});

if (!module.parent) app.listen(3000);