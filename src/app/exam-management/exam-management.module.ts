import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamManagementRoutingModule } from './exam-management-routing.module';
import { ExamManagementComponent } from './components/exam-management/exam-management.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ExamManagementComponent],
  imports: [
    CommonModule,
    ExamManagementRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ExamManagementModule { }
