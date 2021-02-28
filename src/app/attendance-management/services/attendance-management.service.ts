import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AttendanceManagementService {

  constructor(private store: AngularFireDatabase) { }

  getAttendance = () => {
    return this.store.object<any>(`/attendance`).valueChanges();
  }
}
