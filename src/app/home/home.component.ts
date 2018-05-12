import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../authentication/auth.service';

@Component({   
    moduleId: module.id, 
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {   
    public pageTitle = 'Welkom bij kippenkot.be!';
    public lastUpdated: Date = environment.lastUpdated;
    public imagePath = '../assets/images/no-nugget.jpg';
    public isLoggedIn = false;
    public username: string;

    constructor(private _auth: AuthService) { }

    ngOnInit(): void {        
        this.isLoggedIn = this._auth.isLoggedIn();

        if (this.isLoggedIn) {
            this._auth.refreshRoles();
            this.username = this._auth.currentUser.userName;
        }        
    }

}
