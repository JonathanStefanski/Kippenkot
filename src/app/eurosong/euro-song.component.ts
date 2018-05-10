import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import { Country, Score } from './euro.model';
import { EurosongService } from './euro.service';
import { min } from 'rxjs-compat/operator/min';

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
  bounds = {
    min_act: 0,
    min_song: 0,
    min_voice: 0,
    min_total: 0,
    max_act: 10,
    max_song: 10,
    max_voice: 10,
    max_total: 30
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

        this.bounds.min_act = Math.min(...this.country.scores.map(s => s.actScore));
        this.bounds.max_act = Math.max(...this.country.scores.map(s => s.actScore));
        this.bounds.min_song = Math.min(...this.country.scores.map(s => s.songScore));
        this.bounds.max_song = Math.max(...this.country.scores.map(s => s.songScore));
        this.bounds.min_voice = Math.min(...this.country.scores.map(s => s.voiceScore));
        this.bounds.max_voice = Math.max(...this.country.scores.map(s => s.voiceScore));
        this.bounds.min_total = Math.min(...this.country.scores.map(s => s.actScore + s.songScore + s.voiceScore));
        this.bounds.max_total = Math.max(...this.country.scores.map(s => s.actScore + s.songScore + s.voiceScore));

        this.country.scores.splice(this.country.scores.indexOf(this.myScore) , 1);
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
