import * as express from 'express';
import * as path from 'path';
import { Server } from 'ws';

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client/simple-websocket-client.html'));
});

const httpServer = app.listen(8000, 'localhost', () => {
    const { port } = httpServer.address();
    console.log('HTTP Server is listening on %s', port);
});

const wsServer : Server = new Server({ port : 8085 });
// const wsServer : Server = new Server({ server : httpServer });
console.log('WebSocket server is listening on port 8085');

wsServer.on('connection', websocket => {
    websocket.send('This message was pushed by the WebSocket server.');
});