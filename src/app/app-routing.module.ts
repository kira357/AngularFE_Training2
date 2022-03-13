import { EmployeeComponentComponent } from './Components/home-component/employee-component/employee-component.component';
import { ManageComponentComponent } from './Components/home-component/manage-component/manage-component.component';
import { HomeModuleComponent } from './Components/home-component/home-module/home-module.component';
import { DashboardsComponentComponent } from './Components/home-component/dashboards-component/dashboards-component.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './Components/login-component/login-component.component';
import { RegisterComponentComponent } from './Components/register-component/register-component.component';
import { MainComponentComponent } from './Components/home-component/main-component/main-component.component';
import { DashboardsEmployeeComponentComponent } from './Components/home-component/dashboardsEmployee-component/dashboardsEmployee-component.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponentComponent },
  { path: 'register', component: RegisterComponentComponent },
  { path: 'employee', component: MainComponentComponent },
  {
    path: 'home',
    component: HomeModuleComponent,
    children: [
      { path: 'dashboards', component: DashboardsComponentComponent },
      {
        path: 'dashboards_employee',
        component: DashboardsEmployeeComponentComponent,
      },
      { path: 'manage', component: ManageComponentComponent },
      { path: 'employee', component: EmployeeComponentComponent },
    ],
  },
  { path: 'createemployee', component: LoginComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
