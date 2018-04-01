import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AdminService } from './admin.service';
import { User } from './admin.models';

@Injectable()
export class UserListResolver implements Resolve<User[]> {
    constructor(
        private _adminService: AdminService,
        private _router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
        return this._adminService.getUsers()
            .catch(error => {
                console.log(`Retrievel error: ${error}`);
                this._router.navigate(['/error']);
                return Observable.of(null);
            });
    }
}

@Injectable()
export class RoleListResolver implements Resolve<string[]> {
    constructor(
        private _adminService: AdminService,
        private _router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string[]> {
        return this._adminService.getRoles()
            .catch(error => {
                console.log(`Retrievel error: ${error}`);
                this._router.navigate(['/error']);
                return Observable.of(null);
            });
    }
}
