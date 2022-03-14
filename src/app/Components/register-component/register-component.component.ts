import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { ApiServiceService } from './../../Services/api-service.service';
import { Router } from '@angular/router';
import { Guid } from 'js-guid';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css'],
})
export class RegisterComponentComponent implements OnInit {
  constructor(
    public service: ApiServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}

  infoRegister: any[] = [];

  userLogin = this.formBuilder.group({
    username: '',
    password: '',
    email: '',
    name: '',
    position: 'Member',
    idemployee: Guid.newGuid().toString(),
    approve: false,
  });

  formUser: any;
  onSubmit() {
    this.formUser = this.userLogin.getRawValue();

    console.log(this.formUser);

    this.service.RequestRegister(this.formUser).subscribe(
      (data: any) => {
        this.infoRegister = data;
        console.log(this.infoRegister);
        if (data.ok === 'Success') {
          this.matSnackBar.open('Create success', 'Okay!', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snack-success'],
          });
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        this.matSnackBar.open('Delete Employee fail', 'Okay!', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snack-fails'],
        });
      }
    );
  }

  ngOnInit() {}
}
