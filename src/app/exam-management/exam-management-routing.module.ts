import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamManagementComponent } from './components/exam-management/exam-management.component';
import { ExamManagementModule } from './exam-management.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: undefined },
  { path: 'management', pathMatch: 'full', component: ExamManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamManagementRoutingModule { }
