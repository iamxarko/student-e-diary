import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Attendance } from 'src/app/models/attendance.model';
import { AttendanceManagementService } from '../../services/attendance-management.service';

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


  constructor(private attendanceManagementService: AttendanceManagementService) {
    this.attendanceManagementService.getAttendance().subscribe(result => {
      this.result = result;
      this.attendances = this.result[this.subject.value][this.date.value];
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
      map((userId) => (userId ? this.filterStudentOptions(userId) : this.studentOptions.slice()) )
    );
    this.subject.valueChanges.subscribe(value => {
      const sub = this.result[value];
      if (sub) {
      this.attendances = sub[this.date.value] || [];
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
    this.attendanceManagementService.markPresent(this.subject.value, this.date.value, this.student.value);
  }

  onAbsent = () => {
    this.attendanceManagementService.markAbsent(this.subject.value, this.date.value, this.student.value);
  }
}
