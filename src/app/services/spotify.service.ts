// made this new file and copy-pasted your code over to here cause its 'service.ts'
import { Injectable } from '@angular/core';
// import { Http, Headers } from '@angular/Http';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
// Not needed anymore
// import 'rxjs/add/operator/map'; // this was also changed in rxjs 6
// import firebase firestore for angular
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Data {
  access_token: string;
}
@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private dataDoc: AngularFirestoreDocument<Data>;
  private data: Observable<Data>;
  private searchUrl: string;
  private access_token: string;
  constructor(private _http: HttpClient, private afs: AngularFirestore) {
    // reference to firestore collection
    this.dataDoc = this.afs.doc('SecretAccountData/' + 'SAD');
    this.data = this.dataDoc.valueChanges(); // Observable of Secret Data
    this.data.subscribe(
      e => {
        // stores access_token from firestore
        this.access_token = e.access_token;
      },
      err => {
        console.log('Error:' + err);
      }
    );
  }

  searchMusic(str: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.access_token
    );
    this.searchUrl =
      'https://api.spotify.com/v1/search?query=' +
      str +
      '&offset=0&limit=30&type=track';
    // because of this changes to map .json() doesn't exist anymore
    // return this._http.get(this.searchUrl).map(res => res.json());
    return this._http.get(this.searchUrl, { headers: headers });
  }
  getTrackObject(id) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.access_token
    );
    this.searchUrl = 'https://api.spotify.com/v1/tracks/' + id;
    // because of this changes to map .json() doesn't exist anymore
    // return this._http.get(this.searchUrl).map(res => res.json());
    return this._http.get(this.searchUrl, { headers: headers });
  }
}
