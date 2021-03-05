import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamManagementComponent } from './components/exam-management/exam-management.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ExamManagementComponent, data: { title: 'Exam' } },
  { path: 'management', pathMatch: 'full', component: ExamManagementComponent, data: { title: 'Exam Management' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamManagementRoutingModule { }
