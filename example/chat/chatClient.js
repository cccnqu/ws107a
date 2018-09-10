var net = require('net');
var readline = require('readline').createInterface(process.stdin, process.stdout);

var client = new net.Socket();

readline.on('line', function(line) {
  client.write(line);
  readline.prompt();
});

client.connect(5757, '127.0.0.1', function() {
  console.log('連接 ' + client.remoteAddress + ':' + client.remotePort);
  readline.setPrompt('');
  readline.prompt();
});

client.on('data', function(data) {
    console.log('收到:' + data);
});