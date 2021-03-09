import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login/service/login.service';
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

  constructor(private route: ActivatedRoute, private assignmentService: AssignmentManagementService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params.id);
      if (this.loginService.getUser().userType === 'Student'){
        this.assignmentService.getAssignmentsListForStudent(params.id, this.loginService.getUser().userId).subscribe(result => {
          this.result = [result];
          this.dataSource = new MatTableDataSource(this.result);
        });
      }else{
      this.assignmentService.getAssignmentsListForTeacher(params.id).subscribe(result => {
        this.result = result.reverse();
        this.dataSource = new MatTableDataSource(this.result);
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

}
