import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { Country } from './euro.model';
import { EurosongService } from './euro.service';

@Component({
  selector: 'app-euro-overview',
  templateUrl: './euro-overview.component.html',
  styleUrls: ['./euro-overview.component.css']
})
export class EuroOverviewComponent implements OnInit {
  countries: Country[];
  confirmed = false;
  completed = false;

  constructor(
    private _auth: AuthService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _euroService: EurosongService
  ) { }

  ngOnInit() {
    this._route.data.subscribe(data => this.initialiseData(data['countries']));
  }

  confirm() {
    this._euroService.confirm().subscribe(
      () => {
        this._euroService.getCountries().subscribe(data => this.initialiseData(data));
      },
      (error) => console.log(error) 
    );
  }

  initialiseData(data: Country[]) {
    this.countries = data;  

    this.confirmed = this.countries.some(c => c.confirmed);
    this.completed = !this.countries.some(c => c.scores.length === 0) && !this.confirmed;

    if (this.confirmed) {
      this.countries = this.countries.sort((a, b) => b.totalScore - a.totalScore);
    } else {
      this.countries = this.countries.sort((a, b) => a.followNr - b.followNr);
    }
  }
}
