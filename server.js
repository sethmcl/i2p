var http = require('http');
var port = process.env.PORT || 1337;
var fs   = require('fs');
var path = require('path');

http.createServer(function (request, response) {
  fs.createReadStream(path.resolve(__dirname, 'test.js')).pipe(response);
}).listen(port);
