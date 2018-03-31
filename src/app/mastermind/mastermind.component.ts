import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Color } from './mastermind.models';

@Component({
    moduleId: module.id,
    templateUrl: 'mastermind.component.html',
    styleUrls: ['mastermind.component.css']
})
export class MasterMindComponent implements OnInit {
    constructor(private _route: ActivatedRoute) { }

    colors: Color[];

    ngOnInit(): void {
        this._route.data.subscribe(
            d => {
                this.colors = d['colors'];
                console.log(this.colors);
            }
        );
    }
}
