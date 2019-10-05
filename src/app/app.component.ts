import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [],
})
export class AppComponent {
  title = 'MusicProgrammingProject';
  constructor() {
    $('#alertModal').modal();
    console.log('toasted');
  }
}
