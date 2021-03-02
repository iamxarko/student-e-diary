import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleManagementRoutingModule } from './schedule-management-routing.module';
import { ScheduleManagementComponent } from './components/schedule-management/schedule-management.component';


@NgModule({
  declarations: [ScheduleManagementComponent],
  imports: [
    CommonModule,
    ScheduleManagementRoutingModule
  ]
})
export class ScheduleManagementModule { }
