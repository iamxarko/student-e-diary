import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultManagementRoutingModule } from './result-management-routing.module';
import { ResultManagementComponent } from './components/result-management/result-management.component';


@NgModule({
  declarations: [ResultManagementComponent],
  imports: [
    CommonModule,
    ResultManagementRoutingModule
  ]
})
export class ResultManagementModule { }
