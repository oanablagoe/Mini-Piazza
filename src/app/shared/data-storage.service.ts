import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { PostService } from '../posts/post.service';
import { Post } from '../posts/post.model';
import { AuthService } from '../auth/auth.service';
import {User} from './user.model';
import {UserListService} from '../user-list/user-list.service';

@Injectable()
export class DataStorageService {
  constructor(private http: Http,
              private postService: PostService,
              private userService: UserListService,
              private authService: AuthService) {
  }

  storePosts() {
    const token = this.authService.getToken();

    return this.http.put('https://mini-piazza.firebaseio.com/posts.json?auth=' + token, this.postService.getPosts());
  }

  getPosts() {
    const token = this.authService.getToken();

    this.http.get('https://mini-piazza.firebaseio.com/posts.json?auth=' + token)
      .map(
        (response: Response) => {
          const posts: Post[] = response.json();
          return posts.reverse();
        }
      )
      .subscribe(
        (posts: Post[]) => {
          this.postService.setPosts(posts);
        }
      );
  }

  // getAdmins() {
  //   const token = this.authService.getToken();
  //
  //   this.http.get('https://mini-piazza.firebaseio.com/users.json?auth=' + token)
  //     .map(
  //       (response: Response) => {
  //         const users: User[] = response.json();
  //         const admins: User[] = [];
  //
  //         for (const user of users) {
  //           if (user['admin']) {
  //             if (this.authService.isAdmin()) {
  //               admins.push(user);
  //             }
  //           }
  //         }
  //         return admins;
  //       }
  //     );
  // }

  getUsers() {
    const token = this.authService.getToken();

    this.http.get('https://mini-piazza.firebaseio.com/users.json?auth=' + token)
      .map(
        (response: Response) => {
          const users: User[] = response.json();
          return users;
        }
      );
  }

  storeUsers() {
    const token = this.authService.getToken();

    return this.http.put('https://mini-piazza.firebaseio.com/users.json?auth=' + token, this.userService.getUsers());
  }
}
