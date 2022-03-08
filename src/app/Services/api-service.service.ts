import { User } from './../Common/User';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  readonly rootURL = 'http://localhost:5000/api/Autho';

  constructor(private http: HttpClient) {}

  RequestShowListUSer = () => {
    return this.http.get(this.rootURL + '/getall');
  };
  RequestRegister = (User: any) => {
    return this.http.post(`${this.rootURL}/register`, User);
  };
  RequestLogin = (User: any) => {
    return this.http.post(`${this.rootURL}/login`, User);
  };
  RequestApprove = (User: any) => {
    return this.http.post(`${this.rootURL}/approve`, User);
  };
}
