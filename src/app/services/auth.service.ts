import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';

import 'rxjs/Rx';
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
   
    errorHandler(arg0: any): any {
        throw new Error("Method not implemented.");
    }

    token = null;
    loggedIn =null;

    serviceData = {
        domain: "http://ec2-34-215-112-156.us-west-2.compute.amazonaws.com:8080/", //"http://localhost:5000/",
        url: {
            registration: "partnerRegistration",
            otpValidation: "partnervalidateOtp",
            profileCompletion: "partnerProfileUpdate",
            createpassword: "setPassword",
            login: "login", 
            otpLogin: "loginWithOtp",
            verifyOTP: "verifyOtpOfLogin",
            imageUpload: "partnerImage",
            updateProfile: "partnerEditProfile",
            postDeals: "deals"
        }
    };

    constructor(private http: Http, private router: Router) {}

    signInUser(data: any) {
        const link = this.serviceData.domain + this.serviceData.url.registration;
        return this.http.post(link, data).map(
            (response: Response) => {
                return response.json();
            }
        );
    }

    login(data: any) {
        const link = this.serviceData.domain + this.serviceData.url.login;
        return this.http.post(link, data).map(
            (response: Response) => {
                return response.json();
            }
        )
    }

    loginViaOTP(data: any) {
        const link = this.serviceData.domain + this.serviceData.url.otpLogin;
        return this.http.post(link, data).map(
            (response: Response) => {
                return response.json();
            }
        )
    }

    verifyLoginViaOTP(data: any) {
        const link = this.serviceData.domain + this.serviceData.url.verifyOTP;
        return this.http.post(link, data).map(
            (response: Response) => {
                return response.json();
            }
        )
    }

    validateOtp(data: any) {
        const link = this.serviceData.domain + this.serviceData.url.otpValidation;
        return this.http.post(link, data).map(
            (response: Response) => {
                return response.json();
            }
        )
    }

    createPassword(data: any) {
        const link = this.serviceData.domain + this.serviceData.url.createpassword+"/"+data._id;
        return this.http.post(link, data).map(
            (response: Response) => {
                return response.json();
            }
        )
    }

    completeProfile(data: any) {
        const link = this.serviceData.domain + this.serviceData.url.profileCompletion+"/"+data.id;
        return this.http.post(link, data).map(
            (response: Response) => {
                this.token = true;
                return response.json();
            }
        )
    }

    logout() {
        this.router.navigate(['login']);
        return this.token = null;
    }

    uploadImage(formdata: any){
        const link = this.serviceData.domain + this.serviceData.url.imageUpload;
        return this.http.post(link, formdata)
        .catch(this.errorHandler)
    }


    isLoggedInUser() {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
    }

    updatePartnerProfile(data: any) {
        const link = this.serviceData.domain + this.serviceData.url.updateProfile+"/"+data.id;
        return this.http.post(link, data).map(
            (response: Response) => {
                return response.json();
            }
        )
    }

    postADeal(data: any) {
        const link = this.serviceData.domain + this.serviceData.url.postDeals;
        return this.http.post(link, data).map(
            (response: Response) => {
                return response.json();
            }
        )
    }

}
