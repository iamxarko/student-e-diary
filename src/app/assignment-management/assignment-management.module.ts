import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentManagementRoutingModule } from './assignment-management-routing.module';
import { AssignmentManagementComponent } from './components/assignment-management/assignment-management.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SubmissionComponent } from './components/submission/submission.component';


@NgModule({
  declarations: [AssignmentManagementComponent, SubmissionComponent],
  imports: [
    CommonModule,
    AssignmentManagementRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AssignmentManagementModule { }
