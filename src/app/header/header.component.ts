import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService,
              public authService: AuthService) {
  }

  // method() {
  //   while (true) {
  //     Observable.interval(100).takeWhile(() => true).subscribe(() => this.onSaveData());
  //     Observable.interval(100).takeWhile(() => true).subscribe(() => this.onFetchData());
  //   }
  // }
  onSaveData() {
    this.dataStorageService.storePosts()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getPosts();
  }

  onLogout() {
    this.authService.logout();
  }
}
