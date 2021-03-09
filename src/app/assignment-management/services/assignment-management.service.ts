import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AssignmentManagementService {
  getAssignmentsListForTeacher(assignmentName: any) {
    return this.store.list<any>(`/uploads/submissions/${assignmentName}`).valueChanges();
  }

  getAssignmentsListForStudent(assignmentName: any, studentId: string) {
    return this.store.object<any>(`/uploads/submissions/${assignmentName}/${studentId}`).valueChanges();
  }

  constructor(private store: AngularFireDatabase) { }
}
