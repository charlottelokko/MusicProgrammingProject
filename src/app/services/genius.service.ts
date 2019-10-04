// made this new file and copy-pasted your code over to here cause its 'service.ts'
import { Injectable } from '@angular/core';
// import { Http, Headers } from '@angular/Http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// Not needed anymore
// import 'rxjs/add/operator/map'; // this was also changed in rxjs 6
// import firebase firestore for angular
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import * as $ from 'jquery';
export interface Data {
  genius_access_token: string;
}
@Injectable({
  providedIn: 'root',
})
export class GeniusService {
  private sadDoc: AngularFirestoreDocument<Data>;
  private sad: Observable<Data>;
  private searchUrl: string;
  private access_token: string;
  html: string;
  lyricHTML: string;
  constructor(private afs: AngularFirestore) {}

  searchLyrics(title: string, artist: string) {
    title = title.replace(/ \(.*?\)/g, '');
    title = title.split(' -')[0];
    artist = artist.split(',')[0];
    const query = title + ' - ' + artist;
    console.log('Genius Lyrics Query: ' + query);
    // reference to firestore collection
    this.sadDoc = this.afs.doc('SecretAccountData/' + 'SAD');
    this.sad = this.sadDoc.valueChanges(); // Observable of Secret Data
    const sad$: Subscription = this.sad.subscribe(
      e => {
        // stores access_token from firestore
        this.access_token = e.genius_access_token;
        // console.log(this.access_token);
        this.searchUrl =
          'https://api.genius.com/search?access_token=' + this.access_token + '&q=' + encodeURIComponent(query);
        const reply = fetch(this.searchUrl).then(response => {
          return response.json();
        });
        return reply
          .then(
            async res => {
              await $.getJSON(
                'https://api.allorigins.win/get?url=' + res.response.hits[0].result.url + '&callback=?',
                data => {
                  this.html = data.contents;
                }
              ).done(async data => {
                // console.log(data.contents);
                this.lyricHTML = this.extractLyrics(data.contents);
                $('#lyrics').html(this.lyricHTML);
                sad$.unsubscribe();
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
    const endIndex = html.indexOf('</div>', html.indexOf('</div>', startIndex)) + 7;
    let lyric = html.substring(startIndex, endIndex);
    // removing extra stuff
    lyric = lyric.replace(/<a/g, '<p');
    lyric = lyric.replace(/<\/a>/g, '</p>');
    // console.log(lyric);
    return lyric;
  }
}
