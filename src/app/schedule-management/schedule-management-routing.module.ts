import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleManagementComponent } from './components/schedule-management/schedule-management.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ScheduleManagementComponent, data: { title: 'Schedule' } },
  { path: 'management', pathMatch: 'full', component: ScheduleManagementComponent, data: { title: 'Schedule Management' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleManagementRoutingModule { }
