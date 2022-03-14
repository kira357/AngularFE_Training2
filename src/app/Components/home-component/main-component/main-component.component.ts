import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '@app/Services/api-service.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { User } from '@app/Common/User';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css'],
})
export class MainComponentComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
  listPosition: any[] = ['Director', 'Leader', 'Member'];
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

  employeeCreated = this.formBuilder.group({
    name: '',
    position: '',
    email: '',
    id: '',
    address: '',
    user: '',
  });

  ngOnInit() {
    this.GetAllEmployee();
  }

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
      this.service.RequestUpdateEmployee(this.Form).subscribe(
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

  Logout = () => {
    this.cookieService.delete('username');
    this.cookieService.delete('user');
    this.router.navigate(['/login']);
  };
}
