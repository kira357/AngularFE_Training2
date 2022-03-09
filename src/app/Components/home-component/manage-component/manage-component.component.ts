import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '@app/Services/api-service.service';

@Component({
  selector: 'app-manage-component',
  templateUrl: './manage-component.component.html',
  styleUrls: ['./manage-component.component.css'],
})
export class ManageComponentComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: ApiServiceService
  ) {}

  check: any;

  setting = {
    width: 85,
    editable: false,
  };

  dataAccount: any[] = [];

  ngOnInit() {
    this.GetAllAccount();
  }

  GetAllAccount = () => {
    this.service.RequestShowListUSer().subscribe((data: any) => {
      this.dataAccount = data;
      console.log('check ', this.dataAccount);
    });
  };
}
