import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Attendance } from 'src/app/models/attendance.model';
import { AttendanceManagementService } from '../../services/attendance-management.service';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/login/service/login.service';

@Component({
  selector: 'app-attendance-management',
  templateUrl: './attendance-management.component.html',
  styleUrls: ['./attendance-management.component.scss']
})
export class AttendanceManagementComponent implements OnInit {

  attendances: Attendance[] = [];
  subject = new FormControl('HMI', [Validators.required]);
  student = new FormControl('', [Validators.required]);
  date = new FormControl(null, [Validators.required]);
  options: string[] = ['HMI', 'CCL', 'DC', 'EM', 'NLP'];
  filteredOptions: Observable<string[]> | undefined;
  studentOptions: any[] = [];
  filteredStudentOptions: Observable<any[]> | undefined;
  result: any;
  user;

  // Table section

  displayedColumns: string[] = ['studentId', 'name', 'attendance'];
  dataSource = new MatTableDataSource<Attendance>([]);

  // =======


  constructor(private attendanceManagementService: AttendanceManagementService, private loginService: LoginService) {
    this.user = this.loginService.getUser();
    this.attendanceManagementService.getAttendance().subscribe(result => {
      this.result = result;
      this.attendances = this.result[this.subject.value][this.date.value];
      if (this.user.userType === 'Student') {
        this.attendances = this.attendances.filter(a => a.studentId === this.user.userId);
      }
      this.dataSource = new MatTableDataSource(this.attendances);
    });

    this.attendanceManagementService.getStudents().subscribe(students => {
      this.studentOptions = students;
    });
  }

  ngOnInit() {
    this.date.setValue(this.getFormattedDate(new Date()));
    this.filteredOptions = this.subject.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOptions(value))
    );
    this.filteredStudentOptions = this.student.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string') ? value : value.userId),
      map((userId) => (userId ? this.filterStudentOptions(userId) : this.studentOptions.slice()))
    );
    this.subject.valueChanges.subscribe(value => {
      const sub = this.result[value];
      if (sub) {
        this.attendances = sub[this.date.value] || [];
        if (this.user.userType === 'Student') {
          this.attendances = this.attendances.filter(a => a.studentId === this.user.userId);
        }
        this.dataSource = new MatTableDataSource(this.attendances);
      }
    });
  }

  private filterOptions(value: string): string[] {
    const filterValue = value ? value.toLowerCase() : '';
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private filterStudentOptions(value: any): any[] {
    const filterValue = value ? value?.toLowerCase() : '';
    return this.studentOptions.filter(option => {
      return option.userId.toLowerCase().startsWith(filterValue);
    });
  }

  onDateChange(strDate: string) {
    const date = new Date(strDate);
    const sub = this.result[this.subject.value];
    const dateResult = this.getFormattedDate(date);
    this.date.setValue(dateResult);
    if (sub) {
      this.attendances = sub[dateResult] || [];
      if (this.user.userType === 'Student') {
        this.attendances = this.attendances.filter(a => a.studentId === this.user.userId);
      }
      this.dataSource = new MatTableDataSource(this.attendances);
    }
  }

  getFormattedDate = (date: Date) => {
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return [day, month, date.getFullYear()].join('-');
  }

  displayFn(user: any): string {
    return user && user.userId && user.name ? `${user.userId}-${user.name}` : '';
  }

  onPresent = () => {
    this.attendanceManagementService.markPresent(this.subject.value, this.date.value, this.student.value, this.attendances);
  }

  onAbsent = () => {
    this.attendanceManagementService.markAbsent(this.subject.value, this.date.value, this.student.value, this.attendances);
  }

  // Table section
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // -----
}
