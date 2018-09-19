var http = require('http');

http.get('http://localhost:3000', function(res) {
  console.log('Got response: ' + res.statusCode)
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk)
  })
}).on('error', function(e) {
  console.log('Got error: ' + e.message)
})