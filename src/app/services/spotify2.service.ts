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


const apiPrefix = 'https://accounts.spotify.com/api/token';
const clientId = '897e1a100d934e0a8afcfccd94e42dcb';
const clientSecret = 'ae5771e37e354f20be06d1417beb25d3';
const credentials = btoa(clientId + ':' + clientSecret);

let access_token = '';
export default async(code, redirectURL) => {
    console.log('Credentials' + credentials);
    const res = await fetch(apiPrefix, {
        method: 'POST',
        headers: {
            Authorization: 'Basic ' + credentials,
            'Content-Type': 'application/x-www-form-unlencoded',
        },
        body: 'grant_type=authorization_code&' +
        'code=' + code +
        '&redirect_uri=' + redirectURL,
    });
    const json = await res.json();
    const token = json.access_token;
    access_token = token;

    return token;
};

export async function basicToken () {
    console.log('Credentials' + credentials);
    const res = await fetch(apiPrefix, {
      method: 'POST',
      headers: {
         Authorization: 'Basic ' + credentials,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials&'
    });
    const json = await res.json();
    const token = json.access_token;
    access_token = token;
    return token;
  }

  @Injectable({
    providedIn: 'root',
  })
export class SpotifyService {

    private searchUrl: string;
    constructor(private _http: HttpClient) {}

  searchSpotify(str: string, type = 'track') {
      console.log('This is it: ' + access_token);
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + access_token
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
