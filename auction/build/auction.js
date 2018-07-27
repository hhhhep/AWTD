"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var ws_1 = require("ws");
var model_1 = require("./model");
var app = express();
app.use('/', express.static(path.resolve(__dirname, '..', 'client')));
app.use('/node_modules', express.static(path.resolve(__dirname, '..', 'node_modules')));
app.get('/products', function (req, res) {
    res.json(model_1.getProducts(req.query));
});
app.get('/products/:productId', function (req, res) {
    res.json(model_1.getProductById(parseInt(req.params.productId)));
});
app.get('/products/:productId/reviews', function (req, res) {
    res.json(model_1.getReviewsByProductId(parseInt(req.params.productId)));
});
var httpServer = app.listen(8000, 'localhost', function () {
    var port = httpServer.address().port;
    console.log('HTTP Server is listening on %s', port);
});
var wsServer = new ws_1.Server({ server: httpServer });
wsServer.on('connection', function (ws) {
    ws.on('message', function (message) {
        var subscriptionRequest = JSON.parse(message);
        subscribeToProductBids(ws, subscriptionRequest.productId);
    });
});
var subscriptions = new Map();
function subscribeToProductBids(client, productId) {
    var products = subscriptions.get(client) || [];
    subscriptions.set(client, products.concat([productId]));
}
setInterval(function () {
    generateNewBids();
    broadcastNewBidsToSubscribers();
}, 2000);
var currentBids = new Map();
function generateNewBids() {
    model_1.getProducts().forEach(function (p) {
        var currentBid = currentBids.get(p.id) || p.price;
        var newBid = random(currentBid, currentBid + 5);
        currentBids.set(p.id, newBid);
    });
}
function broadcastNewBidsToSubscribers() {
    subscriptions.forEach(function (products, ws) {
        if (ws.readyState === 1) {
            var newBids = products.map(function (pid) { return ({
                productId: pid,
                bid: currentBids.get(pid)
            }); });
            ws.send(JSON.stringify(newBids));
        }
        else {
            subscriptions.delete(ws);
        }
    });
}
function random(low, high) {
    return Math.random() * (high - low) + low;
}
