import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Common/User';
import { ApiServiceService } from './../../Services/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent implements OnInit {
  constructor(
    public service: ApiServiceService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  newuser: User = {
    userName: '',
    password: '',
    email: '',
    approve: false,
  };
  
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
        if (data.ok === 'Admin') {
          this.router.navigate(['/home'], { state: data.ok });
          localStorage.setItem('Admin', data.ok);
   
          console.log('check 1 ', data.ok);
        }
        if (data.ok === 'Member') {
          this.router.navigate(['/home'], { state: data.ok });
          localStorage.setItem('Member', data.ok);
          console.log('check 2', data.ok);
        }
      });
  };
  ngOnInit() {}
}
