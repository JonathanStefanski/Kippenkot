import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from './admin.models';
import { AdminService } from './admin.service';
import { Roles, Gender } from "../shared/constants";


@Component({
    moduleId: module.id,
    templateUrl: 'user-list.component.html',
    styleUrls: ['user-list.component.css']
})
export class UserListComponent implements OnInit {
    readonly Roles = Roles;
    readonly Gender = Gender;

    users: User[];
    hideId: boolean;    

    constructor(
        private _adminService: AdminService,
        private _route: ActivatedRoute
    ) { }

    ngOnInit() { 
        this._route.data.subscribe(
            data => {this.users = data['users']; console.log(this.users); }
        )
        this.hideId = true;
    }

    toggleIds() {        
        this.hideId = !this.hideId;
    }    

    changeRole(user: User, role: Roles, event: any) {
        user.locked = true;

        this._adminService.changeRole(user, role, event.target.checked).subscribe(
            () => {
                // console.log("Success.");
            },
            (error) => {
                console.log(error);
                event.target.checked = !event.target.checked;
            },
            () => {
                user.locked = false;
                if(event.target.checked)
                    user.roles.push(role);
                else
                    user.roles.splice(user.roles.map(r => r.toLocaleLowerCase()).indexOf(role.toLocaleLowerCase()), 1);
            }
        );
    }
}