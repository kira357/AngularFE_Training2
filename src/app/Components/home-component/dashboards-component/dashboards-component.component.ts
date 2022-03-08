import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
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
  ngOnChanges(changes: SimpleChanges): void {
    this.CreateGrid();
  }

  ngOnInit() {
    this.getAllAccount();
  }

  data1: any[] = [];
  getAllAccount = () => {
    this.service.RequestShowListUSer().subscribe((data: any) => {
      this.data1 = data;
    });
  };

  columns1 = [
    {
      title: 'Month',
      width: 50,
      dataType: 'string',
      dataIndx: 'month',
      editable: false,
      align: 'center',
    },
    {
      title: 'Capacity',
      width: 50,
      dataType: 'integer',
      dataIndx: 'capacity',
      align: 'center',
    },
    {
      title: 'Discontinued',
      width: 100,
      dataType: 'bool',
      align: 'center',
      dataIndx: 'Discontinued',
      editor: false,
      type: 'checkbox',
      validations: [{ type: 'nonEmpty', msg: 'Required' }],
    },
  ];
  options = {
    showTop: false,
    height: 600,
    numberCell: {
      show: false,
    },
    scrollModel: {
      autoFit: true,
    },
    columnTemplate: { width: 100 },
    colModel: this.columns1,
    dataModel: {
      data: this.data1,
    },
    bootstrap: {
      on: true,
    },
  };

  CreateGrid = () => {
    if (!this.grid) {
      this.grid = pq.grid(this.el.nativeElement.children[0], this.options);
    }
    if (this.grid) {
      this.grid.options.dataModel.data = this.data1;
      this.grid.refreshDataAndView();
    }
  };
}
