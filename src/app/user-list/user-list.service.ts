import { User } from '../shared/user.model';
import { Subject } from 'rxjs/Subject';

export class UserListService {
  usersChanged = new Subject<User[]>();
  startedEditing = new Subject<number>();

  private users: User[] = [
    new User('asd'),
    new User('aaa')
  ];

  getUsers() {
    return this.users;
  }

  getUser(index: number) {
    return this.users[index];
  }

  deleteUser(index: number) {
      this.users.splice(index, 1);
      this.usersChanged.next(this.users.slice());
  }

}
