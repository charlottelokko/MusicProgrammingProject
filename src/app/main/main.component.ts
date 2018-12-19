import { SpotifyService } from './../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { User, Favourites, PlayedTrack } from '../core/user-type';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  user: User;
  userRef: Observable<any>;
  songId: string = window.location.hash;

  // tslint:disable-next-line:max-line-length
  constructor(public auth: AuthService, private afs: AngularFirestore, private route: ActivatedRoute, private _spotifyService: SpotifyService) {
    _spotifyService.getTrackObject(this.songId).subscribe(
      res => {
        let name = (res as any).tracks.items.name;
        let artists;
        const artistsAmount = (res as any).tracks.items.artists.length;

        for (let j = 0; j < artistsAmount; j++) {
          console.log((res as any).tracks.items.artists[j].name);
          if (j > 0) {
          artists += ((res as any).tracks.items.artists[j].name + ', ');
          }
          // tslint:disable-next-line:one-line
          else {
            artists = (res as any).tracks.items.artists[j].name;
          }
        }

        console.log('main' + name);
        console.log('main' + artists);



      });
    $(document).ready(() => {
      this.auth.user.subscribe(_user => {
        console.log(_user);
       // this.userRef = this.afs.doc(`users/${_user.uid}`).valueChanges();
        this.user = _user;
      });
    });
  }
  toggleFavourited() {
    this.userRef.subscribe(trackArray => {
      trackArray.forEach(track => {
        if (this.songId === track.id) {
          console.log(track);
          track.favourites = true;
        }
      });
    });
  }
  ngOnInit() {
    //Makes songId = the hash of the URL e.g #123 = 123
    this.route.fragment.subscribe(fragment => {
      this.songId = fragment;
      console.log('songId: ' + this.songId);
    });
  }
}
