"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var app = express();
app.use('/', express.static(path.resolve(__dirname, '..', 'client')));
app.use('/node_modules', express.static(path.resolve(__dirname, '..', 'node_modules')));
var httpServer = app.listen(8000, 'localhost', function () {
    var port = httpServer.address().port;
    console.log('HTTP Server is listening on %s', port);
});
