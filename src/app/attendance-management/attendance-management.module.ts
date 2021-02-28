import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceManagementRoutingModule } from './attendance-management-routing.module';
import { AttendanceManagementComponent } from './components/attendance-management/attendance-management.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AttendanceManagementComponent],
  imports: [
    CommonModule,
    AttendanceManagementRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AttendanceManagementModule { }
