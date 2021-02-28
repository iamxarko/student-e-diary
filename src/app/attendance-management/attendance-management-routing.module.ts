import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceManagementComponent } from './components/attendance-management/attendance-management.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: undefined },
  { path: 'management', pathMatch: 'full', component: AttendanceManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceManagementRoutingModule { }
