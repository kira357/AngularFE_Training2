import { Guid } from 'js-guid';
import { Observable, retry } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  readonly rootURL = 'http://localhost:5000/api/Autho';
  readonly rootURLCompany = 'http://localhost:5000/api/Company';

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

  RequestShowInformation = async (username: string) => {
    return this.http.post(
      `${this.rootURL}/get_information`,
      { username },
      { headers: this.headers }
    );
  };

  RequestCreateCompany = (Company: any) => {
    let newHeader = new Headers();
    return this.http.post(`${this.rootURLCompany}/create_company`, Company, {});
  };
  RequestShowListCompany = () => {
    return this.http.get(`${this.rootURLCompany}/get_company`, {
      headers: this.headers,
    });
  };
  RequestCreateJobs = (Jobs: any) => {
    return this.http.post(`${this.rootURLCompany}/create_jobs`, Jobs, {
      headers: this.headers,
    });
  };

  RequestShowListJobs = () => {
    return this.http.get(`${this.rootURLCompany}/get_jobs`, {
      headers: this.headers,
    });
  };
  RequestDeleteJob = (id: string) => {
    return this.http.delete(`${this.rootURLCompany}/delete_jobs/${id}`, {});
  };
}
