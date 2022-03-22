import {
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '@app/Services/api-service.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { User } from '@app/Common/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export interface PeriodicElement {
  nameCompany: string;
  type: string;
  address: string;
  fromDay: string;
  toDay: string;
  choose_img: string;
}
export interface PeriodicElement2 {
  logo: string;
  nameCompany: string;
  address: string;
  jobs: string;
}

@Component({
  selector: 'app-employee-managment-jobs',
  templateUrl: './employee-managment-jobs.component.html',
  styleUrls: ['./employee-managment-jobs.component.css'],
})
export class EmployeeManagmentJobsComponent implements OnInit {
  constructor(
    private service: ApiServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}
  @ViewChild(MatTable) table: MatTable<User>;

  // user: User = {
  //   nameEmployee: '',
  //   postionEmployee: '',
  //   email: '',
  //   id: '',
  //   address: '',
  //   user: '',
  // };
  // user1: User[] = [
  //   {
  //     nameEmployee: '',
  //     postionEmployee: '',
  //     email: '',
  //     id: '',
  //     address: '',
  //     user: '',
  //   },
  // ];
  user2: PeriodicElement = {
    nameCompany: '',
    type: '',
    address: '',
    fromDay: '',
    toDay: '',
    choose_img: '',
  };

  employee1: PeriodicElement2[] = [
    {
      logo: '123',
      nameCompany: '123',
      address: '123',
      jobs: '123',
    },
  ];

  check: any;
  infoRegister: any[] = [];
  dataAccount: any[] = [];
  listFromDay: any[] = [
    'mondays',
    'tuesdays',
    'wednesdays',
    'thursdays',
    'fridays',
    'saturdays',
    'sundays',
  ];
  listToDay: any[] = [
    'mondays',
    'tuesdays',
    'wednesdays',
    'thursdays',
    'fridays',
    'saturdays',
    'sundays',
  ];
  listTagJobs: any[] = [
    'C#',
    'Java',
    'PHP',
    'C++',
    'Python',
    'JavaScript',
    'Ruby',
    'Swift',
    'Objective-C',
    'Go',
    'C',
    'R',
  ];
  listType: any[] = ['Product', 'out source'];

  Form: any;
  displayedColumns: string[] = [];
  dataSource: any;
  selection: any;
  status: any;

  employeeCreated = this.formBuilder.group({
    nameCompany: '',
    tag : '',

  });
  toppings = new FormControl();

  editor = ClassicEditor;
  ngOnInit() {
    // this.GetAllEmployee();
    this.GetListPost();
  }

  // GetAllEmployee = async () => {
  //   this.displayedColumns = [
  //     'nameEmployee',
  //     'email',
  //     'address',
  //     'postionEmployee',
  //     'user',
  //     'option',
  //   ];
  //   this.service.RequestShowListEmployee().subscribe((data: any) => {
  //     this.dataAccount = data;
  //     this.user1 = data;
  //     console.log('dataEmployee', this.user1);
  //     this.user1.map((x) =>
  //       x.user === null ? (x.user = 'No account') : (x.user = 'Has account')
  //     );
  //     console.log('acc', this.user1);

  //     this.dataSource = new MatTableDataSource<User>(this.user1);
  //     this.selection = new SelectionModel<User>(true, []);
  //   });
  // };

  GetListPost = () => {
    this.displayedColumns = [
      'logo',
      'nameCompany',
      'address',
      'jobs',
      'active',
      'options',
    ];
    // this.service.RequestShowListUSer().subscribe((data: any) => {
    //   this.dataAccount = data;
    //   this.employee1 = data;
    //   console.log('dataAccount', this.employee1);
    // });
    this.dataSource = new MatTableDataSource<PeriodicElement2>(this.employee1);
    this.selection = new SelectionModel<PeriodicElement2>(true, []);
  };

  newForm: any;
  onSubmit = () => {
    this.newForm = this.employeeCreated.getRawValue();
    this.newForm = Object.assign(this.newForm, { user: this.status });

    this.Form = JSON.stringify(this.newForm);
    console.log('Form', this.newForm);
    // this.service.RequestCreateEmployee(this.Form).subscribe((data: any) => {
    //   this.infoRegister = data;
    //   console.log(this.infoRegister);
    //   if (data.ok === 'Success') {
    //     console.log('check', this.infoRegister);
    //     this.matSnackBar.open('Create Employee success', 'Okay!', {
    //       duration: 5000,
    //       horizontalPosition: 'center',
    //       verticalPosition: 'top',
    //       panelClass: ['snack-success'],
    //     });
    //   }
    // });
  };

  // onReset = () => {
  //   this.user = {
  //     nameEmployee: '',
  //     postionEmployee: '',
  //     email: '',
  //     id: '',
  //     address: '',
  //     user: '',
  //   };
  // };

  newRow: any = {};
  arrayTrue: any[] = [];
  arrayFalse: any[] = [];
  arrayApprove: any[] = [];

  result: any;

  // CheckCheck = (evt, row) => {
  //   this.newRow = Object.assign({}, row, { approve: evt.checked });
  //   if (evt.checked) {
  //     this.arrayTrue.push(this.newRow);
  //     console.log('arrayTrue', this.arrayTrue);
  //   } else {
  //     let el = this.arrayTrue.find((itm) => itm.email === row.email);
  //     if (el) {
  //       this.arrayTrue.splice(this.arrayTrue.indexOf(el), 1);
  //     }
  //   }
  //   console.log('changedPermissions', this.arrayTrue);
  // };
  // getRowClick = async (evt) => {
  //   this.user = {
  //     nameEmployee: evt.nameEmployee,
  //     postionEmployee: evt.postionEmployee,
  //     email: evt.email,
  //     id: '',
  //     address: evt.address,
  //     user: evt.user,
  //   };
  //   console.log('getRow', this.user);
  // };

  // onUpdate = () => {
  //   this.Form = JSON.stringify(this.employeeCreated.getRawValue());
  //   console.log('Form', this.Form);
  //   this.service.RequestUpdateEmployee(this.Form).subscribe((data: any) => {
  //     this.result = data;
  //     console.log('result', this.result);
  //     if (data.ok === 'Success') {
  //       console.log('check', this.result);
  //       this.matSnackBar.open('Update Employee success', 'Okay!', {
  //         duration: 5000,
  //         horizontalPosition: 'center',
  //         verticalPosition: 'top',
  //         panelClass: ['snack-success'],
  //       });
  //       this.table.renderRows();
  //     }
  //   });
  // };

  // removeData = () => {
  //   console.log('arrayTrue', this.arrayTrue);
  //   this.service.RequestDeteleEmployee(this.arrayTrue).subscribe(
  //     (data: any) => {
  //       this.result = data;
  //       console.log('result', this.result);
  //       if (data.ok === 'Success') {
  //         console.log('check', this.result);
  //         this.matSnackBar.open('Delete Employee success', 'Okay!', {
  //           duration: 5000,
  //           horizontalPosition: 'center',
  //           verticalPosition: 'top',
  //           panelClass: ['snack-success'],
  //         });
  //         this.table.renderRows();
  //       }
  //     },
  //     (err) => {
  //       this.matSnackBar.open('Delete Employee fail', 'Okay!', {
  //         duration: 5000,
  //         horizontalPosition: 'center',
  //         verticalPosition: 'top',
  //         panelClass: ['snack-fails'],
  //       });
  //     }
  //   );
  // };
  onChange = (evt) => {
    this.status = evt.editor.getData();
    console.log('status', evt.editor.getData());
  };
}
