import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/login/service/login.service';
import { SpinnerService } from 'src/app/login/service/spinner.service';
import { AssignmentManagementService } from '../../services/assignment-management.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnInit {

  displayedColumns: string[] = ['date', 'name'];
  dataSource = new MatTableDataSource<any>([]);
  userType: any;
  result: any;

  constructor(private router: Router, private route: ActivatedRoute, private assignmentService: AssignmentManagementService,
              private loginService: LoginService, private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.spinnerService.showSpinner(true);
      if (this.loginService.getUser().userType === 'Student') {
        this.assignmentService.getAssignmentsListForStudent(params.id, this.loginService.getUser().userId).subscribe(result => {
          this.result = result ? [result] : [];
          this.dataSource = new MatTableDataSource(this.result);
          this.spinnerService.showSpinner(false);
        });
      } else {
        this.assignmentService.getAssignmentsListForTeacher(params.id).subscribe(result => {
          this.result = result.reverse();
          this.dataSource = new MatTableDataSource(this.result);
          this.spinnerService.showSpinner(false);
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onView = (url: string) => {
    if (url.length > 0) {
      window.open(url);
    }
  }

  goBack = () => {
    this.router.navigateByUrl('assignment');
  }

}
