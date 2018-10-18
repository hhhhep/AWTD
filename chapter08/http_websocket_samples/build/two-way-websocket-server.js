"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var ws_1 = require("ws");
var app = express();
// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '..', 'client/simple-websocket-client.html'));
// });
app.use('/', express.static(path.resolve(__dirname, '..', 'client')));
app.use('/node_modules', express.static(path.resolve(__dirname, '..', 'node_modules')));
var httpServer = app.listen(8000, 'localhost', function () {
    var port = httpServer.address.port;
    console.log('HTTP Server is listening on %s', port);
});
var wsServer = new ws_1.Server({ port: 8085 });
console.log('WebSocket server is listening on port 8085');
wsServer.on('connection', function (websocket) {
    websocket.send('This message was pushed by the WebSocker server.');
    websocket.on('message', function (message) { return console.log('Server received : %s', message); });
});
