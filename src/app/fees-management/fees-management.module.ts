import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeesManagementRoutingModule } from './fees-management-routing.module';
import { FeesManagementComponent } from './components/fees-management/fees-management.component';


@NgModule({
  declarations: [FeesManagementComponent],
  imports: [
    CommonModule,
    FeesManagementRoutingModule
  ]
})
export class FeesManagementModule { }
