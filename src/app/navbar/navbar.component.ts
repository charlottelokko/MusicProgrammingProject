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
          console.log((res as any).tracks.items);
          // console.log((res as any).tracks.items.length);
          // console.log((res as any).tracks.items[0].artists.length);
          const trackAmount = (res as any).tracks.items.length;
          let artists;
          let track;
          let image;
          let trackId;
          const element = document.getElementById('drop');

          element.innerHTML = ' ';
          for (let i = 0; i < 10; i++) {
            trackId = (res as any).tracks.items[i].id;
            console.log((res as any).tracks.items[i].id);
            artists = ' ';
            const artistsAmount = (res as any).tracks.items[i].artists.length;
            console.log((res as any).tracks.items[i].name);
            track = (res as any).tracks.items[i].name;
            console.log((res as any).tracks.items[i].album.images[1].url);

            for (let j = 0; j < artistsAmount; j++) {
              console.log((res as any).tracks.items[i].artists[j].name);
              if(j>0){
              artists += ((res as any).tracks.items[i].artists[j].name + ', ');
              }
              else{
                artists = (res as any).tracks.items[i].artists[j].name;
              }
            }
            const divy = document.createElement('div');
            const atag = document.createElement('a');
            const breaky = document.createElement('br');

            // const trackList = document.createTextNode(track + ' : ');
            // const artistList = document.createTextNode(artists);
            // atag.appendChild(trackList);
            // atag.appendChild(artistList);
            atag.innerHTML = (track + ' : ' + artists);
            atag.setAttribute('href', 'main#' +  trackId);
            atag.setAttribute('class', 'dropdown-item overflow');

            // divy.appendChild(atag);

            element.appendChild(atag);
            element.appendChild(breaky);
          }
          // console.log((res as any).tracks.items[0].name);
          // console.log((res as any).tracks.items[0].artists[0].name);
        },
        err => {
          console.log('Error:' + err);
        }
      );
    } else {
      const element = document.getElementById('drop');
      element.innerHTML = ' ';
    }
  }
}

