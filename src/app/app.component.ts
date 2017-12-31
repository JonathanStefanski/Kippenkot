import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from "@angular/router";

import { AuthService } from "./authentication/auth.service";
import { Roles } from 'app/shared/constants';


@Component({
  moduleId: module.id,
  selector: 'my-ng-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {  
  title = 'Lepside';
  loading: boolean = true;

  constructor(private router: Router,
              public _auth: AuthService) {
    router.events.subscribe((routerEvent : Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  logout() : void {
     this._auth.logout();
     this.router.navigate([{ outlets: { primary: ['home'], popup: null } }]);            
  }

  checkRouterEvent(routerEvent: Event) {
    if (routerEvent instanceof NavigationStart) {      
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  isAdmin() : boolean {
    return this._auth.isInRole(Roles.ADMIN.toString());
  }
}

