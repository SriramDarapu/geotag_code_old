import { Component, NgZone, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

import { AuthService } from '../../services/auth.service';
import { UserDataService } from '../../services/userData.service';
import { SharedDataService } from '../../services/shared-data.service';


const URL = 'http://ec2-34-215-112-156.us-west-2.compute.amazonaws.com:8080/partnerImage';
declare var google: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  // geocoder = new google.maps.Geocoder;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  profileForm: FormGroup;
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

  data:any = {
    name: '',
    phone: '',
    email: '',
    business_ctgry: '',
    location: '',
    radius: '',
    address: ''
  };
  fileInput: any;
  userId: any;
  profilePicture: any = null;
  allowEdit: any;
  fileCount: number;
  showProgress = false;

  geocoder: any;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router, 
    private authService: AuthService, 
    private userDataService: UserDataService,
    private el: ElementRef,
    private http: Http,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private sharedService: SharedDataService
  ) { 
    let phoneRegex = '[0-9]*';
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.profileForm = formBuilder.group({
      name: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      phone: ['', Validators.compose([Validators.maxLength(10), Validators.pattern(phoneRegex), Validators.required])],
      email: ['', Validators.compose([Validators.pattern(emailRegex), Validators.required])],
      business_ctgry: ['', Validators.compose([Validators.required])],
      radius: ['', Validators.compose([Validators.required])],
      location: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      address: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

  ngOnInit() { 
    const userObj = this.userDataService.getUserData();
    const isPicAvailable = localStorage.getItem('profilePic');
    this.allowEdit = this.userDataService.getEditval();
    // console.log(this.data);
    if(localStorage.getItem('userData') !== null) {

      this.data = JSON.parse(localStorage.getItem('userData'));
      if(this.data.business_name) {
        this.data.name = this.data.business_name
      }
      if(this.data.picurl) {
        this.profilePicture = this.data.picurl
      }
      if(this.data._id){
        this.data.id = this.data._id;
      }
    } else if(userObj) {
      this.data.id = userObj.id;
      this.data.phone = userObj.phone;
      this.data.email = userObj.email;
    }

    if(isPicAvailable !== "undefined") {
      this.profilePicture = isPicAvailable;
    }

    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    // this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => { 
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.profileForm.value.location = place.formatted_address;
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
      this.geocoder = new google.maps.Geocoder();
    });
  }

  // getLocation() {
  //   this.setCurrentPosition();
  // }

  // setCurrentPosition() {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       var that = this;
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 12;
  //       var latlng = {lat: this.latitude, lng: this.longitude};
  //       this.geocoder.geocode({'location': latlng}, function(results, status) {
  //         alert(results[0].formatted_address);
  //         that.sharedService.locationSelected.next(results[0].formatted_address);
  //         // alert(this.profileForm.value.location);
  //       });
  //       // return this.geocoder.geocode({'location': latlng}).then(
  //       //   (data, status) => {
  //       //     return data[0].formatted_address;
  //       //   }
  //       // );
  //     });
  //   }
  // }

  // onSubmit() {  
  //   this.showProgress = true;
  //   const dataObj = this.profileForm.value;
  //   dataObj['dob'] = this.data.dob;
  //   if(this.data.id) {
  //     dataObj['id'] = this.data.id;
  //   }else
  //   dataObj['id'] = this.data._id;
  //   console.log(dataObj);
  //   if(!this.allowEdit) {
  //     dataObj['business_name'] = this.data.name;
  //     this.authService.completeProfile(dataObj).subscribe(
  //       (res) => {
  //         this.showProgress = false;
  //         if(res.success) { 
  //           localStorage.setItem('userData', JSON.stringify(dataObj));
  //           localStorage.setItem('loginSession', 'true');
  //           this.userDataService.setUserData(dataObj);
  //           console.log(res.message);
  //           this.sharedService.openSnackBar('Profile successfully created', 'OK');
  //           this.router.navigate(['home']);
  //         }
  //       }
  //     )
  //   } else {
  //     dataObj['business_name'] = this.data.name;
  //     this.authService.updatePartnerProfile(dataObj).subscribe(
  //       (res) => {
  //         if(res.success) { 
  //           this.showProgress = false;
  //           localStorage.setItem('userData', JSON.stringify(dataObj));
  //           this.userDataService.setUserData(dataObj);
  //           console.log(res.message);
  //           this.sharedService.openSnackBar('Profile successfully updated', 'OK');
  //           this.router.navigate(['home']);
  //         }
  //       }
  //     )
  //   }
  // }

  onSubmit() {
    // alert("on submit clicked");
    this.sharedService.openSnackBar('on submit clicked', 'OK');
    this.showProgress = true;
    const dataObj = this.profileForm.value;
    dataObj['dob'] = this.data.dob;
    if(this.data.id) {
      dataObj['id'] = this.data.id;
    }else {
      dataObj['id'] = this.data._id;
    }
    console.log(dataObj);
    if(!this.allowEdit) {
      // alert('inside in allowedit if block');
      this.sharedService.openSnackBar('inside in allowedit if block', 'OK');
      dataObj['business_name'] = this.data.name;
      this.authService.completeProfile(dataObj).subscribe(
        (res) => {
          this.showProgress = false;
          if(res.success) { 
            localStorage.setItem('userData', JSON.stringify(dataObj));
            localStorage.setItem('loginSession', 'true');
            this.userDataService.setUserData(dataObj);
            console.log(res.message);
            this.sharedService.openSnackBar('Profile successfully created', 'OK');
            this.router.navigate(['home']);
          }
        }
      )
    } else {
      dataObj['business_name'] = this.data.name;
      this.authService.updatePartnerProfile(dataObj).subscribe(
        (res) => {
          if(res.success) { 
            this.showProgress = false;
            localStorage.setItem('userData', JSON.stringify(dataObj));
            this.userDataService.setUserData(dataObj);
            console.log(res.message);
            this.sharedService.openSnackBar('Profile successfully updated', 'OK');
            this.router.navigate(['home']);
          }
        }
      )
    }
  }

  upload() {
    this.showProgress = true;
    //locate the file element meant for the file upload.
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file-input');
    //get the total amount of files attached to the file input.
    this.fileCount  = inputEl.files.length;
    //create a new fromdata instance
    let formData = new FormData();
    //check if the filecount is greater than zero, to be sure a file was selected.
    if (this.fileCount > 0) { // a file was selected
      //append the key name 'photo' with the first file in the element
      // this.isFileSelected = true;
      formData.append('file', inputEl.files.item(0));
      //call the angular http method
      this.http
      //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
      .post(URL+"/"+this.data.id, formData).map((res:Response) => res.json()).subscribe(
      //map the success function and alert the response
        (res) => { 
          this.showProgress = false;
          this.sharedService.openSnackBar(res.message, "OK");
          // var res = JSON.parse(response);
          this.profilePicture = res.filename;
          localStorage.setItem('profilePic', this.profilePicture);
        },
        (error) => alert(error)
      )
    }
  }

  // goToHome(){
  //   this.router.navigate(['home']);
  // }

  getNameError() {
    return this.profileForm.controls.name.hasError('required') ? 'Name is required' :
        this.profileForm.controls.name.hasError('minlength') ? 'Please enter a valid Name' : '';
  }

  getAddrsError() {
    return this.profileForm.controls.address.hasError('required') ? 'Address is required' :
        this.profileForm.controls.address.hasError('minlength') ? 'Please enter a valid Address' : '';
  }

  getLocationError() {
    return this.profileForm.controls.location.hasError('required') ? 'Location is required' :
        this.profileForm.controls.location.hasError('minlength') ? 'Please enter a valid Location' : '';
  }

  getEmailError() {
    return this.profileForm.controls.email.hasError('required') ? 'Email is required' :
        this.profileForm.controls.email.hasError('email') ? 'Please enter a valid email' : '';
  }

  getMobileError() {
    return this.profileForm.controls.phone.hasError('required') ? 'Mobile Number is required' :
           this.profileForm.controls.phone.hasError('pattern') ? 'Please enter a valid mobile number' : '';
  }

  getCategryError() {
    return this.profileForm.controls.business_ctgry.hasError('required') ? 'Business Category is required' : '';
  }

  getRadiusError() {
    return this.profileForm.controls.radius.hasError('required') ? 'Range is required' : '';
  }

}
