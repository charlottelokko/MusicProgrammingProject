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

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  user: User;
  userRef: Observable<any>;
  songID: string = window.location.hash;
  constructor(
    public auth: AuthService,
    private afs: AngularFirestore,
    private route: ActivatedRoute
  ) {
    
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
        if (this.songID === track.id) {
          console.log(track);
          track.favourites = true;
        }
      });
    });
  }
  ngOnInit() {
    // Makes songID = the hash of the URL e.g #123 = 123
    // this.route.fragment.subscribe(fragment => {
    //   this.songID = fragment;
    //   console.log('SongID: ' + this.songID);
    // });
  }
}
