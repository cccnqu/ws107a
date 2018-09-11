const fs = require('mz/fs')
const logger = require('koa-logger')
const coBody = require('co-body')
const path = require('path')
const session = require('koa-session')
const M = require('./lib/model')
const Koa = require('koa')
const Router = require('koa-router')
const json = require('koa-json')
const cors = require('@koa/cors');

const app = new Koa()
const router = new Router()

app.keys = ['#*$*#$)_)*&&^^']

const CONFIG = {
  key: 'koa:sess', // (string) cookie key (default is koa:sess)
  maxAge: 86400000, // (number) maxAge in ms (default is 1 days)
  overwrite: true, // (boolean) can overwrite or not (default true)
  httpOnly: true, // (boolean) httpOnly or not (default true)
  signed: true // (boolean) signed or not (default true)
}

app.use(logger())
app.use(session(CONFIG, app))
app.use(json())
app.use(cors()) // https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue

async function parse (ctx) {
  var json = await coBody(ctx)
  console.log('parse: json = %j', json)
  return (typeof json === 'string') ? JSON.parse(json) : json
}

async function postsList (ctx, next) {
  try {
    var r = await M.selectPosts({})
    ctx.body = r
  } catch (error) {
    console.log('postsList:error=', error)
  }
}

async function postAdd (ctx, next) {
  try {
    let data = await parse(ctx)
    console.log('data=%j', data)
    var r = await M.insertPost(data.post)
    console.log('postAdd:r=' , r)
    ctx.body = r
  } catch (error) {
    console.log('postAdd:error=', error)
  }
}

router
.get('/post/list', postsList)
.post('/post', postAdd)

async function main() {
  await M.init()
  var port = 3000
  app.use(router.routes()).listen(port)
  console.log('http server started: http://localhost:' + port)
}

main()
