import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { Country } from './euro.model';

@Component({
  selector: 'app-euro-overview',
  templateUrl: './euro-overview.component.html',
  styleUrls: ['./euro-overview.component.css']
})
export class EuroOverviewComponent implements OnInit {
  countries: Country[];

  constructor(
    private _auth: AuthService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.data.subscribe(
      data => {
        this.countries = data['countries'];
        this.countries.map((c) => c.scores = c.scores.filter(s => s.user === this._auth.currentUser.id));
        console.log(this.countries);
      }
    );
  }

}
