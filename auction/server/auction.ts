import * as express from 'express';
import * as path from 'path';
import { getProducts, getProductById, getReviewsByProductId } from './model';

const app = express();

app.use('/', express.static(path.resolve(__dirname, '..', 'client')));
app.use('/node_modules', express.static(path.resolve(__dirname, '..', 'node_modules')));

app.get('/products', (req, res) => {
    res.json(getProducts(req.query));
});

app.get('/products/:productId', (req, res) => {
    res.json(getProductById(parseInt(req.params.productId)));
});

app.get('/products/:productId/reviews', (req, res) => {
    res.json(getReviewsByProductId(parseInt(req.params.productId)));
});

const httpServer = app.listen(8000, 'localhost', () => {
    const { port } = httpServer.address();
    console.log('HTTP Server is listening on %s', port);
});