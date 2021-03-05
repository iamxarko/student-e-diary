import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentManagementRoutingModule } from './assignment-management-routing.module';
import { AssignmentManagementComponent } from './components/assignment-management/assignment-management.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AssignmentManagementComponent],
  imports: [
    CommonModule,
    AssignmentManagementRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AssignmentManagementModule { }
