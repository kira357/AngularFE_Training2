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
    this.service
      .RequestLogin(this.userLogin.getRawValue())
      .subscribe((data: any) => {
        console.log(data); // {userName: "admin", password: "admin"}
        if (data.ok === 'Admin') {
          this.router.navigate(['/home'], { state: data.ok });
          this.cookieService.set('user', data.ok);
          this.cookieService.set(
            'username',
            this.userLogin.getRawValue().userName
          );
          this.matSnackBar.open('login with permission: admin ', 'Okay!', {
            duration: 5000,
            horizontalPosition: 'center',
            panelClass: ["snack-style"],
            verticalPosition: 'top',
          });
        }
        if (data.ok === 'Member' && data.active) {
          this.router.navigate(['/employee'], { state: data.ok });
          this.cookieService.set('user', data.ok);
          this.cookieService.set(
            'username',
            this.userLogin.getRawValue().userName
          );
          console.log('check 2', data.ok);
          this.matSnackBar.open('login success', 'Okay!', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        } else if (!data.active) {
          this.matSnackBar.open(
            'Login fail, you dont have permission to login',
            'Okay!',
            {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
        }
      });
  };
  ngOnInit() {}
}
