import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceManagementComponent } from './components/attendance-management/attendance-management.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AttendanceManagementComponent, data: { title: 'Attendance' } },
  { path: 'management', pathMatch: 'full', component: AttendanceManagementComponent, data: { title: 'Attendance Management' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceManagementRoutingModule { }
