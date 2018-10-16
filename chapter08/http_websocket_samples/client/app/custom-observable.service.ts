import { Observable } from 'rxjs/Rx';

export class CustomObservableService {
    createObservableService() : Observable<Date> {
        // return new Observable((observer) => {
        //     setInterval(() => {
        //         observer.next(new Date())
        //     }, 1000);
        // });
        return new Observable((observer) => {
            try {
                throw('Got an error');
            } catch (err) {
                observer.error(err);
            } finally {
                observer.complete();
            }
        });
        
    }
}