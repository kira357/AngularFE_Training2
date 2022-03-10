import { Employees } from './../../../Common/Employee';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '@app/Services/api-service.service';

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
      // {
      //   title: 'Approved',
      //   width: 90,
      //   dataType: 'bool',
      //   align: 'center',
      //   dataIndx: 'approve',
      //   editor: true,
      //   editable: true,
      //   type: 'checkbox',
      //   validations: [{ type: 'nonEmpty', msg: 'Required' }],
      // },
      {
        title: 'Discontinued',
        width: 100,
        dataType: 'bool',
        align: 'center',
        dataIndx: 'approve',
        editor: false,
        editable: true,
        type: 'checkbox',
        validations: [{ type: 'nonEmpty', msg: 'Required' }],
        cb: { header: true, select: true, all: true },
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
    this.service.RequestShowListUSer().subscribe((data: any) => {
      this.dataAccount = data;
      console.log('dataAccount', data);
      console.log('dataAccount', this.dataAccount);
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
}
