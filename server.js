var http = require('http');
var port = process.env.PORT || 1337;

http.createServer(function (request, response) {
  response.end('Hello');
}).listen(port);
