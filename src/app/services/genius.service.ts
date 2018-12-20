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
import * as $ from 'jquery';
export interface Data {
  genius_access_token: string;
}
@Injectable({
  providedIn: 'root',
})
export class GeniusService {
  private dataDoc: AngularFirestoreDocument<Data>;
  private data: Observable<Data>;
  private searchUrl: string;
  private access_token: string;
  html: string;
  lyricHTML: string;
   constructor(private afs: AngularFirestore) {
  //   // reference to firestore collection
  //   this.dataDoc = this.afs.doc('SecretAccountData/' + 'SAD');
  //   this.data = this.dataDoc.valueChanges(); // Observable of Secret Data
  //   this.data.subscribe(
  //     e => {
  //       // stores access_token from firestore
  //       this.access_token = e.genius_access_token;
  //       console.log(this.access_token);
  //     },
  //     err => {
  //       console.log('Error:' + err);
  //     }
  //   );
  }

  searchLyrics(str: string) {
    // reference to firestore collection
    this.dataDoc = this.afs.doc('SecretAccountData/' + 'SAD');
    this.data = this.dataDoc.valueChanges(); // Observable of Secret Data
    this.data.subscribe(
      e => {
        // stores access_token from firestore
        this.access_token = e.genius_access_token;
       // console.log(this.access_token);
        this.searchUrl =
      'https://api.genius.com/search?access_token=' +
      this.access_token +
      '&q=' +
      encodeURIComponent(str);
    const reply = fetch(this.searchUrl).then(response => {
      return response.json();
    });
    return reply
      .then(
        async res => {
          await $.getJSON(
            'http://api.allorigins.ml/get?url=' +
              res.response.hits[0].result.url +
              '&callback=?',
            data => {
              this.html = data.contents;
            }
          ).done(async data => {
            // console.log(data.contents);
            this.lyricHTML = this.extractLyrics(data.contents);
            $('#lyrics').html(this.lyricHTML);
          });
        },
        err => {
          console.log('Error:' + err.toString());
        }
      )
      .catch(err => {
        console.log('Error: ' + err);
      });
      },
      err => {
        console.log('Error:' + err);
      }
    );
  }
  extractLyrics(html) {
    const startIndex = html.indexOf('<div initial-content-for="lyrics">');
    const endIndex =
      html.indexOf('</div>', html.indexOf('</div>', startIndex)) + 7;
    let lyric = html.substring(startIndex, endIndex);
    // removing extra stuff
    lyric = lyric.replace(/<a/g, '<p');
    lyric = lyric.replace(/<\/a>/g, '</p>');
    // console.log(lyric);
    return lyric;
  }
}
