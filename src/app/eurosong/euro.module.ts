import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EurosongService } from './euro.service';

import { AppSharedModule } from '../shared/shared.module';
import { SharedModule, TooltipModule } from 'primeng/primeng';
import { EuroTestComponent } from './euro-test.component';
import { CountriesResolver } from './euro-resolver.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../shared/token.interceptor';

const ROUTES = [
    { 
        path: '', 
        component: EuroTestComponent,
        resolve: { countries: CountriesResolver}
    },
];

@NgModule({
    imports: [         
        AppSharedModule,        
        ReactiveFormsModule,
        TooltipModule,
        SharedModule,
        HttpClientModule,
        RouterModule.forChild(ROUTES) 
    ],
    declarations: [ 
        EuroTestComponent
    ],
    providers: [
        EurosongService,
        CountriesResolver,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ]
})
export class EurosongModule { }
