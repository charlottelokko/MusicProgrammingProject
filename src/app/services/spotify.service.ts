// made this new file and copy-pasted your code over to here cause its 'service.ts'
import { Injectable } from '@angular/core';
// import { Http, Headers } from '@angular/Http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Not needed anymore
// import 'rxjs/add/operator/map'; // this was also changed in rxjs 6

export interface SpotifyObject {
  // Properties
  tracks: object;
}
@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private searchUrl: string;
  private access_token = 'insert spotify access token here';

  constructor(private _http: HttpClient) {}

  searchMusic(str: string, type = 'track') {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.access_token
    );
    this.searchUrl =
      'https://api.spotify.com/v1/search?query=' +
      str +
      '&offset=0&limit=30&type=' +
      type +
      '&market=UK';
    // because of this changes to map .json() doesn't exist anymore
    // return this._http.get(this.searchUrl).map(res => res.json());
    return this._http.get(this.searchUrl, { headers: headers });
  }
}
