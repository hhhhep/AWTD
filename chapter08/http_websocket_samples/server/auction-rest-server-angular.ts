import * as path from 'path';
import * as express from 'express';

class Product {
    constructor(public id : number,
        public title : string,
        public price : number) {}
}

const products = [
    new Product(0, 'First Product', 24.99),
    new Product(1, 'Second Product', 64.99),
    new Product(2, 'Third Product', 74.99)
];

function getProducts() : Product[] {
    return products;
}

function getProductById(productId : number) : Product {
    return products.find(p => p.id === productId);
}

const app = express();

// app.get('/', (req, res) => {
//     res.send('The URL for products is http://localhost:8000/products');
// });

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    res.json(getProductById(parseInt(req.params.id)));
});

app.use('/', express.static(path.resolve(__dirname, '..', 'client')));
app.use('/node_modules', express.static(path.resolve(__dirname, '..', 'node_modules')));

const server = app.listen(8000, 'localhost', () => {
    const { address, port } = server.address();
    console.log('Listening on %s %s', address, port);
});