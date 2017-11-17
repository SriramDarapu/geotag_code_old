import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from '../../../services/userData.service';
import { AuthService } from '../../../services/auth.service';
import { SharedDataService } from '../../../services/shared-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData: { _id: any; name: string; phone: string; email: string; };

  loginForm: FormGroup;
  hide = true;
  isSuccess: boolean = false;
  errorDesc: string;
  showProgress = false;

  // email = new FormControl('', [Validators.required, Validators.email]);
  // mobile = new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(10)]);

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private userDataService: UserDataService,
    private sharedService: SharedDataService
  ) { 
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.pattern(emailRegex), Validators.required])],
      // password: ['', Validators.compose([Validators.maxLength(6), Validators.required])]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.showProgress = true;
    const form = this.loginForm;
    const data = {
      // password: form.value.password,
      email: form.value.email,
    };
    this,
    this.authService.loginViaOTP(data).subscribe(
      (res) => {
        // console.log(res);
        this.showProgress = false;
        if(res.success) {
          this.userData = {
            _id: res.success.data.id,
            name: '',
            phone: '',
            email: ''
          };
          this.userDataService.setUserData(this.userData);
          this.userDataService.setLoggedIn(true);
          this.router.navigate(['otp']);
          // localStorage.setItem('loginSession', "true");
          // delete res.success.data['password'];
          this.sharedService.openSnackBar(res.success.data.response, "OK");
          localStorage.setItem('userData', JSON.stringify(res.success.data));
        }else if (res.error) {
          this.isSuccess = true;
          this.errorDesc = res.error.description;
          this.sharedService.openSnackBar(this.errorDesc, "OK");
        }
      }
    );
  }

  getEmailError() {
    return this.loginForm.controls.email.hasError('required') ? 'Email is required' :
        this.loginForm.controls.email.hasError('email') ? 'Please enter a valid email' :
            '';
  }

  // getPasswordError() {
  //   return this.loginForm.controls.password.hasError('required') ? 'Enter valid Password' : '';
  // }

}
