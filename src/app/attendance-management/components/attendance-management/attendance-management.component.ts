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
  date = new FormControl('28-02-2021', [Validators.required]);
  options: string[] = ['HMI', 'CCL', 'DC', 'EM', 'NLP'];
  filteredOptions: Observable<string[]> | undefined;
  result: any;


  constructor(private attendanceManagementService: AttendanceManagementService) {
    this.attendanceManagementService.getAttendance().subscribe(result => {
      this.result = result;
      this.attendances = this.result[this.subject.value][this.date.value];
      console.log(this.attendances);

    });
  }

  ngOnInit() {
    this.filteredOptions = this.subject.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.subject.valueChanges.subscribe(value => {
      const sub = this.result[value];
      if (sub) {
      this.attendances = sub[this.date.value] || [];
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  onDateChange(strDate: string) {
    const date = new Date(strDate);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const dateResult = [day, month, date.getFullYear()].join('-');
    console.log(dateResult);

    const sub = this.result[this.subject.value];
    if (sub) {
      this.attendances = sub[dateResult] || [];
    }
  }
}
