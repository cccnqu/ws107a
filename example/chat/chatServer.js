var net = require('net');
var readline = require('readline').createInterface(process.stdin, process.stdout);

var server = net.createServer();

server.on('connection', function(sock) {
  console.log(sock.remoteAddress +':'+ sock.remotePort+' 連進來了');

  readline.setPrompt('');
  readline.prompt();

  readline.on('line', function(line) {
    sock.write(line);
    readline.prompt();
  });

  sock.on('data', function(data) {
    console.log('收到:' + sock.remoteAddress + ': ' + data);
  });
});

server.listen(5757);
console.log('server 啟動');