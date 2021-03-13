import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from 'src/app/login/service/spinner.service';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {



  constructor(private store: AngularFireDatabase, private snackBar: MatSnackBar, private spinnerService: SpinnerService) { }

  getUsers = () => {
    return this.store.list<User>(`/users`).valueChanges();
  }

  addOrUpdate(user: User) {
    this.spinnerService.showSpinner(true);
    const userObject = {
      [user.userId]: user
    };

    this.store.object<any>(`/users`).update(userObject).then(() => {
      this.snackBar.open('User added!', 'Dismiss', {
        duration: 5000,
      });
      this.spinnerService.showSpinner(false);
    }, () => {
      this.spinnerService.showSpinner(false);
      console.log('Error occurred!');
    }).catch(() => {
      this.spinnerService.showSpinner(false);
      console.log('Error occurred!');
    });
  }

  delete(userId: string) {
    this.spinnerService.showSpinner(true);
    this.store.object<any>(`/users/${userId}`).remove().then(() => {
      this.snackBar.open('User Deleted!', 'Dismiss', {
        duration: 5000,
      });
      this.spinnerService.showSpinner(false);
    }, () => {
      console.log('Error occurred!');
      this.spinnerService.showSpinner(false);
    }).catch(() => {
      console.log('Error occurred!');
      this.spinnerService.showSpinner(false);
    });
  }
}
