import { EventEmitter, Injectable, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  @Output()
  fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  constructor(private route: Router, private snackBar: MatSnackBar, private store: AngularFireDatabase) { }

  logIn = (userId: string, password: string) => {
    this.store.object<any>(`/users/${userId}`).valueChanges().subscribe(val => {
      if (val && val.password === password) {
        localStorage.setItem('user', JSON.stringify(val));
        this.route.navigateByUrl('/');
        this.fireIsLoggedIn.emit(this.getUser());
      }
      else {
        this.snackBar.open('Invalid UserId or Password!', 'Dismiss', {
          duration: 5000,
        });
      }
    });
  }

  getEmmiter = () => {
    return this.fireIsLoggedIn;
  }

  logOut = () => {
    localStorage.removeItem('user');
    this.route.navigateByUrl('/login');
  }

  isLoggedIn = () => {
    const user = localStorage.getItem('user');
    return user ? true : false;
  }

  getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : user;
  }

  getMenus = (userType: string) => {
    return this.store.object<Menu[]>(`/menus/${userType}`).valueChanges();
  }
}
