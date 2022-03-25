import { Employees } from './../../../Common/Employee';
import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '@app/Services/api-service.service';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-component',
  templateUrl: './manage-component.component.html',
  styleUrls: ['./manage-component.component.css'],
})
export class ManageComponentComponent implements OnInit {
  constructor(
    private service: ApiServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}

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

  ngOnInit() {
    this.GetAllAccount();
  }

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

  onSubmit = () => {
    this.Form = JSON.stringify(this.userCreated.getRawValue());
    console.log('Form1', this.Form);
    this.service.RequestRegister(this.Form).subscribe(
      (data: any) => {
        this.infoRegister = data;
        console.log(this.infoRegister);
        if (data.ok === 'Success') {
          console.log('check', this.infoRegister);
          this.GetAllAccount();
          this.matSnackBar.open('Create success', 'Okay!', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snack-success'],
          });
        }
      },
      (err) => {
        this.GetAllAccount();
        this.matSnackBar.open('Create Account fail', 'Okay!', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snack-fails'],
        });
      }
    );
  };

  onReset = () => {
    this.employee = {
      fullname: '',
      username: '',
      email: '',
      position: '',
      address: '',
      approve: false,
      password: '',
      status: '',
    };
  };

  newRow: any = {};
  arrayTrue: any[] = [];
  arrayFalse: any[] = [];
  arrayApprove: any[] = [];

  result: any;

  CheckCheck = (evt, row) => {
    this.newRow = Object.assign({}, row, { approve: evt.checked });
    if (evt.checked) {
      this.arrayTrue.push(this.newRow);
      let el1 = this.arrayFalse.find((itm) => itm.email === row.email);
      if (el1) {
        this.arrayFalse.splice(this.arrayFalse.indexOf(el1), 1);
      }
    } else {
      this.newRow = Object.assign({}, row, { approve: evt.checked });
      this.arrayFalse.push(this.newRow);
      let el = this.arrayTrue.find((itm) => itm.email === row.email);
      if (el) {
        this.arrayTrue.splice(this.arrayTrue.indexOf(el), 1);
        console.log('arrayTrue', this.arrayTrue);
      }
    }
    this.arrayApprove = this.arrayTrue.concat(this.arrayFalse);
    console.log('changedPermissions', this.arrayApprove);
  };
  getRowClick = (evt) => {
    this.employee = {
      fullname: evt.name,
      username: evt.userName,
      email: evt.email,
      position: evt.position,
      address: '',
      approve: false,
      password: '********',
      status: '',
    };
    console.log('getRow', this.employee);
  };

  updateData = () => {
    this.service.RequestApprove(this.arrayApprove).subscribe(
      (data: any) => {
        this.result = data;
        console.log('result', this.result);
        if (data.ok === 'Success') {
          console.log('check', this.result);
          this.GetAllAccount();
          this.matSnackBar.open('Approve Success', 'Okay!', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snack-success'],
          });
          this.table.renderRows();
        }
      },
      (error) => {
        this.matSnackBar.open('Update Account fail', 'Okay!', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snack-fails'],
        });
      }
    );
  };

  removeData = () => {
    this.service.RequestDetele(this.arrayApprove).subscribe(
      (data: any) => {
        this.result = data;
        console.log('result', this.result);
        if (data.ok === 'Success') {
          console.log('check', this.result);
          this.GetAllAccount();
          this.matSnackBar.open('Delete account Success', 'Okay!', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snack-success'],
          });
          this.table.renderRows();
        }
      },
      (err) => {
        this.matSnackBar.open('Delete Employee fail', 'Okay!', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snack-fails'],
        });
      }
    );
  };
  applyFilter = (evt) => {
    const filterValue = (evt.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  };
}
