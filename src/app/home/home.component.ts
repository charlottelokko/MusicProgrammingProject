import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { SpotifyService } from '../services/spotify.service';
import { User, Favourites, PlayedTrack } from '../core/user-type';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import * as $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _spotifyService: SpotifyService) {
    $(document).ready(() => {
      this._spotifyService.displayPlaylist().subscribe(
      res => {
        console.log('boop');
        console.log((res as any).tracks.items);
      });
    });
   }

  ngOnInit() {
  }

  homeView() {

  }

}
