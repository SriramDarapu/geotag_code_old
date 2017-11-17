import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { OTPVerificationComponent } from "./components/auth/otpverification/otpverification.component";
import { RegistrationComponent } from "./components/auth/registration/registration.component";
import { CreatePasswordComponent } from "./components/auth/create-password/create-password.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { AuthGuard } from "./guards/auth-guard.service";
import { ProfileGuard } from "./guards/profile-guard.service";
import { CanEnterIntoLogin } from "./guards/enterIntoLogin-guard.service";
import { MainComponent } from "./components/main/main.component";
import { PostdealsComponent } from "./components/postdeals/postdeals.component";

const appRoutes: Routes= [
    {
        path: '', component: LoginComponent, canActivate: [CanEnterIntoLogin]
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'registration', component: RegistrationComponent
    },
    {
        path: 'createPassword', component: CreatePasswordComponent
    },
    {
        path: 'profile', component: ProfileComponent
    },
    {
        path: 'home', component: HomeComponent, canActivate: [AuthGuard], loadChildren: './components/home/home.module#HomeModule' 
    },
    {
        path: 'otp', component: OTPVerificationComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}