import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-euro-test',
  templateUrl: 'euro-test.component.html',
  styleUrls: ['euro-test.component.css']
})
export class EuroTestComponent implements OnInit {
  countries = [];
  Math: Math = Math;

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.data.subscribe(
      data => {
        this.countries = data['countries'];
        console.log(this.countries);
        this.countries = this.countries.sort((a, b) => a['followNr'] - b['followNr']);
      }
    );
  }
}
