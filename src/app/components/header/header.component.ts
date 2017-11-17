import { Component, Input, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { SharedDataService } from './../../services/shared-data.service';
import { UserDataService } from '../../services/userData.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'solution-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  showId = false;
  // -----------------------------------------------------------------------//
  title = 'GeoTag';
  @Input() angularVersion: string = '';
  @Input() materialVersion: string = ''; 
  // -----------------------------------------------------------------------//
  constructor(
    private readonly _sharedDataService: SharedDataService,
    private userDataService: UserDataService,
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoggedIn = this.userDataService.getRegisteredToken();
    // this.userDataService.subject.subscribe(
    //   (data) => {  
    //     this.isLoggedIn = data;
    //   }
    // );
    if (localStorage.getItem('loginSession') === "true") {
      this.isLoggedIn = true;
    }
  }

  ngOnInit() {
    this.router.events.subscribe((event : Event) => {
      if(event instanceof NavigationStart) {
         //An event triggered when navigation starts.
        if (localStorage.getItem('loginSession') === "true") {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      }
    });
  }

  logout() {
    this.userDataService.setLoggedIn(false);
    localStorage.clear();
    this.router.navigate(['login']);
  }

  gotoEditProfile() { 
    this.userDataService.setEditval();
    this.router.navigate(['profile']);
  }

  onThemeChange(event){
    this._sharedDataService.OnThemeSwitch.next(event.checked);
  }
}
