import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { SpotifyService } from '../services/spotify.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import firebase from 'firebase/app';
import { User, PlayedTrack } from '../core/user-type';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  favouriteTracks: Array<PlayedTrack> = [];
  recommendations: Array<any>;
  searchStr: string;
  userData: User;
  constructor(
    private afs: AngularFirestore,
    private _spotifyService: SpotifyService,
    public auth: AuthService
  ) {
    this.loadFavouriteTracks();
    // reference to firestore collection
    const dataDoc = this.afs.doc('SecretAccountData/' + 'SAD');
    const data = dataDoc.valueChanges(); // Observable of Secret Data
    data.subscribe(
      _e => {},
      err => {
        console.log('Error:' + err);
      }
    );
  }
  loadFavouriteTracks() {
    this.auth.user.subscribe(_user => {
      // If the user is logged in
      if (_user !== null) {
        // stores the users data
        this.userData = _user;
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(
          `users/${this.userData.uid}`
        );
        this.favouriteTracks = this.userData.playedTracks.filter(track => {
          return track.favourites.favourited;
        });
        this._spotifyService
          .searchRecomendations(this.favouriteTracks)
          .subscribe(recommendations => {
            this.recommendations = (recommendations as any).tracks;
            // console.log(
            //   'Recommendations: ' +
            //     this.recommendations.map(track =>
            //       JSON.stringify((track as any).artists)
            //     )
            // );
          });
      }
      $('.track-info, .user-info').ready(() => {
        $('.track-info, .user-info').hide();
      });
      $(document).ready(() => {
        ($('[data-toggle="tooltip"]') as any).tooltip();
        $('.rating mat-icon').hover(
          e => {
            // console.log('hovered: ' + $(e.currentTarget).attr('id'));
            $(e.currentTarget).addClass('hover');
            $(e.currentTarget)
              .prevUntil('b')
              .addClass('hover');
          },
          e => {
            $(e.currentTarget).removeClass('hover');
            $(e.currentTarget)
              .prevUntil('b')
              .removeClass('hover');
          }
        );
      });
    });
  }
  updateRating(e: { currentTarget: any }) {
    const ratingEl = $(e.currentTarget)
      .attr('id')
      .split('-');
    const track_id = ratingEl[2];
    const rating = parseInt(ratingEl[1], 10);
    console.log(ratingEl.toString());
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${this.userData.uid}`
    );
    this.userData.playedTracks.forEach((playedTrack, i) => {
      if (playedTrack.id === track_id) {
        this.userData.playedTracks[i].favourites.rating = rating;
      }
    });
    userRef
      .update({
        playedTracks: this.userData.playedTracks,
      })
      .then(() => {
        this.switchToUserInfo(track_id);
      });
  }
  setRating(id) {
    const index = this.favouriteTracks.findIndex(obj => obj.id === id);
    return this.favouriteTracks[index].favourites.rating;
  }
  setFavourited(id) {
    const index = this.favouriteTracks.findIndex(obj => obj.id === id);
    const favourited = this.favouriteTracks[index].favourites.favourited;
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${this.userData.uid}`
    );
    // removes the current favourited value of the specified track
    userRef.update({
      playedTracks: firebase.firestore.FieldValue.arrayRemove(
        this.favouriteTracks[index]
      ),
    });
    this.favouriteTracks[index].favourites.favourited = favourited
      ? false
      : true;
    // replaces the favourited value of this track with the new one
    userRef.update({
      playedTracks: firebase.firestore.FieldValue.arrayUnion(
        this.favouriteTracks[index]
      ),
    });
  }

  artists2String(artists) {
    let result = '';
    artists.forEach((artist, i) => {
      if (i === 0) {
        result += artist.name;
      } else {
        result += ', ' + artist.name;
      }
    });
    return result;
  }
  switchToAlbumCover(id) {
    $('#' + id + '.track-info, #' + id + '.user-info').hide();
    $('#' + id + '.album-cover').show();
  }
  switchToUserInfo(id) {
    $('#' + id + '.track-info, #' + id + '.album-cover').hide();
    $('#' + id + '.user-info').show();
  }
  switchToTrackInfo(id) {
    $('#' + id + '.user-info, #' + id + '.album-cover').hide();
    $('#' + id + '.track-info').show();
  }
  playTrack(id, name, artists) {
    window.location.href =
      'main#' +
      id +
      '+' +
      encodeURIComponent(name) +
      '+' +
      encodeURIComponent(artists);
  }
  millisToMinutesAndSeconds(millis) {
    const seconds = Math.floor((millis / 1000) % 60);
    const minutes = Math.floor(millis / 60000);
    return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
  }
  strReplace(str) {
    return str.replace(/,/g, ', ');
  }
  ngOnInit() {}
}
