import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable, Subject } from "rxjs/Rx";

import { User } from "./auth.model";
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
    private baseUrl = `${environment.apiUrl}api/account`;
    currentUser: User;
    redirectUrl: string;   

    constructor(private _http: Http) { 
        this.currentUser = JSON.parse(localStorage.getItem('_currentUser'));  
    }

    private extractData(response: Response) {        
        let body = response.json();
        return body || {};
    }    

    private _handleError(err: any) {
        console.log(err);
        return Observable.throw(err);
    }

    isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    isInRole(role : string): boolean {
        if (this.currentUser == null || this.currentUser.roles == null) return false;
        return this.currentUser.roles.map(r => r.toLowerCase()).indexOf(role.toLowerCase()) > -1;
    }

    login(userName: string, password: string): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        const url = environment.apiUrl  + 'Token';

        let data = new URLSearchParams();
        data.append('username', userName);
        data.append('password', password);
        data.append('grant_type', 'password');
        
        return this._http.post(url, data, options)        
        .map((response: Response) => {
            let userInfo = this.extractData(response);                        
            if (userInfo) {
                this.currentUser = userInfo;          
                this.currentUser.roles = JSON.parse(userInfo["roles"]);                
                localStorage.setItem('_currentUser', JSON.stringify(this.currentUser));
                console.log(this.currentUser);
                return true;
            } else {
                return false;
            }
        })
        .catch(this._handleError);
    }

    logout(): void {
        this.currentUser = null;
        localStorage.removeItem('_currentUser');
    }

    checkName(userName: string): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        const url = `${this.baseUrl}/CheckUsername`;

        let data = new URLSearchParams();
        data.append('userName', userName);
       
        return this._http.post(url, data, options)  
            .map((r) => r.ok)
            .catch(err => {               
                return Observable.of(<Response>err).map((r) => r.ok)
            });
    }

}