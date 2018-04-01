import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({   
    moduleId: module.id, 
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent {    
    public pageTitle = 'Welkom bij kippenkot.be!';
    public lastUpdated: Date = environment.lastUpdated;
    public imagePath = '../assets/images/no-nugget.jpg';
}
