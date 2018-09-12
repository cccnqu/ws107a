const http = require('http');

const port = 3000, hostname = 'localhost'

const server = http.createServer((req, res) => {
  res.statusCode = 404;
  res.end();
});

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});