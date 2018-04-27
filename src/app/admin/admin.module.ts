import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UserListComponent } from './user-list.component';

import { AppSharedModule } from '../shared/shared.module';
import { AdminService } from '../admin/admin.service';
import { UserListResolver, RoleListResolver } from '../admin/admin.resolver';
import { DataTableModule, SharedModule, CheckboxModule, TooltipModule } from 'primeng/primeng';


const ROUTES = [
    { 
        path: 'users', 
        component: UserListComponent,
        resolve: { users: UserListResolver, roles: RoleListResolver}
    },
    { 
        path: '', 
        redirectTo: 'users', 
        pathMatch: 'full' 
    }, 
];

@NgModule({
    imports: [      
        AppSharedModule,
        DataTableModule,
        CheckboxModule,
        TooltipModule,
        SharedModule,
        RouterModule.forChild(ROUTES) 
    ],
    declarations: [ 
        UserListComponent
    ],
    providers: [ 
        AdminService,
        UserListResolver,
        RoleListResolver
    ]
})
export class AdminModule { }
