import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { Component } from '@angular/core';
// These imports don't exist anymore
// import { HTTP_PROVIDERS } from '@angular/common/http';
// import {Http} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [],
})
export class AppComponent {
  title = 'MusicProgrammingProject';

  constructor() {}
}
