import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../shared/user.model';
import { UserListService } from './user-list.service';
import {Response} from '@angular/http';
import {DataStorageService} from '../shared/data-storage.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[];
  private subscription: Subscription;

  constructor(private userListService: UserListService,
              private dataStorageService: DataStorageService) {
    // Observable.interval(100).takeWhile(() => true).subscribe(() => this.onSaveData());
    // Observable.interval(100).takeWhile(() => true).subscribe(() => this.onFetchData());
  }

  ngOnInit() {
    this.users = this.userListService.getUsers();
    this.subscription = this.userListService.usersChanged
      .subscribe(
        (users: User[]) => {
          this.users = users;
        }
      );
  }

  onEditItem(index: number) {
    this.userListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeUsers()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getUsers();
  }
}
