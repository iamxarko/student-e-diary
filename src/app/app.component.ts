import { Component } from '@angular/core';
import { LoginService } from 'src/app/login/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userId;
  constructor(private loginService: LoginService,private route: Router) {
    this.userId= loginService.getUser().userId;
   }
   
   isLoggedIn = () => {
     return this.loginService.isLoggedIn();
   }
  logOut=() => {
    this.loginService.logOut();
  }
  home =() =>{
    this.route.navigateByUrl('/');
  }
}
