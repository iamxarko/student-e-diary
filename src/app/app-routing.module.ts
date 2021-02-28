import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './login/service/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule)
  },
  {
    path: 'fees',
    loadChildren: () => import('./fees-management/fees-management.module').then(m => m.FeesManagementModule)
  },
  {
    path: 'exam',
    loadChildren: () => import('./exam-management/exam-management.module').then(m => m.ExamManagementModule)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./attendance-management/attendance-management.module').then(m => m.AttendanceManagementModule)
  },
  {
    path: 'result',
    loadChildren: () => import('./result-management/result-management.module').then(m => m.ResultManagementModule)
  },
  {
    path: 'assignment',
    loadChildren: () => import('./assignment-management/assignment-management.module').then(m => m.AssignmentManagementModule)
  },
  {
    path: 'notice',
    loadChildren: () => import('./notice-management/notice-management.module').then(m => m.NoticeManagementModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./schedule-management/schedule-management.module').then(m => m.ScheduleManagementModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
