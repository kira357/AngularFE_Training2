import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { EmployeeManagmentComponent } from './employee-managment.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EmployeeManagmentJobsComponent } from '../../employee-managment-jobs/employee-managment-jobs.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    CKEditorModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  declarations: [EmployeeManagmentComponent, EmployeeManagmentJobsComponent],
  exports: [EmployeeManagmentComponent, EmployeeManagmentJobsComponent],
})
export class EmployeeManagmentModule {}
