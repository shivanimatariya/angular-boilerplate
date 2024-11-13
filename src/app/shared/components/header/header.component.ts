import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map, filter, mergeMap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  visible: boolean;
  currentUser: User;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private localDataService: LocalStorageService) {
    this.visible = true;
  }

  ngOnInit() {
    this.currentUser = this.localDataService.getCurrentUserData();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
      )
      .pipe(
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data),
      )
      .subscribe(event => {
        this.showToolbar(event.navVisible); // show the toolbar?
      });
  }

  showToolbar(event) {
    if (event === false) {
      this.visible = false;
    } else if (event === true) {
      this.visible = true;
    } else {
      this.visible = this.visible;
    }
    this.currentUser = this.localDataService.getCurrentUserData();
  }

  LogOut() {
    this.localDataService.removeCurrentUser();
    this.router.navigate(['/auth/login']);
  }
}
