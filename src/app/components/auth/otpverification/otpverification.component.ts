import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserDataService } from '../../../services/userData.service';
import { SharedDataService } from '../../../services/shared-data.service';

@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.css']
})
export class OTPVerificationComponent implements OnInit {

  otpForm: FormGroup;
  userId: any;
  userData: any;
  isSuccess: boolean = false;
  errorDesc: string;
  showProgress = false;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private userDataService: UserDataService,
    private sharedService: SharedDataService
  ) { 
    let otpRegex = '[0-9]*';
    this.otpForm = formBuilder.group({
      otp: ['', Validators.compose([Validators.maxLength(6), Validators.pattern(otpRegex), Validators.required])]
    });
  }

  ngOnInit() {
  }

  onSubmit() { 
    this.showProgress = true;
    const form = this.otpForm;
    this.userId = this.userDataService.getUserData().id;
    const data = {
      otp: +form.value.otp,
      _id: this.userId,
    };
    const isUserLoggedIn = JSON.parse(localStorage.getItem('userData'));
    if(isUserLoggedIn) {
      if(isUserLoggedIn.loginWithOtp){
        this.authService.verifyLoginViaOTP(data).subscribe(
          (res) => {
            this.showProgress = false;
            if(res.success) {

               
              this.userData = res.success.data.data;

              console.log(res.success.data.data);
              this.userDataService.setUserData(this.userData);
              this.userDataService.setLoggedIn(true);
              localStorage.setItem('loginSession', "true");
              // this.userDataService.setUserData(res.success.data.data);
              localStorage.setItem('userData', JSON.stringify(this.userData));
              this.sharedService.openSnackBar('Successfully Verified OTP!', 'OK');
              this.router.navigate(['home']);
            }else if (res.error) {
              this.isSuccess = true;
              this.errorDesc = res.error.response;
              this.sharedService.openSnackBar(this.errorDesc, 'OK');
            }
          }
        )
      }
    } else {
      this.authService.validateOtp(data).subscribe(
        (res) => {
          this.showProgress = false;
          if(res.success) {

             
            this.userData = {
              _id: res.success.data.data._id,
              phone: res.success.data.data.phone,
              email: res.success.data.data.email
            };

            console.log(res.success.data.data);
            this.userDataService.setUserData(res.success.data.data);
            this.sharedService.openSnackBar('Successfully Verified OTP!', 'OK');
            this.router.navigate(['profile']);
          }else if (res.error) {
            this.isSuccess = true;
            this.errorDesc = res.error.response;
            this.sharedService.openSnackBar(this.errorDesc, 'OK');
          }
        }
      )
    }
  }

  getOTPError() {
    return this.otpForm.controls.otp.hasError('required') ? 'OTP is required' :
           this.otpForm.controls.otp.hasError('pattern') ? 'Please enter a valid OTP' : '';
  }

}
