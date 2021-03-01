import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/login/service/login.service';
import { Attendance } from 'src/app/models/attendance.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceManagementService {

  constructor(private store: AngularFireDatabase, private snackBar: MatSnackBar, private loginService: LoginService) { }

  getAttendance = () => {
    return this.store.object<any>(`/attendance`).valueChanges();
  }

  getStudents = () => {
    return this.store.list(`/users`, ref => ref.orderByChild('userType').equalTo('student')).valueChanges();
  }

  markAbsent(subject: any, date: any, student: any, attendances: Attendance[]) {
    this.markAttendance(subject, date, student, 'A', attendances);
  }
  markPresent(subject: any, date: any, student: any, attendances: Attendance[]) {
    this.markAttendance(subject, date, student, 'P', attendances);
  }

  markAttendance = (subject: any, date: any, student: any, pOrA: string, attendances: Attendance[]) => {
    console.log(attendances);
    const attendance = { attendance: pOrA, name: student.name, studentId: student.userId };
    let newAttendances = [...attendances];
    const index = newAttendances.findIndex(a => a.studentId === student.userId);
    console.log(index);
    if (index >= 0 ) {
      newAttendances[index] = attendance;
    } else {
      newAttendances = [...newAttendances, attendance];
    }
    console.log(newAttendances);
    this.store.object<any>(`/attendance/${subject}/${date}`).set(newAttendances).then(() => {
      this.snackBar.open('Attendance added!', 'Dismiss', {
        duration: 5000,
      });
    }, () => {
      console.log('Error occurred!');
    }).catch(() => {
      console.log('Error occurred!');
    });
  }

  viewAttendance = (subject: string, date: string) => {
    const id = this.loginService.getUser().userId;
    return this.store.list<any>(`/attendance/${subject}/${date}`, ref => ref.orderByChild('studentId').equalTo(id)).valueChanges();
  }
}
