import { ApiServiceService } from '@app/Services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-jobs',
  templateUrl: './detail-jobs.component.html',
  styleUrls: ['./detail-jobs.component.css'],
})
export class DetailJobsComponent implements OnInit {
  constructor(
    private _Activatedroute: ActivatedRoute,
    private service: ApiServiceService
  ) {}

  sub: any;
  id;
  getData: any;
  ngOnInit() {
    this.sub = this._Activatedroute.paramMap.subscribe((params) => {
      console.log(params);
      this.id = params.get('id');
      this.service.RequestShowDetailJobs(this.id).subscribe((data) => {
        this.getData = data;
        console.log(this.getData);
      });
      // let products = this._productService.getProducts();
      // this.product = products.find((p) => p.productID == this.id);
    });
  }
}
