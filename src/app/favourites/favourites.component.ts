import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
// import ldBar from '@loadingio/loading-bar';
import $ from 'jquery';
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
    // const track2: Track = {
    //   id: '2',
    //   title: 'Happier',
    //   artist: 'Marshmellow ft. Bastille',
    //   album_name: 'N/A',
    //   released: '2018',
    //   genre: 'Dance/Electronic',
    //   duration: 214,
    //   rating: 4,
    //   favourite: true,
    //   play_count: 1,
    //   image_url: 'https://dummyimage.com/300x300/000000/fff.jpg',
    // };
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
    this.favouriteTracks = [track1, track3];
    $(document).ready(() => {});
  }

  ngOnInit() {}
}
