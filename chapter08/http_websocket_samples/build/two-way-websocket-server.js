"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var ws_1 = require("ws");
var Product = /** @class */ (function () {
    function Product(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
    return Product;
}());
var products = [
    new Product(0, 'First Product', 24.99),
    new Product(1, 'Second Product', 64.99),
    new Product(2, 'Third Product', 74.99)
];
function getProducts() {
    return products;
}
var app = express();
app.use('/', express.static(path.resolve(__dirname, '..', 'client')));
app.use('/node_modules', express.static(path.resolve(__dirname, '..', 'node_modules')));
app.get('/products', function (req, res) {
    res.json(getProducts());
});
var httpServer = app.listen(8000, 'localhost', function () {
    var port = httpServer.address().port;
    console.log('HTTP Server is listening on %s', port);
});
var wsServer = new ws_1.Server({ port: 8085 });
console.log('WebSocket Server is listening on port 8085');
wsServer.on('connection', function (websocket) {
    websocket.send('This message was pushed by the WebSocket server');
    websocket.on('message', function (message) { return console.log('Server received: %s', message); });
});
