import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'solution-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private stackoverflowUrl: string = 'https://stackoverflow.com/users/1791913/faisal?tab=profile';
  private linkedinUrl: string = 'https://www.linkedin.com/in/mohammadfaysal/';
  private fiverrUrl:string = 'https://www.fiverr.com/faisalmuhammad_';
  private facebookUrl:string = 'https://www.facebook.com/phaysall';
  private twitterUrl:string = 'https://twitter.com/faisssallll';
  private githubUrl:string = 'https://github.com/faisalmuhammad';
  private googleUrl:string = 'https://plus.google.com/+MuhammadFaisal04';
  constructor() { }

  ngOnInit() {
  }

}