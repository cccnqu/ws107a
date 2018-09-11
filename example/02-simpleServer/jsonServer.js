const http = require('http');

const port = 3000, hostname = 'localhost'

const person = { name: 'ccc', email: 'ccckmit@gmail.com', age: 49 }

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(person, null, 2));
});

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});