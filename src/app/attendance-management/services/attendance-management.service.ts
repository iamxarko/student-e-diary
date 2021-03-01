import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AttendanceManagementService {

  constructor(private store: AngularFireDatabase, private snackBar: MatSnackBar) { }

  getAttendance = () => {
    return this.store.object<any>(`/attendance`).valueChanges();
  }

  getStudents = () => {
    return this.store.list(`/users`, ref => ref.orderByChild('userType').equalTo('student')).valueChanges();
  }

  markAbsent(subject: any, date: any, student: any) {
    this.markAttendance(subject, date, student, 'A');
  }
  markPresent(subject: any, date: any, student: any) {
    this.markAttendance(subject, date, student, 'P');
  }

  markAttendance = (subject: any, date: any, student: any, pOrA: string) => {
    const attendance = { attendance: pOrA, name: student.name, studentId: student.userId };
    this.store.object<any>(`/attendance/${subject}/${date}`).update([attendance]).then(() => {
      this.snackBar.open('Attendance added!', 'Dismiss', {
        duration: 5000,
      });
    }, () => {
      console.log('Error occurred!');
    }).catch(() => {
      console.log('Error occurred!');
    });
  }
}
