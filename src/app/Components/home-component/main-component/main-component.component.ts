import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '@app/Services/api-service.service';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css'],
})
export class MainComponentComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: ApiServiceService
  ) {}

  check: any;
  settingOptions: any;
  setting = {
    width: 100,
    editable: false,
  };
  dataAccount: any[] = [];

  ngOnInit() {
    this.getAllAccount();
  }
  getAllAccount = () => {
    this.service.RequestShowListUSer().subscribe((data: any) => {
      this.dataAccount = data;
      console.log('check ', this.dataAccount);
    });
  };
}
