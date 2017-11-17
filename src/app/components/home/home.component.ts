import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class HomeComponent implements OnInit {

  links = [
    {
      name: 'Home',
      icon: 'home',
      route: 'main'
    },{
      name: 'Post Deals',
      icon: 'note_add',
      route: 'postDeal'
    },{
      name: 'Settings',
      icon: 'settings'
    }
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  goToLink(link) { 
    this.router.navigate([`./home/${link.route}`]);
  }

}
