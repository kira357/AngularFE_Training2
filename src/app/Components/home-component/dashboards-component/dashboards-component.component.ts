import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ApiServiceService } from '@app/Services/api-service.service';
import pq from 'pqgridf';
import 'pqgridf/localize/pq-localize-en.js';

@Component({
  selector: 'app-dashboards-component',
  templateUrl: './dashboards-component.component.html',
  styleUrls: ['./dashboards-component.component.css'],
})
export class DashboardsComponentComponent implements OnInit, OnChanges {
  grid: pq.gridT.instance;
  constructor(
    public el: ElementRef,
    public renderer: Renderer2,
    private service: ApiServiceService
  ) {}
  ngOnChanges(): void {
    this.CreateGrid();
  }

  @Input() dataAccount: any[] = [];
  @Input() settingOptions: any = {};
  newData: any[] = [];

  ngOnInit() {}

  columns1 = [
    {
      title: 'Full Name',
      width: this.settingOptions.width,
      dataType: 'string',
      dataIndx: 'name',
      editable: this.settingOptions.editable,
      align: 'center',
    },
    {
      title: 'User Name',
      width: this.settingOptions.width,
      dataType: 'string',
      dataIndx: 'userName',
      editable: this.settingOptions.editable,
      align: 'center',
    },
    {
      title: 'Email',
      width: this.settingOptions.width,
      dataType: 'string',
      dataIndx: 'email',
      editable: this.settingOptions.editable,
      align: 'center',
    },
    {
      title: 'Position',
      width: this.settingOptions.width,
      dataType: 'string',
      dataIndx: 'position',
      editable: this.settingOptions.editable,
      align: 'center',
    },
    {
      title: 'Approved',
      width: this.settingOptions.width,
      dataType: 'bool',
      align: 'center',
      dataIndx: 'approve',
      editor: this.settingOptions.editable,
      type: 'checkbox',
      validations: [{ type: 'nonEmpty', msg: 'Required' }],
    },
    {
      title: 'Options',
      editable: this.settingOptions.editable,
      sortable: false,
      align: 'center',
      render: function (ui) {
        return (
          "<div> <button type='button' class='update_btn btn btn-primary mr-1'>Update</button>" +
          "<button type='button' class='delete_btn btn btn-success'>Detele</button>" +
          '</div>'
        );
      },
      postRender: function (ui) {
        var rowIndx = ui.rowIndx,
          grid = this,
          $cell = grid.getCell(ui);

        $cell.find('button').bind('click', function () {
          grid.addClass({ rowIndx: ui.rowIndx, cls: 'pq-row-delete' });

          var ans = window.confirm(
            'Are you sure to delete row No ' + (rowIndx + 1) + '?'
          );
          grid.removeClass({ rowIndx: rowIndx, cls: 'pq-row-delete' });
          if (ans) {
            grid.deleteRow({ rowIndx: rowIndx });
          }
        });
      },
    },
  ];
  options = {
    showTop: false,
    height: 500,
    numberCell: {
      show: false,
    },
    scrollModel: {
      autoFit: true,
    },
    columnTemplate: { width: 200 },
    colModel: this.columns1,
    dataModel: {
      data: this.newData,
    },
    bootstrap: {
      on: true,
      thead: 'table table-striped table-condensed table-bordered ',
      tbody: 'table table-striped table-condensed table-bordered',
    },
  };
  CreateGrid = () => {
    this.newData = this.dataAccount;
    if (!this.grid) {
      this.grid = pq.grid(this.el.nativeElement.children[0], this.options);
    }
    if (this.grid) {
      this.grid.options.dataModel.data = this.newData;
      console.log('check 1 ', this.newData);
      this.grid.refreshDataAndView();
    }
  };
}
