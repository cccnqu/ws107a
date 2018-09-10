const http = require('http');

const port = 3000, hostname = 'localhost'

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/json');
  res.end(`[ { "id":1, "title": "title1", "body": "body1"},\n
             { "id":2, "title": "title2", "body": "body2"}]\n`);
});

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});