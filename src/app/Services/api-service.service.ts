import { retry } from 'rxjs';
import { User } from './../Common/User';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  readonly rootURL = 'http://localhost:5000/api/Autho';

  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  RequestShowListUSer = () => {
    return this.http.get(this.rootURL + '/getall');
  };
  RequestRegister = (User: any) => {
    return this.http
      .post(`${this.rootURL}/register`, User, { headers: this.headers })
      .pipe(retry(2));
  };
  RequestLogin = (User: any) => {
    return this.http.post(`${this.rootURL}/login`, User);
  };
  RequestApprove = (User: any) => {
    return this.http.put(`${this.rootURL}/update_approved`, User);
  };
  RequestDetele = (User: any) => {
    return this.http.delete(`${this.rootURL}/detele_account`, {headers: this.headers, body: User});
  };
}
