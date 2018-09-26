const http = require('http');

const port = 3000, hostname = 'localhost'

const server = http.createServer(function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><head></head><body><p>Hello World</p><a href="http://tw.youtube.com">YouTube</a></body></html>');
});

server.listen(port, function() {
  console.log(`Server running at http://${hostname}:${port}/`);
});