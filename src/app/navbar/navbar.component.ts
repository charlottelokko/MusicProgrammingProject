import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [SpotifyService]
})
export class NavbarComponent implements OnInit {
  searchStr: string;

  constructor(private _sportifyService: SpotifyService) { }

  ngOnInit() {
  }

  searchMusic() {
    console.log(this.searchStr);
    this._sportifyService.searchMusic(this.searchStr)
        .subscribe(res => {
          console.log(res.track.items);
        });
  }

}
