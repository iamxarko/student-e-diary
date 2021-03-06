import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/service/login.service';
import { ActivatedRoute, NavigationEnd, Router, PRIMARY_OUTLET } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { SpinnerService } from './login/service/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userId = '';
  title = '';
  show = false;
  constructor(private loginService: LoginService, private router: Router, private activatedRoute: ActivatedRoute,
              private spinnerService: SpinnerService) {
    this.loginService.getEmmiter().subscribe(user => this.userId = user.userId);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter((route) => route.outlet === PRIMARY_OUTLET))
      .subscribe((route) => {
        const data = route.snapshot.data;
        console.log(data);
        this.title = data.title;
      });
  }

  ngOnInit(): void {
    this.userId = this.loginService.getUser()?.userId;
    this.spinnerService.getSpinnerEvent().subscribe(value => {
      setTimeout(() => {
        this.show = value;
      });
    });
  }

  isLoggedIn = () => {
    return this.loginService.isLoggedIn();
  }
  logOut = () => {
    this.loginService.logOut();
  }
  home = () => {
    this.router.navigateByUrl('/');
  }
}
