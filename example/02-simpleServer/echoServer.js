const http = require('http')

http.createServer((req, res) => {
  console.log('url=', req.url)
  console.log('method=', req.method)
  console.log('headers=', req.headers)

  res.setHeader('Content-Type', 'text/plain')
  res.write('url=' + req.url + '\n')
  res.write('method=' + req.method + '\n')
  res.write('headers=' + JSON.stringify(req.headers, null, 2) + '\n')
  res.end()
}).listen(3000)

console.log('Server runnint at http://localhost:3000/')
