import { EmployeeDashboardsComponent } from './../../employee-component/employee-dashboards/employee-dashboards/employee-dashboards.component';
import { EmployeeManagmentModule } from './../../employee-component/employee-managment/employee-managment/employee-managment.module';
import { EmployeeInformationModule } from './../../employee-component/employee-information/employee-information/employee-information.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EmployeeDashboardsModule } from '../../employee-component/employee-dashboards/employee-dashboards/employee-dashboards.module';
import { EmployeeManagmentJobsComponent } from '../../employee-component/employee-managment-jobs/employee-managment-jobs.component';
import { MatChipsModule } from '@angular/material/chips';
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSlideToggleModule,
    FormsModule,
    HttpClientModule,
    MatChipsModule,
  ],
  exports: [MainComponent],
  declarations: [MainComponent, EmployeeDashboardsComponent],
})
export class MainModule {}
