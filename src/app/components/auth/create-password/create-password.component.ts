import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from '../../../services/userData.service';
import { AuthService } from '../../../services/auth.service';
import { SharedDataService } from '../../../services/shared-data.service';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css']
})
export class CreatePasswordComponent implements OnInit {

  passwrdForm: FormGroup;
  hide = true;
  userId:any;
  obj: any;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private userDataService: UserDataService,
    private sharedService: SharedDataService
  ) { 
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.passwrdForm = formBuilder.group({
      password: ['', Validators.compose([Validators.maxLength(6), Validators.pattern('^(?=.*\d).{4,8}$'), Validators.required])],
      repassword: ['', Validators.compose([Validators.maxLength(6), Validators.pattern('^(?=.*\d).{4,8}$'), Validators.required])],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const form = this.passwrdForm;
    this.userId = this.userDataService.getUserData().id;
    console.log(form.value);
    const data = {
      password: form.value.password,
      _id: this.userId,
    };
    if(form.value.password == form.value.repassword) {
      this.authService.createPassword(data).subscribe(
        (res) => {
          if(res.success) { 
            this.userDataService.setLoggedIn(true);
            localStorage.setItem('userData', JSON.stringify(res.success.data));
            this.router.navigate(['profile']);
          }
        }
      );
    } else {
      this.sharedService.openSnackBar("Password\'s Doesn\'t match", "OK")
    }
  }

  // isPasswdsMatch() {
  //   if(!this.passwrdForm.valid) {
  //     if(this.passwrdForm.value.password === this.passwrdForm.value.repassword) {
  //       return true;
  //     }
  //     return false;
  //   } else {
  //     return false;
  //   }
  // }

  getPasswordError() {
    return this.passwrdForm.controls.password.hasError('required') ? 'Enter valid Password' :
           this.passwrdForm.controls.password.hasError('pattern') ? 'Password must be between 4 and 8 digits long and include at least one numeric digit' : '';
  }
  getRePasswordError() {
    return this.passwrdForm.controls.repassword.hasError('required') ? 'Re-Enter valid Password' :
           this.passwrdForm.controls.repassword.hasError('pattern') ? 'Password must be between 4 and 8 digits long and include at least one numeric digit' : '';
  }

}
