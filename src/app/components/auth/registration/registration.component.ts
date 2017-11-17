import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserDataService } from '../../../services/userData.service';
import { SharedDataService } from '../../../services/shared-data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    
  regForm: FormGroup;
  userData: any;
  isSuccess: boolean = false;
  errorDesc: string;
  showProgress = false;

  // email = new FormControl('', [Validators.required, Validators.email]);
  // mobile = new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(10)]);

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public authService: AuthService,
    public userDataService: UserDataService,
    public sharedService: SharedDataService
  ) { 
    let phoneRegex = '[0-9]*';
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.regForm = formBuilder.group({
      phone: ['', Validators.compose([Validators.maxLength(10), Validators.pattern(phoneRegex), Validators.required])],
      email: ['', Validators.compose([Validators.pattern(emailRegex), Validators.required])]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.showProgress = true;
    const data = this.regForm.value;
    this.authService.signInUser(data).subscribe(
      (res) => {
        this.showProgress = false;
        if(res.success) {
          this.userData = {
            _id: res.success.data.id,
            name: '',
            phone: '',
            email: ''
          };
          this.userDataService.setUserData(this.userData);
          this.userDataService.setRegisteredToken(true);
          this.sharedService.openSnackBar("OTP has been sent successfully to registered EmailID", "OK");
          this.router.navigate(['otp']);
        } else if (res.error) {
          this.isSuccess = true;
          this.errorDesc = res.error.description;
          this.sharedService.openSnackBar(res.error.description, "OK");
        }
      }
    );
  }

  getEmailError() {
    return this.regForm.controls.email.hasError('required') ? 'Email is required' :
        this.regForm.controls.email.hasError('email') ? 'Please enter a valid email' :
            '';
  }

  getMobileError() {
    return this.regForm.controls.phone.hasError('required') ? 'Mobile Number is required' :
           this.regForm.controls.phone.hasError('pattern') ? 'Please enter a valid mobile number' : '';
  }

}
