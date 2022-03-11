import { Employees } from './../../../Common/Employee';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '@app/Services/api-service.service';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

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
  };
  employee1: Employees[] = [
    {
      fullname: '',
      username: '',
      email: '',
      position: '',
      address: '',
      approve: false,
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

  settingColumn = {
    columns: [
      {
        title: 'Full Name',
        width: 90,
        dataType: 'string',
        dataIndx: 'name',
        editable: true,
        align: 'center',
      },
      {
        title: 'User Name',
        width: 90,
        dataType: 'string',
        dataIndx: 'userName',
        editable: false,
        align: 'center',
      },
      {
        title: 'Email',
        width: 90,
        dataType: 'string',
        dataIndx: 'email',
        editable: false,
        align: 'center',
      },
      {
        title: 'Position',
        width: 90,
        dataType: 'string',
        dataIndx: 'position',
        editable: false,
        align: 'center',
      },
      {
        title: 'Approved',
        width: 90,
        dataType: 'bool',
        align: 'center',
        dataIndx: 'approve',
        editor: true,
        editable: true,
        type: 'checkbox',
        validations: [{ type: 'nonEmpty', msg: 'Required' }],
      },

      // render: function (ui) {
      //   if (ui.rowData.approve === true) {
      //     return "<div> <input type='checkbox' checked='checked'></div>";
      //   } else {
      //     return "<div> <input type='checkbox' ></div>";
      //   }
      // },
      {
        title: 'Options',
        editable: false,
        sortable: false,
        align: 'center',
        render: function (ui) {
          return (
            "<button id='update_btn' type='button' class='btn btn-primary mr-1'>Update</button>" +
            "<button id='delete_btn' type='button' class='btn btn-success'>Detele</button>"
          );
        },
        postRender: function (ui) {
          var rowIndx = ui.rowIndx,
            grid = this,
            cell = grid.getCell(ui);
          cell.find('#delete_btn').bind('click', (evt) => {
            evt.preventDefault();
            // this.deleteRow(rowIndx, grid);
          });
          cell.find('#update_btn').bind('click', (evt) => {
            // this.updateRow(rowIndx, grid);
            console.log('test update', ui.rowData.approve);
          });
        },
      },
    ],
  };

  ngOnInit() {
    this.GetAllAccount();
  }

  GetAllAccount = () => {
    // displayedColumns: string[] = ['FullName', 'UserName', 'Email', 'Position', 'Approve'];
    // dataSource = new MatTableDataSource<Employees>(this.employee1);
    // selection = new SelectionModel<Employees>(true, []);
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

  deteleRow = (rowIndx, grid) => {
    grid.addClass({ rowIndx: rowIndx, cls: 'pq-row-delete' });
    console.log('checkrow', rowIndx);
    var ans = window.confirm(
      'Are you sure to delete row No ' + (rowIndx + 1) + '?'
    );
    if (ans) {
      var ProductID = grid.getRecId({ rowIndx: rowIndx });
      console.log(ProductID);
    } else {
      grid.removeClass({ rowIndx: rowIndx, cls: 'pq-row-delete' });
    }
  };
  updateRow = (rowIndx, grid) => {
    console.log('checkrow', rowIndx);
  };

  onSubmit = () => {
    this.Form = JSON.stringify(this.userCreated.getRawValue());
    this.service.RequestRegister(this.Form).subscribe((data: any) => {
      this.infoRegister = data;
      console.log(this.infoRegister);
      if (data.ok === 'Success') {
        console.log('check', this.infoRegister);
      }
    });
  };

  HandleOnClickRow = (evt) => {
    this.employee = {
      fullname: evt.name,
      username: evt.userName,
      email: evt.email,
      position: evt.position,
      address: '',
      approve: false,
    };
  };

  newRow = {};

  CheckCheck = (evt, row) => {
    console.log('check', { check: evt.checked, row: row });
    this.newRow = Object.assign({}, row, { approve: evt.checked });
    console.log('row', this.newRow);
  };
}
