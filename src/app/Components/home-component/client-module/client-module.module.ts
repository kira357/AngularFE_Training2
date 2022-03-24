import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientModuleComponent } from './client-component/client-module.component';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatPaginatorModule } from '@angular/material/paginator';

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
    CKEditorModule,
    MatPaginatorModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  declarations: [ClientModuleComponent],
  exports: [ClientModuleComponent],
})
export class ClientModuleModule {}
