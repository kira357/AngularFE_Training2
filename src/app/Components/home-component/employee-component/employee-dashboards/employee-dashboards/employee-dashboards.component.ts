import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  logo: string;
  nameCompany: string;
  address: string;
  jobs: string;
}

@Component({
  selector: 'app-employee-dashboards',
  templateUrl: './employee-dashboards.component.html',
  styleUrls: ['./employee-dashboards.component.css'],
})
export class EmployeeDashboardsComponent implements OnInit {
  constructor() {}
  check: any;
  infoRegister: any[] = [];
  dataAccount: any[] = [];
  Form: any;
  displayedColumns: string[] = [];
  dataSource: any;
  selection: any;

  @ViewChild(MatTable) table: MatTable<PeriodicElement>;

  employee1: PeriodicElement[] = [
    {
      logo: '123',
      nameCompany: '123',
      address: '123',
      jobs: '123',
    },
  ];
  ngOnInit() {
    this.GetListPost();
  }

  GetListPost = () => {
    this.displayedColumns = [
      'logo',
      'nameCompany',
      'address',
      'jobs',
      'active',
      'options',
    ];
    // this.service.RequestShowListUSer().subscribe((data: any) => {
    //   this.dataAccount = data;
    //   this.employee1 = data;
    //   console.log('dataAccount', this.employee1);
    // });
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.employee1);
    this.selection = new SelectionModel<PeriodicElement>(true, []);
  };
}
