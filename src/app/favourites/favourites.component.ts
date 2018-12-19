import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { SpotifyService } from '../services/spotify.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { PlayedTrack } from '../core/user-type';
import * as $ from 'jquery';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  favouriteTracks: Array<PlayedTrack>;
  recommendations: Array<any>;
  user = this.auth.user;
  searchStr: string;

  constructor(
    private afs: AngularFirestore,
    private _spotifyService: SpotifyService,
    public auth: AuthService
  ) {
    const track1: PlayedTrack = {
      id: '1',
      title: 'Rock With You',
      artist: ['Michael Jackson'],
      album_name: 'Off The Wall',
      released: '1979',
      duration: 220 * 1000,
      favourites: {
        rating: 5,
        favourited: true,
        play_count: 1,
      },
      image_url: ['https://dummyimage.com/300x300/000000/fff.jpg'],
    };
    const track2: PlayedTrack = {
      id: '2',
      title: 'Happier',
      artist: ['Marshmellow', 'Bastille'],
      album_name: 'N/A',
      released: '2018',
      duration: 214 * 1000,
      favourites: {
        rating: 4,
        favourited: true,
        play_count: 1,
      },
      image_url: ['https://dummyimage.com/300x300/000000/fff.jpg'],
    };
    const track3: PlayedTrack = {
      id: '3',
      title: 'Mrs. Robinson',
      artist: ['Simon & Garfunkel'],
      album_name: 'The Graduate',
      released: '1968',
      duration: 242 * 1000,
      favourites: {
        rating: 4,
        favourited: true,
        play_count: 1,
      },
      image_url: ['https://dummyimage.com/300x300/000000/fff.jpg'],
    };
    this.favouriteTracks = [track1, track2, track3];
    _spotifyService
      .searchRecomendations(
        this.favouriteTracks.map(track => track.id).toString()
      )
      .subscribe(recommendations => {
        this.recommendations = (recommendations as any).tracks;
        console.log(
          'Recommendations: ' +
            this.recommendations.map(track =>
              JSON.stringify((track as any).artists)
            )
        );
      });
    $('.track-info, .user-info').ready(() => {
      $('.track-info, .user-info').hide();
    });
    $(document).ready(() => {
      $('.rating mat-icon').hover(
        e => {
          console.log('hovered: ' + $(e.currentTarget).attr('id'));
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
      $('.rating mat-icon').click(e => {
        console.log('rated: ' + $(e.currentTarget).attr('id'));
        // reset the ratings of the stars
        $(e.currentTarget)
          .siblings('mat-icon')
          .removeClass('rated');
        $(e.currentTarget)
          .siblings('mat-icon')
          .html('star_border');

        // display the correct star rating
        $(e.currentTarget).addClass('rated');
        $(e.currentTarget)
          .prevUntil('b')
          .addClass('rated');
        $(e.currentTarget).html('star');
        $(e.currentTarget)
          .prevUntil('b')
          .html('star');
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
    const index = this.favouriteTracks.findIndex(obj => obj.id === track_id);
    this.favouriteTracks[index].favourites.rating = rating;
    return rating;
  }
  setRating(id) {
    const track_id = id;
    const index = this.favouriteTracks.findIndex(obj => obj.id === track_id);
    return this.favouriteTracks[index].favourites.rating;
  }
  setFavourited(id) {
    const track_id = id;
    const index = this.favouriteTracks.findIndex(obj => obj.id === track_id);
    const favourited = this.favouriteTracks[index].favourites.favourited;
    this.favouriteTracks[index].favourites.favourited = favourited
      ? false
      : true;
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
  playTrack(id) {
    window.location.href = 'main#' + id;
  }
  millisToMinutesAndSeconds(millis) {
    const seconds = Math.floor((millis / 1000) % 60);
    const minutes = Math.floor(millis / 60000);
    return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
  }
  ngOnInit() {}
}
