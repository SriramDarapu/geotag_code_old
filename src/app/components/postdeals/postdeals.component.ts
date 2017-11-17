import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material';

import { MyTel } from '../../models/my-tel.model';
import { Timer } from '../../models/timer.model';
import { AuthService } from '../../services/auth.service';
import { UserDataService } from '../../services/userData.service';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';

const URL = 'http://ec2-34-215-112-156.us-west-2.compute.amazonaws.com:8080/dealImages';

@Component({
  selector: 'app-postdeals',
  templateUrl: './postdeals.component.html',
  styleUrls: ['./postdeals.component.css']
})
export class PostdealsComponent implements OnInit {
  
  profilePicture: any;
  firstFormGroup: FormGroup;
  dealsForm: FormGroup;
  data:any;
  fileInput: any;
  userId: any;
  allowEdit: any;
  fileCount: number;
  isLinear = true;
  imagesArr:any;
  showProgress = false;

  categories = [
    {value: 'Hotel', viewValue: 'Hotel'},
    {value: 'Fashion', viewValue: 'Fashion'},
    {value: 'Food', viewValue: 'Food'}
  ];
  ranges = [
    {value: '2KM', viewValue: '2KM'},
    {value: '3KM', viewValue: '3KM'},
    {value: '5KM', viewValue: '5KM'}
  ];

  selectedDate: any;

  phone:MyTel = {
    'area': '123',
    'exchange': '123',
    'subscriber': '1234'
  };
  
  start_time:Timer = {
    'hrs': '00',
    'mins': '00',
    'meridiem': 'PM'
  };

  end_time:Timer = {
    'hrs': '00',
    'mins': '00',
    'meridiem': 'PM'
  };

  scheduled_notification_time: Timer = {
    'hrs': '00',
    'mins': '00',
    'meridiem': 'PM'
  };

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private userDataService: UserDataService,
    private snackBar: MatSnackBar,
    private router: Router,
    private el: ElementRef,
    private http: Http,
  ) { 
    let phoneRegex = '[0-9]*';
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.dealsForm = formBuilder.group({
      category: ['', Validators.compose([Validators.required])],
      short_desc: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      content: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      scheduled_notification_date: ['', Validators.compose([Validators.required])],
      start_date: ['', Validators.compose([Validators.required])],
      end_date: ['', Validators.compose([Validators.required])],
      range: ['', Validators.compose([Validators.required])]
    });
    this.firstFormGroup = formBuilder.group(
      {
        images: ['']
      }
    );
  }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('userData'));
    // console.log(this.data);
    if(this.data.business_name) {
      this.data.name = this.data.business_name
    }
    if(this.data.picurl) {
      this.profilePicture = this.data.picurl
    }
    if(this.data.id){
      this.data._id = this.data.id;
    }
  }

  onSubmit() {
     
    this.showProgress = true;
    const dataObj = this.dealsForm.value;
    dataObj['partners_id'] = this.data._id;
    dataObj['start_time'] = `${this.start_time.hrs}:${this.start_time.mins} ${this.start_time.meridiem}`;
    dataObj['end_time'] = `${this.end_time.hrs}:${this.end_time.mins} ${this.end_time.meridiem}`;
    dataObj['scheduled_notification_time'] = `${this.scheduled_notification_time.hrs}:${this.scheduled_notification_time.mins} ${this.scheduled_notification_time.meridiem}`;
    dataObj['lat'] = this.data.lat;
    dataObj['lng'] = this.data.lng;
    this.authService.postADeal(dataObj).subscribe(
      (res) => {
        if(res.success) { 
          this.showProgress = false;
          this.userDataService.setDealsData(dataObj);
          console.log(res.message);
          this.snackBar.open('Deal posted successfully!', 'OK', {
            duration: 2000,
          });
          this.router.navigate(['./home/main']);
        }
      }
    )
  }

  upload() { 
    this.showProgress = true;
    //locate the file element meant for the file upload.
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#deals-pic');
    //get the total amount of files attached to the file input.
    this.fileCount  = inputEl.files.length;
    //create a new fromdata instance
    let formData = new FormData();
    //check if the filecount is greater than zero, to be sure a file was selected.
    if (this.fileCount > 0) { // a file was selected
      //append the key name 'photo' with the first file in the element
      // this.isFileSelected = true;
      for(var i=0; i<=this.fileCount-1; i++) {
        formData.append('file', inputEl.files.item(i));
      }
      //call the angular http method
      this.http
      //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
      .post(URL+"/"+this.data._id, formData).map((res:Response) => res.json()).subscribe(
      //map the success function and alert the response
        (res) => { 
          this.showProgress = false;
          // alert(res.message);
          this.snackBar.open(res.message, "OK");
          // var res = JSON.parse(response);
          // this.profilePicture = res.filename;
          this.imagesArr = res.data;
        },
        (error) => alert(error)
      )
    }
  }
 
  getScheduleNotificationError() {
    return this.dealsForm.controls.scheduled_notification_date.hasError('required') ? 'Schedule Notification is required' : '';
  }

  getCategryError() {
    return this.dealsForm.controls.category.hasError('required') ? 'Category is required' : '';
  }

  getStartDateError() {
    return this.dealsForm.controls.start_date.hasError('required') ? 'Start Date is required' : '';
  }
  
  getEndDateError() {
    return this.dealsForm.controls.end_date.hasError('required') ? 'End Date is required' : '';
  }
  
  getRangeError() {
    return this.dealsForm.controls.range.hasError('required') ? 'Range is required' : '';
  }

  getContentError() {
    return this.dealsForm.controls.content.hasError('required') ? 'Content is required' :
        this.dealsForm.controls.content.hasError('minlength') ? 'Please enter a valid Content' : '';
  }
  getShortDescError() {
    return this.dealsForm.controls.short_desc.hasError('required') ? 'Short Description is required' :
        this.dealsForm.controls.short_desc.hasError('minlength') ? 'Please enter a valid Short Description' : '';
  }

}
