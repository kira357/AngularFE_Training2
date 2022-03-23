import { Jobs } from './../../../../../Common/Jobs';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiServiceService } from '@app/Services/api-service.service';
import { CookieService } from 'ngx-cookie-service';
import { CompanyJobs } from '@app/Common/CompanyJobs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-employee-dashboards',
  templateUrl: './employee-dashboards.component.html',
  styleUrls: ['./employee-dashboards.component.css'],
})
export class EmployeeDashboardsComponent implements OnInit {
  constructor(
    private service: ApiServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private cookieService: CookieService
  ) {}
  check: any;
  infoRegister: any[] = [];
  dataAccount: any[] = [];
  Form: any;
  displayedColumns: string[] = [];
  dataSource: any;
  selection: any;
  tags: any[] = [];
  newData: any[] = [];

  @ViewChild(MatTable) table: MatTable<CompanyJobs>;

  infoJobs: CompanyJobs[] = [
    {
      name: '',
      imageSrc: '',
      type: '',
      active: false,
      tag: '',
      dayLeft: '',
      idCompany: '',
      id: '',
      dateExpire: '',
      descriptions: '',
    },
  ];

  ngOnInit() {
    this.GetListPost();
  }
  test: any;
  GetListPost = () => {
    this.displayedColumns = [
      'logo',
      'name',
      'type',
      'tag',
      'dayLeft',
      'active',
      'options',
    ];
    this.service.RequestShowListJobs().subscribe((data: any) => {
      this.dataAccount = data;
      this.infoJobs = data;
      console.log('dataAccount', this.infoJobs);
      this.test = this.infoJobs.map((x) => {
        let y = x.tag.split(',').map((z) => {
          return { name: z };
        }
        );
        return { ...x, tag: y };
      });
      console.log('tag', this.test);
      this.dataSource = new MatTableDataSource<CompanyJobs>(this.test);
      this.selection = new SelectionModel<CompanyJobs>(true, []);
    });
  };
}
