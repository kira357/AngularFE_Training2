import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css'],
})
export class HomeComponentComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  check: any;
  ngOnInit() {
    // console.log(this.router.getCurrentNavigation().extras.state.data)
    console.log("snap shot",this.activatedRoute.snapshot.data);
  }
}
