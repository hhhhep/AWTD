"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
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
