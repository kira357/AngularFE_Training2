import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDashboardsComponent } from './employee-dashboards.component';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSlideToggleModule,
    NgModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [EmployeeDashboardsComponent],
  exports: [EmployeeDashboardsComponent],
})
export class EmployeeDashboardsModule {}
