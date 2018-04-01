import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { User } from './admin.models';
import { AuthService } from '../authentication/auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AdminService {
    private baseUrl = environment.apiUrl + 'api/account';    
    headers: Headers;
    options: RequestOptions;

    constructor(private _http: Http,
                private _auth: AuthService) {
       this._setOptions();
    }

    private _setOptions() {
        const bearer = this._auth.currentUser == null ? '' : this._auth.currentUser.access_token;
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${bearer}` });
        this.options = new RequestOptions({ headers: this.headers });    
    }

    private _extractData(response: Response) {    
        try {
            const body = response.json();
            return body || {};
        } catch (error) {
            return {};
        } 
    }    

    private _handleError(err: any) {
        console.log(err);
        return Observable.throw(err);
    }

    getUsers(): Observable<User[]> {
        this._setOptions();

        const url = `${this.baseUrl}/users`;
        return this._http.get(url, this.options)            
            .map(this._extractData)            
            .map(r => User.fromJSONArray(r))            
            .catch(this._handleError);
    }

    changeRole(user: User, role: string, flag: boolean): Observable<Response> {
        this._setOptions();

        const url = `${this.baseUrl}/changeRole`;
        const data = {
            UserId: user.id,
            Role: role,
            Allow: flag
        };
        
        return this._http
            .post(url, data, this.options)
            .map(this._extractData)
            .catch(this._handleError);
    }

}
