import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { Country, Score } from './euro.model';

@Component({
  selector: 'app-euro-song',
  templateUrl: './euro-song.component.html',
  styleUrls: ['./euro-song.component.css']
})
export class EuroSongComponent implements OnInit {
  country: Country;
  myScore: Score;

  constructor(
    private _auth: AuthService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.data.subscribe(
      data => {
        this.country = data['country'];
        this.myScore = this.country.scores.find(e => e.user === this._auth.currentUser.id);
        console.log(this.myScore);
        console.log(this.country);
      }
    );
  }

}
