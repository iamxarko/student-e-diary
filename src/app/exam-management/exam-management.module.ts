import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamManagementRoutingModule } from './exam-management-routing.module';
import { ExamManagementComponent } from './components/exam-management/exam-management.component';


@NgModule({
  declarations: [ExamManagementComponent],
  imports: [
    CommonModule,
    ExamManagementRoutingModule
  ]
})
export class ExamManagementModule { }
