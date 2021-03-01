import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {



  constructor(private store: AngularFireDatabase, private snackBar: MatSnackBar) { }

  getUsers = () => {
    return this.store.list<User>(`/users`).valueChanges();
  }

  addOrUpdate(user: User) {
    const userObject = {
      [user.userId]: user
    };

    this.store.object<any>(`/users`).update(userObject).then(() => {
      this.snackBar.open('User added!', 'Dismiss', {
        duration: 5000,
      });
    }, () => {
      console.log('Error occurred!');
    }).catch(() => {
      console.log('Error occurred!');
    });
  }

  delete(userId: string) {
    this.store.object<any>(`/users/${userId}`).remove().then(() => {
      this.snackBar.open('User Deleted!', 'Dismiss', {
        duration: 5000,
      });
    }, () => {
      console.log('Error occurred!');
    }).catch(() => {
      console.log('Error occurred!');
    });
  }
}
