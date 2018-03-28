import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoadingService {
    public loader = new Subject<any>();
    
    startLoading(l){
        this.loader.next(l);
    }
    getLoader():Observable<any>{
        return this.loader.asObservable();
    }
}