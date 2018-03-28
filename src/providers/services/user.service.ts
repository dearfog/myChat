import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { User } from "../models/user.model";
import { Observable } from 'rxjs/Observable';
import { environment } from "../environments/environment";

@Injectable()
export class UserService {
    public user = new Subject<any>();
    constructor(public http:HttpClient){}
    
    signin(credentials) {
        return this.http.post(environment.signin,credentials);
    }
    signup(credentials) {
        return this.http.post(environment.signup,credentials);
    }
    verify(token) {
        return this.http.post(environment.api+"/verify",{token:token});
    }
    
    setCurrnetUserDetails(user:any){
        this.user.next(user);
    }

    getCurrentUser():Observable <User>{
        return this.user.asObservable();
    }
   
}