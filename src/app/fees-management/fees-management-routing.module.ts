import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeesManagementComponent } from './components/fees-management/fees-management.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: FeesManagementComponent, data: { title: 'Fees' } },
  { path: 'management', pathMatch: 'full', component: FeesManagementComponent, data: { title: 'Fees Management' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesManagementRoutingModule { }
