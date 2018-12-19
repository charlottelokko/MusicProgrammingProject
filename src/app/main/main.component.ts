import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { User, Favourites, PlayedTrack } from '../core/user-type';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  userData: any;
  songId: string = window.location.hash;
  constructor(
    public auth: AuthService,
    public _spotifyService: SpotifyService,
    private afs: AngularFirestore,
    private route: ActivatedRoute
  ) {
    auth.user.subscribe(_user => {
      let trackExists = false;
      console.log('User: ' + JSON.stringify(_user));
      this.userData = _user;
      console.log(this.userData.playedTracks);
      if (this.userData.playedTracks) {
        this.userData.playedTracks.map(playedTrack => {
          if (playedTrack.id === this.songId) {
            trackExists = true;
          }
        });
      }
      if (!trackExists) {
        const trackData: any = _spotifyService.getTrackObject(this.songId);
        const releaseDate = trackData.album.released_date.split('-');
        const data = {
          id: this.songId,
          title: trackData.name,
          artist: trackData.artists.map(artist => artist.name),
          album_name: trackData.album.name,
          released: new Date(releaseDate[0], releaseDate[1], releaseDate[2]),
          duration: trackData.duration_ms,
          favourites: {
            rating: 0,
            favourited: false,
            play_count: 1,
          },
          image_url: trackData.images.map(image => image.url),
        };
        this.userData.playedTracks.push(data);
      }
    });
    $(document).ready(() => {});
  }
  toggleFavourited() {
    this.userData.playedTracks.map(playedTrack => {
      if (playedTrack.id === this.songId) {
        playedTrack.favourites.favourited = !playedTrack.favourites.favourited;
      }
    });
  }
  ngOnInit() {
    // Makes songID = the hash of the URL e.g #123 = 123
    this.route.fragment.subscribe(fragment => {
      this.songId = fragment;
      console.log('SongID: ' + this.songId);
    });
  }
}
