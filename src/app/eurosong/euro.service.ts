import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../authentication/auth.service';
import { environment } from '../../environments/environment';
import { Country, Score } from './euro.model';


@Injectable()
export class EurosongService {  
    private baseUrl = environment.apiUrl + 'api/eurosong';    
    

    constructor(private _httpClient: HttpClient) {
       
    }
    
    getCountries(): Observable<Array<Country>> {
        const url = `${this.baseUrl}/getCountries`;
        return this._httpClient.get<Array<Country>>(url);
    }

    getCountry(id: number): Observable<Country> {
        if (id === 0) { return Observable.of(null); }
        const url = `${this.baseUrl}/getCountry`;
        const params = new HttpParams().set('id', id.toString());

        return this._httpClient.get<Country>(url, {params});
    }

    saveScore(score: Score): Observable<{}> {
        const url = `${this.baseUrl}/savePoints`;
        return this._httpClient.post<{}>(url, score);
    }
    
}
