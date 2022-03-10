import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '@app/Services/api-service.service';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css'],
})
export class MainComponentComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: ApiServiceService
  ) {}

  check: any;
  settingOptions: any;

  settingColumn = {
    columns: [
      {
        title: 'Full Name',
        width: 100,
        dataType: 'string',
        dataIndx: 'name',
        editable: 100,
        align: 'center',
      },
      {
        title: 'User Name',
        width: 100,
        dataType: 'string',
        dataIndx: 'userName',
        editable: false,
        align: 'center',
      },
      {
        title: 'Email',
        width: 100,
        dataType: 'string',
        dataIndx: 'email',
        editable: false,
        align: 'center',
      },
      {
        title: 'Position',
        width: 100,
        dataType: 'string',
        dataIndx: 'position',
        editable: false,
        align: 'center',
      },
      {
        title: 'Approved',
        width: 100,
        dataType: 'bool',
        align: 'center',
        dataIndx: 'approve',
        editor: false,
        type: 'checkbox',
        validations: [{ type: 'nonEmpty', msg: 'Required' }],
        render: function (ui) {
          if (ui.rowData.approve === true) {
            return "<div> <input type='checkbox' checked='checked' disabled></div>";
          } else {
            return "<div> <input type='checkbox' disabled></div>";
          }
        },
      },
    ],
  };
  dataAccount: any[] = [];

  ngOnInit() {
    this.getAllAccount();
  }
  getAllAccount = () => {
    this.service.RequestShowListUSer().subscribe((data: any) => {
      this.dataAccount = data;
      console.log('check ', this.dataAccount);
    });
  };
}
