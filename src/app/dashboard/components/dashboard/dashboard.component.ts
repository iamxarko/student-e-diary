import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { LoginService } from 'src/app/login/service/login.service';
import { Menu } from 'src/app/models/menu.model';
import { SpinnerService } from 'src/app/login/service/spinner.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */

  columns = 4;

  menus: Menu[] = [];

  constructor(private breakpointObserver: BreakpointObserver, private loginService: LoginService,
              private spinnerService: SpinnerService) {
    this.spinnerService.showSpinner(true);
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
        this.columns = 2;
      } else {
        this.columns = 4;
      }
    });
    const user = this.loginService.getUser();
    this.loginService.getMenus(user.userType).subscribe(menus => {
      if (menus) {
        this.menus = menus;
      }
      this.spinnerService.showSpinner(false);
    });
  }

  getUrl = (url: string) => {
    if (!url.includes('-')) {
      return url;
    }
    return url.replace('-', '/');
  }
}
