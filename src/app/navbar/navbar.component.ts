import { Component, OnInit } from '@angular/core';
// import { SpotifyService } from '../services/spotify.services'; // changed this due to the file name change
import { SpotifyService } from '../services/spotify.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [SpotifyService],
})

export class NavbarComponent implements OnInit {
  searchStr: string;

  constructor(private _spotifyService: SpotifyService) {
    $(document).ready(() => {
      $('.dropdown').keyup(function(event) {
        // preventing default behaviour of bootstrap
        event.stopPropagation();
        ($('.dropdown-menu') as any).dropdown().toggle();
      });
    });
  }

  ngOnInit() {}

  searchMusic() {
    console.log(this.searchStr);
    if (this.searchStr !== '') {
      this._spotifyService.searchMusic(this.searchStr).subscribe(
        res => {
          // this gets the data instead using .json()
          console.log((res as any).tracks.items);
        },
        err => {
          console.log('Error:' + err);
        }
      );
    }
  }
}
 
  

