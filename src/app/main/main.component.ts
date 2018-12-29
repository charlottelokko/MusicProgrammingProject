import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { User, Favourites, PlayedTrack } from '../core/user-type';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import firebase from 'firebase/app';
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
  favourite: boolean;
  playCheck = false;
  playCountInterval = null;
  constructor(
    public auth: AuthService,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private _spotifyService: SpotifyService,
    private _geniusService: GeniusService,
    public sanitizer: DomSanitizer
  ) {
    $(document).ready(() => {
      ($('[data-toggle="tooltip"]') as any).tooltip();
      // when the favourite icon is clicked
      $('#favourite').click(() => {
        if (this.songId !== '') {
          this.userData.playedTracks.map(playedTrack => {
            if (playedTrack.id === this.songId) {
              playedTrack.favourites.favourited = !playedTrack.favourites
                .favourited;
              this.favourite = playedTrack.favourites.favourited;
            }
          });
          const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `users/${this.userData.uid}`
          );
          userRef.update({ playedTracks: this.userData.playedTracks });
        } else {
          console.log("Song doesn't exist");
        }
      });
    });
  }
  incrementPlayCount() {
    if (!this.playCheck) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(
        `users/${this.userData.uid}`
      );
      this.userData.playedTracks.forEach((playedTrack, i) => {
        if (playedTrack.id === this.songId) {
          this.userData.playedTracks[i].favourites.play_count += 1;
          // console.log(this.userData.playedTracks[i].favourites.play_count);
        }
      });
      userRef.update({
        playedTracks: this.userData.playedTracks,
      });
      this.playCheck = true;
    }
  }
  updateFavouriteSettings() {
    this.auth.user.subscribe(_user => {
      let trackExists = false;
      // If the user is logged in
      if (_user !== null) {
        // stores the users data
        this.userData = _user;
        // If the user has played a track before
        if (this.userData.playedTracks !== undefined) {
          this.userData.playedTracks.map(playedTrack => {
            if (playedTrack.id === this.songId) {
              trackExists = true;
            }
          });
          // If this track hasn't already been added to the users playedTracks
          if (!trackExists) {
            console.log(
              "You've never played this track with this account before!"
            );
            let trackData: any;
            this._spotifyService.getTrackObject(this.songId).subscribe(res => {
              trackData = res;
              // console.log('TrackData: ' + JSON.stringify(trackData));
              const data = {
                id: this.songId,
                title: trackData.name,
                artists: trackData.artists.map(artist => artist.name),
                album_name: trackData.album.name,
                released: trackData.album.release_date,
                duration: trackData.duration_ms,
                favourites: {
                  rating: 0,
                  favourited: false,
                  play_count: 1,
                },
                image_url: trackData.album.images.map(image => image.url),
              };
              const userRef: AngularFirestoreDocument<any> = this.afs.doc(
                `users/${this.userData.uid}`
              );
              userRef.update({
                playedTracks: firebase.firestore.FieldValue.arrayUnion(data),
              });
              this.favourite = data.favourites.favourited;
            });
          } else {
            this.userData.playedTracks.map(playedTrack => {
              if (playedTrack.id === this.songId) {
                this.favourite = playedTrack.favourites.favourited;
              }
            });
            console.log("You've played this track with this account before!");
          }
        } else {
          let trackData: any;
          this._spotifyService.getTrackObject(this.songId).subscribe(res => {
            trackData = res;
            const data: PlayedTrack = {
              id: this.songId,
              title: trackData.name,
              artists: trackData.artists.map(artist => artist.name),
              album_name: trackData.album.name,
              released: trackData.album.release_date,
              duration: trackData.duration_ms,
              favourites: {
                rating: 0,
                favourited: false,
                play_count: 1,
              },
              image_url: trackData.album.images.map(image => image.url),
            };
            const userRef: AngularFirestoreDocument<any> = this.afs.doc(
              `users/${this.userData.uid}`
            );
            userRef.set({ playedTracks: [data] }, { merge: true });
            this.favourite = data.favourites.favourited;
          });
        }
        this.incrementPlayCount();
      }
    });
  }

  ngOnInit() {
    // Makes songId = the hash of the URL e.g #123 = 123
    this.route.fragment.subscribe(fragment => {
      if (fragment != null) {
        this.playCheck = false;
        const trackString = fragment.split('+');
        this.songId = trackString[0];
        const lyricsString =
        decodeURIComponent(trackString[1]) +
        ' ' +
        decodeURIComponent(trackString[2]);
        console.log('lyricsString:' + lyricsString);
        this._geniusService.searchLyrics(lyricsString);
        this.updateFavouriteSettings();
      } else {
        console.log('Song does not exist!');
      }
    });
  }
}
