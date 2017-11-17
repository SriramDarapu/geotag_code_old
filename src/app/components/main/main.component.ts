import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  userData: any;

  constructor() { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

}
