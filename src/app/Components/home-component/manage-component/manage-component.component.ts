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

@Component({
  selector: 'app-manage-component',
  templateUrl: './manage-component.component.html',
  styleUrls: ['./manage-component.component.css'],
})
export class ManageComponentComponent implements OnInit {
  constructor(
    private service: ApiServiceService,
    private formBuilder: FormBuilder,
    private router: Router
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

  // settingColumn = {
  //   columns: [
  //     {
  //       title: 'Full Name',
  //       width: 90,
  //       dataType: 'string',
  //       dataIndx: 'name',
  //       editable: true,
  //       align: 'center',
  //     },
  //     {
  //       title: 'User Name',
  //       width: 90,
  //       dataType: 'string',
  //       dataIndx: 'userName',
  //       editable: false,
  //       align: 'center',
  //     },
  //     {
  //       title: 'Email',
  //       width: 90,
  //       dataType: 'string',
  //       dataIndx: 'email',
  //       editable: false,
  //       align: 'center',
  //     },
  //     {
  //       title: 'Position',
  //       width: 90,
  //       dataType: 'string',
  //       dataIndx: 'position',
  //       editable: false,
  //       align: 'center',
  //     },
  //     {
  //       title: 'Approved',
  //       width: 90,
  //       dataType: 'bool',
  //       align: 'center',
  //       dataIndx: 'approve',
  //       editor: true,
  //       editable: true,
  //       type: 'checkbox',
  //       validations: [{ type: 'nonEmpty', msg: 'Required' }],
  //     },

  //     // render: function (ui) {
  //     //   if (ui.rowData.approve === true) {
  //     //     return "<div> <input type='checkbox' checked='checked'></div>";
  //     //   } else {
  //     //     return "<div> <input type='checkbox' ></div>";
  //     //   }
  //     // },
  //     {
  //       title: 'Options',
  //       editable: false,
  //       sortable: false,
  //       align: 'center',
  //       render: function (ui) {
  //         return (
  //           "<button id='update_btn' type='button' class='btn btn-primary mr-1'>Update</button>" +
  //           "<button id='delete_btn' type='button' class='btn btn-success'>Detele</button>"
  //         );
  //       },
  //       postRender: function (ui) {
  //         var rowIndx = ui.rowIndx,
  //           grid = this,
  //           cell = grid.getCell(ui);
  //         cell.find('#delete_btn').bind('click', (evt) => {
  //           evt.preventDefault();
  //           // this.deleteRow(rowIndx, grid);
  //         });
  //         cell.find('#update_btn').bind('click', (evt) => {
  //           // this.updateRow(rowIndx, grid);
  //           console.log('test update', ui.rowData.approve);
  //         });
  //       },
  //     },
  //   ],
  // };

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
    console.log('Form', this.Form);
    this.service.RequestRegister(this.Form).subscribe((data: any) => {
      this.infoRegister = data;
      console.log(this.infoRegister);
      if (data.ok === 'Success') {
        console.log('check', this.infoRegister);
      }
    });
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
    };
  };

  // HandleOnClickRow = (evt) => {
  //   this.employee = {
  //     fullname: evt.name,
  //     username: evt.userName,
  //     email: evt.email,
  //     position: evt.position,
  //     address: '',
  //     approve: false,
  //   };
  // };

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
    };
    console.log('getRow', this.employee);
  };

  updateData = () => {
    this.service.RequestApprove(this.arrayApprove).subscribe((data: any) => {
      this.result = data;
      console.log('result', this.result);
      if (data.ok === 'Success') {
        console.log('check', this.result);
        this.table.renderRows();
      }
    });
  };

  removeData = () => {
    this.service.RequestDetele(this.arrayApprove).subscribe((data: any) => {
      this.result = data;
      console.log('result', this.result);
      if (data.ok === 'Success') {
        console.log('check', this.result);
        this.table.renderRows();
      }
    }
    );
  };
}
