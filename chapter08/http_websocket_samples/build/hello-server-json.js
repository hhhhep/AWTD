"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var server = http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end('{ "message" : "Hello JSON!" }');
});
var port = 8000;
server.listen(port);
console.log('Listening on http://localhost:' + port);
