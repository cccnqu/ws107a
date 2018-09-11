const  fs = require('mz/fs')
const showdown  = require('showdown')
const Koa = require('koa')
const serve = require('koa-static')
const router = require('koa-router')()
const path = require('path')

const app = new Koa()
const converter = new showdown.Converter()
converter.setOption('tables', true)

async function view(ctx, next) {
	console.log('ctx.params=%j', ctx.params)
	console.log('ctx.path=%j', ctx.path)
	var fullpath = path.join(__dirname, 'user', ctx.params.file)
	var fstat = await fs.stat(fullpath)
	if (fstat.isFile()) {
		if (ctx.path.endsWith(".md")) {
			ctx.type = "html"
			var md = await fs.readFile(fullpath, "utf8")
			ctx.body = converter.makeHtml(md)
		} else {
			ctx.type = path.extname(ctx.path)
			ctx.body = fs.createReadStream(fullpath)
		}
	}
}

router.get('/view/:file', view)

var rootpath = path.join(__dirname, '')
console.log("rootpath=%s", rootpath) 
app.use(serve(rootpath))
app.use(router.routes())


if (!module.parent) app.listen(3000)
console.log('listening on port 3000')
