"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var ws_1 = require("ws");
var app = express();
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'client/simple-websocket-client.html'));
});
var httpServer = app.listen(8000, 'localhost', function () {
    var port = httpServer.address().port;
    console.log('HTTP Server is listening on %s', port);
});
var wsServer = new ws_1.Server({ port: 8085 });
console.log('WebSocket Server is listening on port 8085');
wsServer.on('connection', function (websocket) {
    websocket.send('This message was pushed by the WebSocket server.');
});
