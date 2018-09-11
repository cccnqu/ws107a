var Koa = require('koa');
var serve = require('koa-static');
var path = require('path');
var app = new Koa();

app.use(serve('.'));
app.listen(3000);
console.log('listening on port 3000');
