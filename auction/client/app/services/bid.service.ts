import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';
import { Observable, Subscriber } from 'rxjs/Rx';

@Injectable()
export class BidService {
    constructor(private wsSocket : WebSocketService) {}

    watchProduct(productId : number) : Observable {
        let openSubscriber = Subscriber.create(
            () => this.wsSocket.send({ productId : productId }));

        return this.wsSocket.createObservableSocket('ws://localhost:8000', openSubscriber)
            .map(message => JSON.parse(message));
    }
}