import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root',
})
export class LoginActivateServiceService implements CanActivate {
  constructor(
    private service: ApiServiceService,
    private router: Router,
    private cookieService: CookieService
  ) {}
  getUser: any;
  getUserName: any;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.getUser = this.cookieService.check('username');
    if (!this.getUser) {
      return this.router.navigate(['login']);
    }
    return true;
  }
}
