import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { Country, Score } from './euro.model';
import { EurosongService } from './euro.service';

@Component({
  selector: 'app-euro-song',
  templateUrl: './euro-song.component.html',
  styleUrls: ['./euro-song.component.css']
})
export class EuroSongComponent implements OnInit {
  country: Country;
  myScore: Score;
  slider = {
    min: 0,
    max: 10,
    animate: true,
    disabled: false,
    style: 'inline-slider',
    styleClass: 'box-slider'
  };

  constructor(
    private _auth: AuthService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _euroService: EurosongService
  ) { }

  ngOnInit() {
    this._route.data.subscribe(
      data => {
        this.country = data['country'];
        this.myScore = this.country.scores.find(e => e.user === this._auth.currentUser.id) || new Score(
          this._auth.currentUser.id, this.country.id
        );

        
      }
    );
  }

  saveScore(): void {

    this._euroService.saveScore(this.myScore).subscribe(
      () => this._router.navigate(['/eurosong']),
      (error) => console.log(error)
    );

    
  }

}
