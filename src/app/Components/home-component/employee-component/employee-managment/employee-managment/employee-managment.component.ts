import { Company } from './../../../../../Common/Company';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-employee-managment',
  templateUrl: './employee-managment.component.html',
  styleUrls: ['./employee-managment.component.css'],
})
export class EmployeeManagmentComponent implements OnInit {
  constructor(
    private service: ApiServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private cookieService: CookieService
  ) {}
  @ViewChild(MatTable) table: MatTable<User>;
  defaultImageSrc = '/assets/image/default-image.png';
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
  user2: Company = {
    id: '',
    name: '',
    type: '',
    address: '',
    dateWork: '',
    logo: '',
    imageSrc: '',
  };

  check: any;
  infoCreate: any[] = [];
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
  listType: any[] = ['Product', 'out source'];

  Form: any;
  displayedColumns: string[] = [];
  dataSource: any;
  selection: any;
  descriptions: any;

  editor = ClassicEditor;
  ngOnInit() {
    // this.GetAllEmployee();
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

  newForm: any;
  combDate: any;
  cookieValue: string;
  imageFile: { link: any; file: any; name: string };
  files: any[] = [];
  handleChange = (evt) => {
    if (evt.target.files && evt.target.files[0]) {
      this.files = evt.target.files;
      let file1 = <File>evt.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file1);
      reader.onload = (e) => {
        this.imageFile = {
          link: reader.result,
          file: this.files,
          name: evt.srcElement.files[0].name,
        };
        console.log('link: ', this.imageFile.file);
      };
    } else {
      this.imageFile = {
        link: this.defaultImageSrc,
        file: null,
        name: '',
      };
    }
  };
  data: Company = {
    id: '',
    name: '',
    type: '',
    address: '',
    dateWork: '',
    logo: '',
    imageSrc: '',
  };
  employeeCreated = this.formBuilder.group({
    name: '',
    type: '',
    address: '',
    fromDay: '',
    toDay: '',
    imageFile: '',
  });
  formData = new FormData();
  onSubmit = (data) => {
    this.newForm = this.employeeCreated.getRawValue();
    this.combDate = `${this.newForm.fromDay}-${this.newForm.toDay}`;
    this.cookieValue = this.cookieService.get('id');

    for (const file of this.files) {
      this.formData.append('name', data.name);
      this.formData.append('imageFile', file, file.name);
      this.formData.append('type', data.type);
      this.formData.append('address', data.address);
      this.formData.append('dateWork', this.combDate);
      this.formData.append('idEmployee', this.cookieValue);
      this.formData.append('descriptions', this.descriptions);
    }

    this.newForm = Object.assign(this.newForm, {
      descriptions: this.descriptions,
      dateWork: this.combDate,
      idUser: this.cookieValue,
    });
    this.Form = JSON.stringify(this.newForm);
    console.log('Form', this.formData);

    this.service.RequestCreateCompany(this.formData).subscribe((data: any) => {
      this.infoCreate = data;
      if (data.ok === 'Success') {
        console.log('check', this.infoCreate);
        this.matSnackBar.open('Create Employee success', 'Okay!', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snack-success'],
        });
      }
    });
  };

  onReset = () => {
    this.user = {
      nameEmployee: '',
      postionEmployee: '',
      email: '',
      id: '',
      address: '',
      user: '',
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
      console.log('arrayTrue', this.arrayTrue);
    } else {
      let el = this.arrayTrue.find((itm) => itm.email === row.email);
      if (el) {
        this.arrayTrue.splice(this.arrayTrue.indexOf(el), 1);
      }
    }
    console.log('changedPermissions', this.arrayTrue);
  };
  getRowClick = async (evt) => {
    this.user = {
      nameEmployee: evt.nameEmployee,
      postionEmployee: evt.postionEmployee,
      email: evt.email,
      id: '',
      address: evt.address,
      user: evt.user,
    };
    console.log('getRow', this.user);
  };
  onUpdate = () => {
    this.Form = JSON.stringify(this.employeeCreated.getRawValue());
    console.log('Form', this.Form);
    this.service.RequestUpdateEmployee(this.Form).subscribe((data: any) => {
      this.result = data;
      console.log('result', this.result);
      if (data.ok === 'Success') {
        console.log('check', this.result);
        this.matSnackBar.open('Update Employee success', 'Okay!', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snack-success'],
        });
        this.table.renderRows();
      }
    });
  };
  removeData = () => {
    console.log('arrayTrue', this.arrayTrue);
    this.service.RequestDeteleEmployee(this.arrayTrue).subscribe(
      (data: any) => {
        this.result = data;
        console.log('result', this.result);
        if (data.ok === 'Success') {
          console.log('check', this.result);
          this.matSnackBar.open('Delete Employee success', 'Okay!', {
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
  onChange = (evt) => {
    this.descriptions = evt.editor.getData();
    console.log('descriptions', evt.editor.getData());
  };
}
