import * as express from 'express';
import * as path from 'path';

const app = express();

app.use('/', express.static(path.resolve(__dirname, '..', 'client')));
app.use('/node_modules', express.static(path.resolve(__dirname, '..', 'node_modules')));

const httpServer = app.listen(8000, 'localhost', () => {
    const { port } = httpServer.address();
    console.log('HTTP Server is listening on %s', port);
});