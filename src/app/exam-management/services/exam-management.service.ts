import { Injectable } from '@angular/core';
import { ExamManagementModule } from '../exam-management.module';

@Injectable({
  providedIn: 'root'
})
export class ExamManagementService {

  constructor(private examManagementModule: ExamManagementModule) { }
}
