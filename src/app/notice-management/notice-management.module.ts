import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticeManagementRoutingModule } from './notice-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { NoticeManagementComponent } from './components/notice-management/notice-management.component';



@NgModule({
  declarations: [NoticeManagementComponent],
  imports: [
    CommonModule,
    NoticeManagementRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NoticeManagementModule { }
