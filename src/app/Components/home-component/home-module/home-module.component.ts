import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activatedRoute: ActivatedRoute
  ) {}

  check: any;
  ngOnInit() {}

  handleLogout = () => {
    if (localStorage.getItem('Admin')) {
      localStorage.removeItem('Admin');
      this.router.navigate(['/login']);
    }
    if (localStorage.getItem('Member')) {
      localStorage.removeItem('Member');
      this.router.navigate(['/login']);
    }
  };
}
