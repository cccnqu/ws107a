const http = require('http')
const fs = require('fs')
const url = require('url')

const server = http.createServer(function (req, res) {
  const path = url.parse(req.url)
  const filePath = '.' + path.pathname
  console.log('filePath='+filePath)
  fs.readFile(filePath, 'utf8', function(err, file) {
    if (err) {
      console.log('err='  +err)
      res.writeHead(404, {'Content-Type': 'text/plain'})
      res.end()
      return
    }
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(file)
    console.log(file)
    res.end()
  })
})

server.listen(3000)

console.log('Server running at http://localhost:3000')