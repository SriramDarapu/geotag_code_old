import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class ProfileGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('userData')) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
}