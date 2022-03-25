import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '@app/Common/User';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from '@app/Services/api-service.service';
import { CookieService } from 'ngx-cookie-service';
import { CompanyJobs } from '@app/Common/CompanyJobs';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-client-module',
  templateUrl: '././client-module.component.html',
  styleUrls: ['././client-module.component.css'],
})
export class ClientModuleComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: ApiServiceService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private matSnackBar: MatSnackBar
  ) {}

  @ViewChild(MatTable) table: MatTable<CompanyJobs>;
  ngOnInit() {
    this.GetAllEmployee();
    this.GetListPost();
  }

  element = {
    tag: '123',
  };

  infoJobs: CompanyJobs[] = [];
  user1: User[] = [
    {
      nameEmployee: '',
      postionEmployee: '',
      email: '',
      id: '',
      address: '',
      user: '',
    },
  ];
  dataAccount: any[] = [];
  status: any;
  private cookieValue = 'UNKNOWN';
  disabled: boolean = true;
  isHiddenLogin: boolean = false;
  isHiddenLogout: boolean = false;
  isHiddenText: boolean = true;
  nameUser: any;
  Form: any;
  displayedColumns: string[] = [];
  dataSource: any;
  selection: any;
  descriptions: any;

  GetAllEmployee = async () => {
    this.cookieValue = this.cookieService.get('username');
    if (this.cookieValue !== null) {
      this.nameUser = this.cookieValue;
      this.isHiddenLogin = true;
      this.isHiddenText = false;
      this.isHiddenLogout = false;
      console.log('check cookie', this.cookieValue);
      (await this.service.RequestShowInformation(this.cookieValue)).subscribe(
        (data: any) => {
          this.dataAccount = data;
          this.user1 = data;
          this.cookieService.set('id', this.user1[0].id);
          console.log('dataEmployee', this.user1);
        }
      );
    } else {
      this.isHiddenLogin = false;
      this.isHiddenText = true;
      this.isHiddenLogout = true;
    }
  };
  Logout = () => {
    this.cookieService.delete('username');
    this.cookieService.delete('user');
    this.router.navigate(['/login']);
  };

  newJob : any
  test: any;
  GetListPost = () => {
    this.service.RequestShowListJobs().subscribe((data: any) => {
      this.infoJobs = data;
      console.log('dataAccount', this.infoJobs);
      this.test = this.infoJobs.map((x) => {
        let y = x.tag.split(',').map((z) => {
          return { name: z };
        });
        return { ...x, tag: y };
      });

      console.log('tag', this.test);
    });
  };
}
