import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticeManagementComponent } from './components/notice-management/notice-management.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: undefined },
  { path: 'management', pathMatch: 'full', component: NoticeManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticeManagementRoutingModule { }
