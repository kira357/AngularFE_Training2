import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponentComponent } from './Components/register-component/register-component.component';
import { LoginComponentComponent } from './Components/login-component/login-component.component';
import { HomeComponentComponent } from './Components/home-component/home-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiServiceService } from './Services/api-service.service';
import { HomeModuleModule } from './Components/home-component/home-module/home-module.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
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
  ],
  providers: [ApiServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
