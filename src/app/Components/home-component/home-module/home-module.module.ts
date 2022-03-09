import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeModuleComponent } from './home-module.component';
import { ManageComponentComponent } from '../manage-component/manage-component.component';
import { DashboardsComponentComponent } from '../dashboards-component/dashboards-component.component';
@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    HomeModuleComponent,
    ManageComponentComponent,
    DashboardsComponentComponent,
  ],
  exports: [
    HomeModuleComponent,
    ManageComponentComponent,
    DashboardsComponentComponent,
  ],
})
export class HomeModuleModule {}
