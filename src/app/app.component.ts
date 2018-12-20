
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Route,
  Router,
  RouterState
} from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent {
  title = 'MusicProgrammingProject';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(
          router.routerState,
          router.routerState.root
        ).join('-');
        console.log('title', title);
        this.title = title;
        titleService.setTitle(title + ' | Purpose Movement');
      }
    });
  }
  // collect the title data properties from all child routes
  // there might be a better way but this worked for me
  getTitle(state: RouterState, parent: ActivatedRoute) {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, parent.firstChild));
    }

    return data;
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
