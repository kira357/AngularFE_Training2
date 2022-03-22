import { EmployeeManagmentComponent } from './Components/home-component/employee-component/employee-managment/employee-managment/employee-managment.component';
import { ManageComponentComponent } from './Components/home-component/manage-component/manage-component.component';
import { HomeModuleComponent } from './Components/home-component/home-module/home-module.component';
import { DashboardsComponentComponent } from './Components/home-component/dashboards-component/dashboards-component.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './Components/login-component/login-component.component';
import { RegisterComponentComponent } from './Components/register-component/register-component.component';
import { DashboardsEmployeeComponentComponent } from './Components/home-component/dashboardsEmployee-component/dashboardsEmployee-component.component';
import { LoginActivateServiceService } from './Services/login-activate-service.service';
import { MainComponent } from './Components/home-component/main-component/main/main.component';
import { EmployeeDashboardsComponent } from './Components/home-component/employee-component/employee-dashboards/employee-dashboards/employee-dashboards.component';
import { EmployeeInformationComponent } from './Components/home-component/employee-component/employee-information/employee-information/employee-information.component';
import { EmployeeComponent } from './Components/home-component/employee-component/employee/employee.component';
import { EmployeeManagmentJobsComponent } from './Components/home-component/employee-component/employee-managment-jobs/employee-managment-jobs.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponentComponent },
  { path: 'register', component: RegisterComponentComponent },
  {
    path: 'employee',
    component: MainComponent,
    canActivate: [LoginActivateServiceService],
    children: [
      { path: 'dashboards', component: EmployeeDashboardsComponent },
      { path: 'managment-company', component: EmployeeManagmentComponent },
      { path: 'managment-jobs', component: EmployeeManagmentJobsComponent },

      { path: 'information', component: EmployeeInformationComponent },
    ],
  },
  {
    path: 'home',
    component: HomeModuleComponent,
    canActivate: [LoginActivateServiceService],
    children: [
      {
        path: 'dashboards',
        component: DashboardsComponentComponent,
      },
      {
        path: 'dashboards_employee',
        component: DashboardsEmployeeComponentComponent,
      },
      {
        path: 'manage',
        component: ManageComponentComponent,
      },
      {
        path: 'employee',
        component: EmployeeComponent,
      },
    ],
  },
  {
    path: 'createemployee',
    component: LoginComponentComponent,
    canActivate: [LoginActivateServiceService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
