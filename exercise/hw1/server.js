const http = require('http')

http.createServer((req, res) => {
  console.log('url=', req.url)
  // console.log('method=', req.method)
  // console.log('headers=', req.headers)

  res.setHeader('Content-Type', 'text/html')
  var head = '<html><head><meta charset="UTF-8" /></head><body>'
  var tail = '</body></html>'
  switch (req.url) {
    case '/hello' : res.write(head+'你好'+tail); break
    case '/name'  : res.write(head+'陳鍾誠'+tail); break
    case '/id'    : res.write(head+'1234567'+tail); break
    default  : res.statusCode = 404;
  }
  res.end()
}).listen(3000)

console.log('Server runnint at http://localhost:3000/')
