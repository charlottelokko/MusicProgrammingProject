import { Component, OnInit } from '@angular/core';
// import { SpotifyService } from '../services/spotify.services'; // changed this due to the file name change
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [SpotifyService],
})
export class NavbarComponent implements OnInit {
  searchStr: string;

  constructor(private _spotifyService: SpotifyService) {}

  ngOnInit() {}

  searchMusic() {
    console.log(this.searchStr);
    this._spotifyService.searchMusic(this.searchStr).subscribe(res => {
      // this gets the data instead using .json()
      console.log(res['tracks.items']);
    });
  }
}
