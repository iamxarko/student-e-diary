import { CustomDateAdapter } from './../../services/date-adapter.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Attendance } from 'src/app/models/attendance.model';
import { AttendanceManagementService } from '../../services/attendance-management.service';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/login/service/login.service';
import * as moment from 'moment';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { SpinnerService } from 'src/app/login/service/spinner.service';

@Component({
  selector: 'app-attendance-management',
  templateUrl: './attendance-management.component.html',
  styleUrls: ['./attendance-management.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class AttendanceManagementComponent implements OnInit {

  attendances: Attendance[] = [];
  subject = new FormControl('HMI', [Validators.required]);
  student = new FormControl('', [Validators.required]);
  date = new FormControl(moment(new Date()), [Validators.required]);
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


  constructor(private attendanceManagementService: AttendanceManagementService, private loginService: LoginService,
              private spinnerService: SpinnerService) {
    this.user = this.loginService.getUser();
    this.spinnerService.showSpinner(true);
    this.attendanceManagementService.getAttendance().subscribe(result => {
      this.result = result;
      const dateValue = this.getFormattedDate(moment(this.date.value).toDate());
      this.attendances = this.result[this.subject.value][dateValue] || [];
      if (this.user.userType === 'Student') {
        this.attendances = this.attendances.filter(a => a.studentId === this.user.userId);
      }
      this.dataSource = new MatTableDataSource(this.attendances);
      this.spinnerService.showSpinner(false);
    });

    this.attendanceManagementService.getStudents().subscribe(students => {
      this.studentOptions = students;
    });
  }

  ngOnInit() {
    this.date.disable();
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
        const dateValue = this.getFormattedDate(moment(this.date.value).toDate());
        this.attendances = sub[dateValue] || [];
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
    const dateValue = this.getFormattedDate(moment(this.date.value).toDate());
    this.attendanceManagementService.markPresent(this.subject.value, dateValue, this.student.value, this.attendances);
  }

  onAbsent = () => {
    const dateValue = this.getFormattedDate(moment(this.date.value).toDate());
    this.attendanceManagementService.markAbsent(this.subject.value, dateValue, this.student.value, this.attendances);
  }

  // Table section
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCurrentDate = () => {
    this.getFormattedDate(new Date());
  }
  // -----
}
