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
  // tslint:disable-next-line:max-line-length
  private access_token = 'BQDxwYRviWmIUPgCfngjG0TK1wKgzLvemtwLMUk45WUixEcnyE-xgKFAY5bHiYeDn2cn9R0-XJq2lBfnOkaiiz0scqOBb-TWBFfZ5LpIlPlU1dJRUsH1SCyOo5AnP9id0t5Yfa4qLPt9KjepC3ua2nDlgTib8FPP-CPL';

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
      type;
    // because of this changes to map .json() doesn't exist anymore
    // return this._http.get(this.searchUrl).map(res => res.json());
    return this._http.get(this.searchUrl, { headers: headers });
  }
}
