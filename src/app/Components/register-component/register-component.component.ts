import { User } from './../../Common/User';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { ApiServiceService } from './../../Services/api-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css'],
})
export class RegisterComponentComponent implements OnInit {
  constructor(
    public service: ApiServiceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  user: User = {
    email: '',
    userName: '',
    password: '',
    approve: false,
  };
  infoRegister: any[] = [];

  userLogin = this.formBuilder.group({
    username: '',
    password: '',
    email: '',
    name: '',
    position: 'memeber',
    approve: false,
  });
  formUser: any;
  onSubmit() {
    this.formUser = this.userLogin.getRawValue();

    console.log(this.formUser);

    this.service.RequestRegister(this.formUser).subscribe((data: any) => {
      this.infoRegister = data;
      console.log(this.infoRegister);
      if (data.ok === 'Success') {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {}
}
