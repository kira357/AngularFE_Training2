import { DashboardsEmployeeComponentComponent } from './../dashboardsEmployee-component/dashboardsEmployee-component.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeModuleComponent } from './home-module.component';
import { ManageComponentComponent } from '../manage-component/manage-component.component';
import { DashboardsComponentComponent } from '../dashboards-component/dashboards-component.component';
import { EmployeeComponentComponent } from '../employee-component/employee-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatSnackBarModule,
  ],
  declarations: [
    HomeModuleComponent,
    ManageComponentComponent,
    DashboardsComponentComponent,
    EmployeeComponentComponent,
    DashboardsEmployeeComponentComponent,
    ManageComponentComponent,
  ],
  exports: [
    HomeModuleComponent,
    ManageComponentComponent,
    DashboardsComponentComponent,
    EmployeeComponentComponent,
    DashboardsEmployeeComponentComponent,
    ManageComponentComponent,
  ],
})
export class HomeModuleModule {}
