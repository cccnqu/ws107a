const http = require('http')
const fs = require('fs')
const url = require('url')

const server = http.createServer(function (req, res) {
  const path = url.parse(req.url)
  const filePath = '.' + path.pathname
  console.log('filePath='+filePath)
  fs.readFile(filePath, 'binary', function(err, file) {
    console.log('err='+err);
    if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.end();
        return;
    }
    if (/\.html?$/.test(path.pathname))
      res.writeHead(200, {'Content-Type': 'text/html'})
    else
      res.writeHead(200)
    res.write(file, 'binary')
    res.end()
  })
})

server.listen(3000)

console.log('Server running at http://localhost:3000')
