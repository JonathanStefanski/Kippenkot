import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../authentication/auth.service';
import { environment } from '../../environments/environment';
import { Country } from './euro.model';


@Injectable()
export class EurosongService {  
    private baseUrl = environment.apiUrl + 'api/eurosong';    
    

    constructor(private _httpClient: HttpClient) {
       
    }
    
    getCountries(): Observable<Array<Country>> {
        const url = `${environment.apiUrl}/api/eurosong/getCountries`;
        return this._httpClient.get<Array<Country>>(url);
    }
    
}