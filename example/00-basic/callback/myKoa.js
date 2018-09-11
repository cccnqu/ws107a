var app = {
  ctx: { port: 3000, name: 'myapp' },
  jobList: []
}

app.use = function (job) {
  app.jobList.push(job)
}

app.run = function () {
  for (let job of app.jobList) {
    job(app.ctx) // 1. showCtx(app.ctx)  2. hello(app.ctx)
  }
}

function showCtx(ctx) {
  console.log('%j', ctx)
}

function hello(ctx) {
  console.log('hello!')
}

app.use(showCtx)
app.use(hello)

app.run()

