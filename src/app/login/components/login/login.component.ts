import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userId = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  hide = true;

  constructor(private loginService: LoginService, private route: Router) { }

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()){
      this.route.navigateByUrl('/');
    }
  }
   getUserIdErrorMessage() {
    if (this.userId.hasError('required')) {
      return 'You must enter a user id';
    }
    return this.userId.hasError('userId') ? 'Not a valid id' : '';
  }
  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter password';
    }
    return this.password.hasError('userId') ? 'Not a valid password' : '';
  }

  login = () => {
    console.log('I am here');
    this.loginService.logIn(this.userId.value, this.password.value);
  }

}
