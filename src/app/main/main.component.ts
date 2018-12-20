import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { User, Favourites, PlayedTrack } from '../core/user-type';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  userData: any;
  songId: string = window.location.hash;
  url: string;

  // tslint:disable-next-line:max-line-length
  constructor(
    public auth: AuthService,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private _spotifyService: SpotifyService,
    public sanitizer: DomSanitizer
  ) {
    // auth.user.subscribe(_user => {
    //   let trackExists = false;
    //   console.log('User: ' + JSON.stringify(_user));
    //   this.userData = _user;
    //   console.log(this.userData.playedTracks);
    //   if (this.userData.playedTracks) {
    //     this.userData.playedTracks.map(playedTrack => {
    //       if (playedTrack.id === this.songId) {
    //         trackExists = true;
    //       }
    //     });
    //   }
    //   if (!trackExists) {
    //     const trackData: any = _spotifyService.getTrackObject(this.songId);
    //     const data = {
    //       id: this.songId,
    //       title: trackData.name,
    //       artists: trackData.artists.map(artist => artist.name),
    //       album_name: trackData.album.name,
    //       released: trackData.album.release_date,
    //       duration: trackData.duration_ms,
    //       favourites: {
    //         rating: 0,
    //         favourited: false,
    //         play_count: 1,
    //       },
    //       image_url: trackData.images.map(image => image.url),
    //     };
    //     this.userData.playedTracks.set(this.userData.playedTracks, {
    //       merge: true,
    //     });
    //   }
    // });
 _spotifyService.getTrackObject(this.songId).subscribe(res => {
      console.log((res as any).tracks.items);
      console.log('test' + JSON.stringify(res));
      const name = (res as any).tracks.items[0].name;
      console.log(name);
      let artists;
      const artistsAmount = (res as any).tracks.items.artists.length;

      for (let j = 0; j < artistsAmount; j++) {
        console.log((res as any).tracks.items.artists[j].name);
        if (j > 0) {
          artists += (res as any).tracks.items.artists[j].name + ', ';
        }
        // tslint:disable-next-line:one-line
        else {
          artists = (res as any).tracks.items.artists[j].name;
        }
      }

      // const source = 'https://open.spotify.com/embed/track/';
      // const element = document.getElementById('please');
      // const iframe = document.createElement('src');
      // iframe.append(source + this.songId);



    });
    // this.url = this.sanitizer.bypassSecurityTrustUrl('https://open.spotify.com/embed/track/' + this.songId);
    // console.log(this.url);
    $(document).ready(() => {
    });
  }

  toggleFavourited() {
    this.userData.playedTracks.map(playedTrack => {
      if (playedTrack.id === this.songId) {
        playedTrack.favourites.favourited = !playedTrack.favourites.favourited;
      }
    });
  }
  ngOnInit() {
    // Makes songId = the hash of the URL e.g #123 = 123
    this.route.fragment.subscribe(fragment => {
      this.songId = fragment;
      console.log('SongID: ' + this.songId);
    });
  }
}
