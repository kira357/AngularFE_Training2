import {
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '@app/Services/api-service.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { User } from '@app/Common/User';

@Component({
  selector: 'app-dashboardsEmployee-component',
  templateUrl: './dashboardsEmployee-component.component.html',
  styleUrls: ['./dashboardsEmployee-component.component.css'],
})
export class DashboardsEmployeeComponentComponent implements OnInit {
  constructor(
    private service: ApiServiceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  @ViewChild(MatTable) table: MatTable<User>;

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
    this.displayedColumns = [
      'nameEmployee',
      'email',
      'address',
      'postionEmployee',
      'user',
    ];
    this.service.RequestShowListEmployee().subscribe((data: any) => {
      this.dataAccount = data;
      this.user1 = data;
      console.log('dataEmployee', this.user1);
      this.user1.map((x) =>
        x.user === null ? (x.user = 'No account') : (x.user = 'Has account')
      );
      console.log('acc', this.user1);

      this.dataSource = new MatTableDataSource<User>(this.user1);
      this.selection = new SelectionModel<User>(true, []);
    });
  };
}
