import { retry } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  readonly rootURL = 'http://localhost:5000/api/Autho';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  RequestShowListUSer = () => {
    return this.http.get(this.rootURL + '/getall');
  };

  RequestShowListEmployee = () => {
    return this.http.get(this.rootURL + '/getallemployee');
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
    return this.http.delete(`${this.rootURL}/detele_account`, {
      headers: this.headers,
      body: User,
    });
  };

  RequestCreateEmployee = (User: any) => {
    return this.http.post(`${this.rootURL}/create_employee`, User, {
      headers: this.headers,
    });
  };
  RequestUpdateEmployee = (User: any) => {
    return this.http.put(`${this.rootURL}/update_employee`, User, {
      headers: this.headers,
    });
  };

  RequestDeteleEmployee = (User: any) => {
    return this.http.delete(`${this.rootURL}/detele_employee`, {
      headers: this.headers,
      body: User,
    });
  };

  RequestShowInformation = (User: any) => {
    return this.http.post(`${this.rootURL}/get_information`, {
      headers: this.headers,
      body: User,
    });
  };
}
