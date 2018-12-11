import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/Http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {
    private searchUrl: string;


    constructor(private _http: Http) {

    }

    searchMusic(str: string, type= 'track') {
        this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=30&type=' + type + '&market=UK';
        return this._http.get(this.searchUrl)
            .map(res => res.json());
    }
}
