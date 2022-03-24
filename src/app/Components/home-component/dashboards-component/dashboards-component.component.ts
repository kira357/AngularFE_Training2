import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '@app/Services/api-service.service';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Employees } from '@app/Common/Employee';

@Component({
  selector: 'app-dashboards-component',
  templateUrl: './dashboards-component.component.html',
  styleUrls: ['./dashboards-component.component.css'],
})
export class DashboardsComponentComponent implements OnInit {
  constructor(
    private service: ApiServiceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.GetAllAccount();
  }
  @ViewChild(MatTable) table: MatTable<Employees>;

  check: any;
  infoRegister: any[] = [];
  dataAccount: any[] = [];
  listPosition: any[] = ['Director', 'Leader', 'Member'];
  Form: any;

  employee: Employees = {
    fullname: '',
    username: '',
    email: '',
    position: '',
    address: '',
    approve: false,
    password: '',
    status: '',
  };
  employee1: Employees[] = [
    {
      fullname: '',
      username: '',
      email: '',
      position: '',
      address: '',
      approve: false,
      password: '',
      status: '',
    },
  ];

  displayedColumns: string[] = [];
  dataSource: any;
  selection: any;

  userCreated = this.formBuilder.group({
    username: '',
    password: '',
    email: '',
    name: '',
    position: '',
    approve: false,
  });

  GetAllAccount = () => {
    this.displayedColumns = [
      'FullName',
      'UserName',
      'Email',
      'Position',
      'Approve',
    ];
    this.service.RequestShowListUSer().subscribe((data: any) => {
      this.dataAccount = data;
      this.employee1 = data;
      console.log('dataAccount', this.employee1);
      this.dataSource = new MatTableDataSource<Employees>(this.employee1);
      this.selection = new SelectionModel<Employees>(true, []);
    });
  };
}
