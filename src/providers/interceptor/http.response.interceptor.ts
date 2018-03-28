import { Injectable } from '@angular/core';
import {
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).do((event: any) => {
            if (event instanceof HttpResponse) {
                if (event) {
                    console.log(event);
                    
                }
            }
        })
    }
}