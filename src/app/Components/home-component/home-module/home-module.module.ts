import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModuleComponent } from './home-module.component';
import { ManageComponentComponent } from '../manage-component/manage-component.component';
import { DashboardsComponentComponent } from '../dashboards-component/dashboards-component.component';

@NgModule({
  imports: [CommonModule],
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
