import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AgmCoreModule } from '@agm/core';
// import { Md2Module }  from 'md2';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from './modules/material/material.module';
import { SharedDataService } from './services/shared-data.service';
// import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/auth/login/login.component';
import { OTPVerificationComponent } from './components/auth/otpverification/otpverification.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { CreatePasswordComponent } from './components/auth/create-password/create-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthService } from './services/auth.service';
import { UserDataService } from './services/userData.service';
import { CompleteProfileComponent } from './components/profile/complete-profile/complete-profile.component';
import { AuthGuard } from './guards/auth-guard.service';
import { ProfileGuard } from './guards/profile-guard.service';
import { CanEnterIntoLogin } from './guards/enterIntoLogin-guard.service';
// import { MainComponent } from './components/main/main.component';
// import { PostdealsComponent } from './components/postdeals/postdeals.component';
import { HomeModule } from './components/home/home.module';

@NgModule({
  imports: [AgmCoreModule.forRoot({
    apiKey: "AIzaSyDhEa4UziCvLj9bpIVGLUPQ83PzgmXsyrg",
    libraries: ["places"]
    }),
    BrowserModule,
    BrowserAnimationsModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpModule,
    CommonModule,  
    FlexLayoutModule,   
    AppRoutingModule,
    // Material Modules in './modules/material/material.module'
    MaterialModule,
    // Md2Module,
    HomeModule
    ],
  declarations: [
    AppComponent, 
    HeaderComponent, 
    FooterComponent, 
    // HomeComponent, 
    LoginComponent, 
    OTPVerificationComponent, 
    RegistrationComponent, 
    CreatePasswordComponent, 
    ProfileComponent, 
    CompleteProfileComponent 
    // MainComponent, 
    // PostdealsComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    SharedDataService, 
    OverlayContainer, 
    AuthService, 
    UserDataService,
    AuthGuard,
    ProfileGuard,
    CanEnterIntoLogin
  ]
})
export class AppModule { 
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('solution-dark-theme');
  }
}