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
    private cookieService: CookieService
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
  check: any;
  infoRegister: any[] = [];
  dataAccount: any[] = [];
  listPosition: any[] = ['Director', 'Leader', 'Member'];
  Form: any;
  displayedColumns: string[] = [];
  dataSource: any;
  selection: any;
  statusAccount = ['Active', 'Inactive'];
  status: any;
  private cookieValue: string;

  employeeCreated = this.formBuilder.group({
    name: '',
    position: '',
    email: '',
    id: '',
    address: '',
    user: '',
  });

  ngOnInit() {
    // this.GetAllEmployee();
  }
  
  GetAllEmployee =  () => {
    this.displayedColumns = [
      'nameEmployee',
      'email',
      'address',
      'postionEmployee',
      'user',
    ];
    this.cookieValue = this.cookieService.get('username');
    console.log('cookie', this.cookieValue);
    setTimeout(() => {
      this.service
        .RequestShowInformation(this.cookieValue)
        .subscribe((data: any) => {
          this.dataAccount = data;
          this.user1 = data;
          console.log('dataEmployee', this.user1);

          this.dataSource = new MatTableDataSource<User>(this.user1);
          this.selection = new SelectionModel<User>(true, []);
        });
    }, 2000);
  };

  onSubmit = () => {
    this.Form = JSON.stringify(this.employeeCreated.getRawValue());
    console.log('Form', this.Form);
    this.service.RequestCreateEmployee(this.Form).subscribe((data: any) => {
      this.infoRegister = data;
      console.log(this.infoRegister);
      if (data.ok === 'Success') {
        console.log('check', this.infoRegister);
      }
    });
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
