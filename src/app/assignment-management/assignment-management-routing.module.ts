import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentManagementComponent } from './components/assignment-management/assignment-management.component';
import { SubmissionComponent } from './components/submission/submission.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AssignmentManagementComponent, data: { title: 'Assignment' } },
  { path: 'management', pathMatch: 'full', component: AssignmentManagementComponent, data: {title: 'Assignment Management'} },
  { path: 'submission/:id', pathMatch: 'full', component: SubmissionComponent, data: { title: 'Submissions' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentManagementRoutingModule { }
