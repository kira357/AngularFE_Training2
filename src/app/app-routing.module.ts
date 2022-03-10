import { ManageComponentComponent } from './Components/home-component/manage-component/manage-component.component';
import { HomeModuleComponent } from './Components/home-component/home-module/home-module.component';
import { DashboardsComponentComponent } from './Components/home-component/dashboards-component/dashboards-component.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './Components/login-component/login-component.component';
import { RegisterComponentComponent } from './Components/register-component/register-component.component';
import { MainComponentComponent } from './Components/home-component/main-component/main-component.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponentComponent },
  { path: 'register', component: RegisterComponentComponent },
  {
    path: 'home',
    component: HomeModuleComponent,
    children: [
      { path: 'dashboards', component: MainComponentComponent },
      { path: 'manage', component: ManageComponentComponent },
    ],
  },
  { path: 'createemployee' ,component: LoginComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
