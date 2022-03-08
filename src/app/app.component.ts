import { Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularFE';
  constructor() {
    console.log("APP CONSTRUCTOR");
  }

  ngOnInit(): void {
    console.log("APP INIT");
  }
}
