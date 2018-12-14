import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';

import * as $ from 'jquery';
interface Track {
  id: string;
  title: string;
  artist: string;
  album_name: string;
  released: string;
  genre: string;
  duration: number;
  rating: number;
  favourite: boolean;
  play_count: number;
  image_url: string;
}
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  favouriteTracks: Array<Track>;
  constructor(private afs: AngularFirestore) {
    const track1: Track = {
      id: '1',
      title: 'Rock With You',
      artist: 'Michael Jackson',
      album_name: 'Off The Wall',
      released: '1979',
      genre: 'Pop',
      duration: 220,
      rating: 5,
      favourite: true,
      play_count: 1,
      image_url: 'https://dummyimage.com/300x300/000000/fff.jpg',
    };
    const track2: Track = {
      id: '2',
      title: 'Happier',
      artist: 'Marshmellow ft. Bastille',
      album_name: 'N/A',
      released: '2018',
      genre: 'Dance/Electronic',
      duration: 214,
      rating: 4,
      favourite: true,
      play_count: 1,
      image_url: 'https://dummyimage.com/300x300/000000/fff.jpg',
    };
    const track3: Track = {
      id: '3',
      title: 'Mrs. Robinson',
      artist: 'Simon & Garfunkel',
      album_name: 'The Graduate',
      released: '1968',
      genre: 'Folk Rock',
      duration: 242,
      rating: 4,
      favourite: true,
      play_count: 1,
      image_url: 'https://dummyimage.com/300x300/000000/fff.jpg',
    };
    this.favouriteTracks = [track1, track2, track3];

    $(document).ready(() => {
      $('mat-icon').hover(
        e => {
          console.log('hovered: ' + $(e.currentTarget).attr('id'));
          $(e.currentTarget).addClass('hover');
          $(e.currentTarget)
            .prevAll()
            .addClass('hover');
        },
        e => {
          $(e.currentTarget).removeClass('hover');
          $(e.currentTarget)
            .prevAll()
            .removeClass('hover');
        }
      );
      $('.rating-stars mat-icon').click(e => {
        console.log('rated: ' + $(e.currentTarget).attr('id'));
        // reset the ratings of the stars
        $(e.currentTarget)
          .siblings()
          .removeClass('rated');
        $(e.currentTarget)
          .siblings()
          .html('star_border');

        // display the correct star rating
        $(e.currentTarget).addClass('rated');
        $(e.currentTarget)
          .prevAll()
          .addClass('rated');
        $(e.currentTarget).html('star');
        $(e.currentTarget)
          .prevAll()
          .html('star');
      });
    });
  }
  updateRating(e: { currentTarget: any }) {
    const ratingEl = $(e.currentTarget)
      .attr('id')
      .split('-');
    const track_id = ratingEl[1];
    const rating = parseInt(ratingEl[3], 10);
    console.log(ratingEl.toString());
    const index = this.favouriteTracks.findIndex(obj => obj.id === track_id);
    this.favouriteTracks[index].rating = rating;
    return rating;
  }
  setRating(id) {
    const track_id = id;
    const index = this.favouriteTracks.findIndex(obj => obj.id === track_id);
    return this.favouriteTracks[index].rating;
  }
  ngOnInit() {}
}
