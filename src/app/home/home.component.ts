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
  albumsobj: Array<any>;
  constructor(private _spotifyService: SpotifyService) {

      $(document).ready(() => {
        
           const displayPlay= this._spotifyService.displayPlaylist().subscribe(
                      res => {
                    this.albumsobj = (res as any).tracks.items;
                    console.log(this.albumsobj);

                   });

        

       
    });
   }

  ngOnInit() {
  }

  homeView() {
    console.log('hello');
  }

}
