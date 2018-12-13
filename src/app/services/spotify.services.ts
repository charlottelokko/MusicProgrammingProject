// import {Injectable} from '@angular/core';
// import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {RequestOptions} from '@angular/http';
// import {map} from 'rxjs/operators';

// export interface SpotifyObject {
//     tracks: object;
// }

// @Injectable({
//     providedIn: 'root'
// })

// export class SpotifyService {
//     private searchUrl: string;

//     client_id = '[897e1a100d934e0a8afcfccd94e42dcb]';
//     client_secret = '[ae5771e37e354f20be06d1417beb25d3]';

//     // tslint:disable-next-line:max-line-length
//     private access_token = 'BQDxwYRviWmIUPgCfngjG0TK1wKgzLvemtwLMUk45WUixEcnyE-xgKFAY5bHiYeDn2cn9R0-XJq2lBfnOkaiiz0scqOBb-TWBFfZ5LpIlPlU1dJRUsH1SCyOo5AnP9id0t5Yfa4qLPt9KjepC3ua2nDlgTib8FPP-CPL';
//     private tokenType: 'bearer';

//     constructor(private _http: HttpClient) {

//     }

//     login() {
//         const authorizationTokenUrl = '/api/token';
//         const header = new Headers();

//         header.append('Authorization', 'Basic  ' + btoa(this.client_id + ':' + this.client_secret));
//         header.append('Content-Type', 'application/x-www-form-urlencoded;');

//         const options = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;' }) };
//         const body = 'grant_type=client_credentials';

//         return this._http.post(authorizationTokenUrl, body, options)
//           .map(data => data.json())
//           .do(token => {
//             this.access_token = token.access_token;
//             this.tokenType = token.token_type;
//           }, error => console.log(error));
//       }

//     searchMusic(str: string, type= 'track') {
//         const options = this.getOptions();

//         return this._http.get('https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=30&type=' + type, options);

//         // this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=30&type=' + type;
//        // return this._http.get(this.searchUrl, {headers: headers});
//     }

//     private getOptions() {
//         console.log(this.access_token);
//         console.log(this.tokenType);

//         const header = new Headers();
//         header.append('Authorization', this.tokenType + ' ' + this.access_token);
//         const options = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;' }) };

//         return options;
//       }
// }
