import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { EurosongService } from './euro.service';

@Injectable()
export class CountriesResolver implements Resolve<any> {
    constructor(
        private _eurosongService: EurosongService,
        private _router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this._eurosongService.getCountries()
            .catch(error => {
                console.log(`Retrievel error: ${error}`);
                this._router.navigate(['/error']);
                return Observable.of(null);
            });
    }
}
