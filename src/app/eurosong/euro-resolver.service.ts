import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { EurosongService } from './euro.service';
import { Country } from './euro.model';

@Injectable()
export class CountriesResolver implements Resolve<Array<Country>> {
    constructor(
        private _eurosongService: EurosongService,
        private _router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Country>> {
        return this._eurosongService.getCountries()
            .catch(error => {
                console.log(`Retrievel error: ${error}`);
                this._router.navigate(['/error']);
                return Observable.of(null);
            });
    }
}

@Injectable()
export class CountryResolver implements Resolve<Country> {
    constructor(
        private _eurosongService: EurosongService,
        private _router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Country> {
        const id = route.params['id'];
        if (isNaN(id)) {
            console.log(`Country id was not a number: ${id}`);
            this._router.navigate(['/eurosong']);
            return Observable.of(null);
        }

        return this._eurosongService.getCountry(+id)            
            .catch(error => {
                console.log(`Retrievel error: ${error}`);
                this._router.navigate(['/eurosong']);
                return Observable.of(null);
            });
    }
}
