import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultManagementComponent } from './components/result-management/result-management.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ResultManagementComponent, data: { title: 'Result' } },
  { path: 'management', pathMatch: 'full', component: ResultManagementComponent, data: { title: 'Result Management' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultManagementRoutingModule { }
