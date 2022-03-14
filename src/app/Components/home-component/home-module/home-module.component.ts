import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiServiceService } from '../../../Services/api-service.service';
@Component({
  selector: 'app-home-module',
  templateUrl: './home-module.component.html',
  styleUrls: ['./home-module.component.css'],
})
export class HomeModuleComponent implements OnInit {
  constructor(
    public service: ApiServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService,
    private matSnackBar: MatSnackBar
  ) {}

  check: any;
  ngOnInit() {}

  handleLogout = () => {
    if (this.cookieService.check('user')) {
      this.cookieService.delete('user');
      this.cookieService.delete('username');
    }
  };
}
