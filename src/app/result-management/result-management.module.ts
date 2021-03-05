import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultManagementRoutingModule } from './result-management-routing.module';
import { ResultManagementComponent } from './components/result-management/result-management.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ResultManagementComponent],
  imports: [
    CommonModule,
    ResultManagementRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ResultManagementModule { }
