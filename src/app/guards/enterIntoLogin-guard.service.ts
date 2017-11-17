import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class CanEnterIntoLogin implements CanActivate {

    constructor(private router: Router) {}

    canActivate() {
        if(localStorage.getItem('userData')) {
            this.router.navigate(['home']);
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
}