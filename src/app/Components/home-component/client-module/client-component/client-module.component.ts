import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '@app/Common/User';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from '@app/Services/api-service.service';
import { CookieService } from 'ngx-cookie-service';

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
  ngOnInit() {
    this.GetAllEmployee();
  }

  element = {
    tag: '123',
  };
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
  Form: any;
  dataSource: any;
  statusAccount = ['Active', 'Inactive'];
  status: any;
  private cookieValue = 'UNKNOWN';
  disabled: boolean = true;
  isHiddenLogin: boolean = false;
  isHiddenLogout: boolean = false;
  isHiddenText: boolean = true;
  nameUser: any;
  result: any;

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
}
