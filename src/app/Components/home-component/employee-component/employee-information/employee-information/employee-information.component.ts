import { FormBuilder } from '@angular/forms';
import { ApiServiceService } from '@app/Services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@app/Common/User';

@Component({
  selector: 'app-employee-information',
  templateUrl: './employee-information.component.html',
  styleUrls: ['./employee-information.component.css'],
})
export class EmployeeInformationComponent implements OnInit {
  constructor(
    private router: Router,
    private service: ApiServiceService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private matSnackBar: MatSnackBar
  ) {}

  user: User = {
    nameEmployee: '',
    postionEmployee: '',
    email: '',
    id: '',
    address: '',
    user: '',
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
  statusAccount = ['Active', 'Inactive'];
  status: any;
  private cookieValue = 'UNKNOWN';
  disabled: boolean = true;
  isHiddenLogin: boolean = false;
  isHiddenLogout: boolean = false;
  isHiddenText: boolean = true;
  nameUser: any;
  result: any;

  ngOnInit() {
    this.GetAllEmployee();
  }

  employeeCreated = this.formBuilder.group({
    name: '',
    position: '',
    email: '',
    id: '',
    address: '',
    user: '',
  });
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
          console.log('dataEmployee', this.user1);
        }
      );
    } else {
      this.isHiddenLogin = false;
      this.isHiddenText = true;
      this.isHiddenLogout = true;
    }
  };

  onSubmit = () => {
    this.Form = JSON.stringify(this.employeeCreated.getRawValue());
    if (this.disabled) {
      this.disabled = false;
      console.log('Form', this.Form);
      this.user1.map((item, index) => {
        this.user1[index].nameEmployee = this.employeeCreated.value.name;
        this.user1[index].postionEmployee = this.employeeCreated.value.position;
        this.user1[index].email = this.employeeCreated.value.email;
        this.user1[index].id = this.employeeCreated.value.id;
        this.user1[index].address = this.employeeCreated.value.address;
      });
    } else {
      this.user = {
        ...this.employeeCreated.getRawValue(),
        id: this.cookieService.get('id'),
      }
      console.log('user', this.user);
      this.service.RequestUpdateEmployee(this.user).subscribe(
        (data: any) => {
          this.result = data;
          console.log('result', this.result);
          if (data.ok === 'Success') {
            this.disabled = true;
            console.log('check', this.result);
            this.matSnackBar.open('Update Employee success', 'Okay!', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['snack-success'],
            });
          }
        },
        (error: any) => {
          this.matSnackBar.open('Update Employee fail', 'Okay!', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snack-fails'],
          });
        }
      );
    }
  };

  onReset = () => {
    this.user = {
      nameEmployee: '',
      postionEmployee: '',
      email: '',
      id: '',
      address: '',
      user: '',
    };
  };
}
