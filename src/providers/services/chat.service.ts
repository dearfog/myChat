import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';
@Injectable()
export class ChatService {
    private url = environment.socket;
    private socket;    

    constructor() {
        this.socket = io(this.url);
    }
    public sendMessage(message) {
        this.socket.emit('new-message', message);
    }
    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            });
        });
    }
}