import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EurosongService } from './euro.service';

import { AppSharedModule } from '../shared/shared.module';
import { SharedModule, TooltipModule, SliderModule } from 'primeng/primeng';
import { CountriesResolver, CountryResolver } from './euro-resolver.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../shared/token.interceptor';
import { EuroOverviewComponent } from './euro-overview.component';
import { EuroSongComponent } from './euro-song.component';

const ROUTES = [
    { 
        path: '', 
        component: EuroOverviewComponent,
        resolve: { countries: CountriesResolver}
    },
    { 
        path: ':id', 
        component: EuroSongComponent, 
        resolve: { country: CountryResolver}
    }
];

@NgModule({
    imports: [         
        AppSharedModule,        
        ReactiveFormsModule,
        TooltipModule,
        SharedModule,
        SliderModule,
        HttpClientModule,
        RouterModule.forChild(ROUTES) 
    ],
    declarations: [ 
        EuroOverviewComponent, 
        EuroSongComponent
    ],
    providers: [
        EurosongService,
        CountryResolver,
        CountriesResolver,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ]
})
export class EurosongModule { }
