import { Guid } from 'js-guid';
import { Jobs } from './../../../../Common/Jobs';
import { Company } from './../../../../Common/Company';
import {
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validator,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '@app/Services/api-service.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { User } from '@app/Common/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DatePipe } from '@angular/common';

export interface PeriodicElement {
  nameCompany: string;
  type: string;
  address: string;
  fromDay: string;
  toDay: string;
  choose_img: string;
  date: string;
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

  Company: Company[] = [
    {
      id: '',
      name: '',
      type: '',
      address: '',
      dateWork: '',
      logo: '',
      imageSrc: '',
    },
  ];
  JobsObject: Jobs = {
    id: '',
    idEmployee: '',
    idCompany: '',
    name: '',
    tag: '',
    dateExpire: '',
    descriptions: '',
    imageSrc: '',
    active: false,
  };

  defaultImageSrc = '/assets/image/default-image.png';
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

  dropdownSettings: IDropdownSettings = {};
  imageFile: { link: any; file: any; name: string };

  onItemSelect(item: any) {
    console.log('123', item);
  }
  onSelectAll(items: any) {
    console.log('456', items);
  }
  handleChange = (evt) => {
    if (evt.target.files && evt.target.files[0]) {
      const file = evt.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageFile = {
          link: e.target.result,
          file: evt.srcElement.files[0],
          name: evt.srcElement.files[0].name,
        };
      };
      reader.readAsDataURL(file);
    } else {
      this.imageFile = {
        link: this.defaultImageSrc,
        file: null,
        name: '',
      };
    }
  };

  Form: any;
  displayedColumns: string[] = [];
  dataSource: any;
  selection: any;
  descriptions: any;

  employeeCreated = this.formBuilder.group({
    name: ['', Validators.required],
    tag: ['', Validators.required],
    imageFile: '',
    dateExpire: ['', Validators.required],
  });

  editor = ClassicEditor;
  ngOnInit() {
    this.GetListPost();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  GetListPost = () => {
    this.displayedColumns = [
      'logo',
      'name',
      'address',
      'type',
      'dateWork',
      'active',
      'options',
    ];
    this.service.RequestShowListCompany().subscribe((data: any) => {
      this.Company = data;
      console.log('dataAccount', this.Company);
      this.dataSource = new MatTableDataSource<Company>(this.Company);
      this.selection = new SelectionModel<Company>(true, []);
    });
  };

  newForm: any;
  datePipe: DatePipe = new DatePipe('en-US');
  currentDate = new Date();
  dateExpire: any;

  onSubmit = () => {
    this.newForm = this.employeeCreated.getRawValue();
    console.log('before', this.newForm);
    let newDateExpire = new Date(this.dateExpire);
    let newTag = this.newForm.tag.join(',');
    let test = Math.floor(
      (Date.UTC(
        newDateExpire.getFullYear(),
        newDateExpire.getMonth(),
        newDateExpire.getDate()
      ) -
        Date.UTC(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth(),
          this.currentDate.getDate()
        )) /
        (1000 * 60 * 60 * 24)
    );
    console.log('test', this.currentDate.toString());
    if (this.JobsObject.idCompany !== '00000000-0000-0000-0000-000000000000') {
      this.newForm = Object.assign(this.newForm, {
        descriptions: this.descriptions,
        daysLeft: test,
        active: false,
        idCompany: this.JobsObject.idEmployee,
      });
      this.newForm = {
        ...this.newForm,
        tag: newTag,
      };
      this.Form = JSON.stringify(this.newForm);
      console.log('newForm', this.newForm);

      this.service.RequestCreateJobs(this.newForm).subscribe((data: any) => {
        this.infoRegister = data;
        console.log(this.infoRegister);
        if (data.ok === 'Success') {
          console.log('check', this.infoRegister);
          this.matSnackBar.open('Create Employee success', 'Okay!', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snack-success'],
          });
        }
      });
    }
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
  handleClick = (row) => {
    console.log(row);
    this.JobsObject = {
      id: '',
      idEmployee: row.idEmployee,
      idCompany: row.id,
      name: row.name,
      tag: '',
      descriptions: '',
      dateExpire: '',
      active: false,
      imageSrc: row.imageSrc,
    };
    this.imageFile = {
      file: row.name,
      link: row.imageSrc,
      name: row.name,
    };
  };

  onChange = (evt) => {
    this.descriptions = evt.editor.getData();
    console.log('descriptions', evt.editor.getData());
  };
}
