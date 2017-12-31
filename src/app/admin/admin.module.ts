import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";

import { UserListComponent } from './user-list.component';

import { AppSharedModule } from "../shared/shared.module";
import { AdminService } from '../admin/admin.service';
import { UserListResolver } from '../admin/user-list.resolver';
import { DataTableModule, SharedModule, CheckboxModule } from 'primeng/primeng';
import { Roles } from 'app/shared/constants';

const ROUTES = [
    { 
        path: 'users', 
        component: UserListComponent,
        resolve: { users: UserListResolver}
    },
    { 
        path: '', 
        redirectTo: 'users', 
        pathMatch: 'full' 
    }, 
]

@NgModule({
    imports: [      
        AppSharedModule,
        DataTableModule,
        CheckboxModule,
        SharedModule,
        RouterModule.forChild(ROUTES) 
    ],
    declarations: [ 
        UserListComponent
    ],
    providers: [ 
        AdminService,
        UserListResolver
    ]
})
export class AdminModule { }