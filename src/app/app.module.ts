import { MainComponent } from './Components/home-component/main-component/main/main.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponentComponent } from './Components/register-component/register-component.component';
import { LoginComponentComponent } from './Components/login-component/login-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiServiceService } from './Services/api-service.service';
import { HomeModuleModule } from './Components/home-component/home-module/home-module.module';
import { LoginActivateServiceService } from './Services/login-activate-service.service';
import { CookieService } from 'ngx-cookie-service';

import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MainModule } from './Components/home-component/main-component/main/main.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ClientModuleModule } from './Components/home-component/client-module/client-module.module';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    RegisterComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HomeModuleModule,
    MainModule,
    MatTableModule,
    MatSlideToggleModule,
    ClientModuleModule,
    // CKEditorModule,
    // NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [ApiServiceService, CookieService, LoginActivateServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
