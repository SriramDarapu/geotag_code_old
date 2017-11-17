import { Component, VERSION } from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core';
import { SharedDataService } from './services/shared-data.service';

@Component({
  selector: 'solution-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  private ngVersion: string = VERSION.full;
  private isDarkThemeActive:boolean;

  constructor(private readonly _sharedDataService: SharedDataService) {    
    this._sharedDataService.OnThemeSwitch.subscribe( value => {
      this.isDarkThemeActive = value;
    });
  }

  ngOnInit(){
  }

  ngAfterViewInit() {
  }

} // End of class:AppComponent 