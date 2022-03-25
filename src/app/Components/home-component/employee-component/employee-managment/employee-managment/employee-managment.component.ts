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
import { Jobs } from '@app/Common/Jobs';

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

  Company: Company[] = [
    {
      id: '',
      name: '',
      type: '',
      address: '',
      dateWork: '',
      fromDay: '',
      toDay: '',
      logo: '',
      imageSrc: '',
      descriptions: '',
    },
  ];

  JobsObject: Jobs = {
    id: '',
    idEmployee: '',
    idCompany: '',
    name: '',
    nameCompany: '',
    tag: '',
    dateExpire: '',
    descriptions: '',
    imageSrc: '',
    active: false,
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
    this.GetListPost();
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
      this.Company = data.dataCompany;
      console.log('dataAccount', this.Company);
      this.dataSource = new MatTableDataSource<Company>(this.Company);
      this.selection = new SelectionModel<Company>(true, []);
    });
  };

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
    fromDay: '',
    toDay: '',
    logo: '',
    descriptions: '',
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

  onReset = () => {};

  result: any;

  onChange = (evt) => {
    this.descriptions = evt.editor.getData();
    console.log('descriptions', evt.editor.getData());
  };

  onClickDelete = (id: any) => {
    this.service.RequestDeleteCompany(id).subscribe((data: any) => {
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
      }
    });
  };
  newData: any;
  handleClick = (row) => {
    let seperateDay = row.dateWork.split('-');

    console.log(row);
    this.data = {
      id: '',
      descriptions: row.descriptions,
      fromDay: seperateDay[0],
      toDay: seperateDay[1],
      name: row.name,
      type: row.type,
      address: row.address,
      dateWork: '',
      logo: '',
      imageSrc: row.imageSrc,
    };

    console.log('newData', this.newData);
    this.imageFile = {
      file: row.name,
      link: row.imageSrc,
      name: row.name,
    };
  };
}
