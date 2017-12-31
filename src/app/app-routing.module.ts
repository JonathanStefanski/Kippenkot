import { NgModule } from '@angular/core';
import { RouterModule, CanActivate } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { Page404Component, PageErrorComponent } from './page-404.component';
import { AuthGuard, AdminGuard } from "./authentication/auth-guard.service";

import { SelectiveStrategy } from "./shared/selective-strategy.service";

const ROUTES = [
    { path: 'home', component: HomeComponent },
    { path: 'admin', data: {preload: true}, loadChildren: './admin/admin.module#AdminModule', canActivate: [AdminGuard]},
    { path: 'mastermind', data: {preload: true}, loadChildren: './mastermind/mastermind.module#MasterMindModule'},    
    { path: 'error', component: PageErrorComponent },    
    { path: '', redirectTo: 'home', pathMatch: 'full' },    
    { path: '**', component: Page404Component }
]

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES, { preloadingStrategy: SelectiveStrategy })
    ],
    providers: [ SelectiveStrategy ],
    exports: [RouterModule]
})
export class AppRoutingModule { }