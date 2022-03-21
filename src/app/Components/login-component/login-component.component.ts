import { CookieService } from 'ngx-cookie-service';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ApiServiceService } from './../../Services/api-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent implements OnInit {
  constructor(
    public service: ApiServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private matSnackBar: MatSnackBar
  ) {}

  userLogin = this.formBuilder.group({
    userName: '',
    password: '',
  });

  onSubmit = () => {
    console.log(this.userLogin.getRawValue());
    this.userLogin.getRawValue();
    this.service.RequestLogin(this.userLogin.getRawValue()).subscribe(
      (data: any) => {
        console.log(data); // {userName: "admin", password: "admin"}
        if (data.ok === 'Admin') {
          this.cookieService.set('user', data.ok);
          this.cookieService.set(
            'username',
            this.userLogin.getRawValue().userName
          );
          this.matSnackBar.open('login with permission: admin ', 'Okay!', {
            duration: 5000,
            horizontalPosition: 'center',
            panelClass: ['snack-success'],
            verticalPosition: 'top',
          });
          this.router.navigate(['/home'], { state: data.ok });
        }
        if (data.ok === 'Member') {
          if (data.active) {
            this.cookieService.set('user', data.ok);
            this.cookieService.set(
              'username',
              this.userLogin.getRawValue().userName
            );
            console.log('check 2', data.ok);
            this.matSnackBar.open('login success', 'Okay!', {
              duration: 5000,
              horizontalPosition: 'center',
              panelClass: ['snack-success'],
              verticalPosition: 'top',
            });
            this.router.navigate(['/employee'], { state: data.ok });
          } else {
            this.matSnackBar.open('You need to allow permission', 'Okay!', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['snack-fails'],
            });
          }
        }
        if (data.fail === 'user name is wrong ') {
          this.matSnackBar.open('User name is wrong', 'Okay!', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snack-fails'],
          });
        }
        if (this.userLogin.value.userName === '' && this.userLogin.value.password === '') {
          this.matSnackBar.open('User name or password is empty', 'Okay!', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snack-fails'],
          });
        }
      },
      (error) => {
        this.matSnackBar.open('Login fail', 'Okay!', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snack-fails'],
        });
      }
    );
  };
  ngOnInit() {}
}
