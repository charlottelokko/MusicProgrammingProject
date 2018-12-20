import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { User, Favourites, PlayedTrack } from '../core/user-type';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';
import { GeniusService } from '../services/genius.service';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  userData: any;
  songId: string = window.location.hash;
  url: string;

  // tslint:disable-next-line:max-line-length
  constructor(
    public auth: AuthService,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private _spotifyService: SpotifyService,
    private _geniusService: GeniusService,
    public sanitizer: DomSanitizer
  ) {
    auth.user.subscribe(_user => {
      let trackExists = false;
      console.log('User: ' + JSON.stringify(_user));
      this.userData = _user;
      console.log('Played Tracks: ' + this.userData.playedTracks);
      if (this.userData.playedTracks !== undefined) {
        this.userData.playedTracks.map(playedTrack => {
          if (playedTrack.id === this.songId) {
            trackExists = true;
          }
        });
      }
      // if (!trackExists) {
      //   let trackData: any;
      //   const trackDataObj: any = _spotifyService
      //     .getTrackObject(this.songId)
      //     .subscribe(res => {
      //       trackData = res;

      //       console.log(trackData);
      //       const data = {
      //         id: this.songId,
      //         title: trackData.name,
      //         artists: trackData.artists.map(artist => artist.name),
      //         album_name: trackData.album.name,
      //         released: trackData.album.release_date,
      //         duration: trackData.duration_ms,
      //         favourites: {
      //           rating: 0,
      //           favourited: false,
      //           play_count: 1,
      //         },
      //         image_url: trackData.images,
      //       };
      //       const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      //         `users/${_user.uid}`
      //       );
      //       this.userData.playedTrack.push(data);
      //       userRef.set(this.userData, {
      //         merge: true,
      //       });
      //     });
      // }
    });
    $(document).ready(() => {});

    // this.url = this.sanitizer.bypassSecurityTrustUrl('https://open.spotify.com/embed/track/' + this.songId);
    // console.log(this.url);
  }

  toggleFavourited() {
    this.userData.playedTracks.map(playedTrack => {
      if (playedTrack.id === this.songId) {
        playedTrack.favourites.favourited = !playedTrack.favourites.favourited;
      }
    });
  }
  ngOnInit() {
    // Makes songId = the hash of the URL e.g #123 = 123
    this.route.fragment.subscribe(fragment => {
      const trackString = fragment.split('+');
      this.songId = trackString[0];
      const lyricsString =
        decodeURIComponent(trackString[1]) +
        ' ' +
        decodeURIComponent(trackString[2]);
      console.log('lyricsString:' + lyricsString);
      console.log(this._geniusService.searchLyrics(lyricsString));
    });
  }
}
