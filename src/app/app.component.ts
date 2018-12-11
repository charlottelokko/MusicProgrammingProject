import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/common/http';
import {Http} from '@angular/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HTTP_PROVIDERS]
})
export class AppComponent {
  title = 'MusicProgrammingProject';

  constructor(private http: Http) {
  }
}
