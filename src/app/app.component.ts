import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-ngrx';

  constructor(private localDataService: LocalStorageService) { }

  ngOnInit() {
    const data = this.localDataService.getUserData();
    if (!data) {
      this.localDataService.setUserData([]);
    }
  }
}
