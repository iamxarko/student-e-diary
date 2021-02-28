import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userId = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  hide = true;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
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
