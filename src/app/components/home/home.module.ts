import { NgModule } from "@angular/core";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "./home-routing.module";

import { HomeComponent } from "./home.component";
import { MaterialModule } from "../../modules/material/material.module";
import { MainComponent } from "../main/main.component";
import { PostdealsComponent } from "../postdeals/postdeals.component";
import { TelephoneInputComponent } from "../telephone-input/telephone-input.component";
import { TimePickerComponent } from '../time-picker/time-picker.component';
import { SharedDataService } from "../../services/shared-data.service";

@NgModule({
    declarations: [
        HomeComponent,
        MainComponent,
        PostdealsComponent, 
        TelephoneInputComponent,
        TimePickerComponent
    ],
    imports: [
        HomeRoutingModule,
        CommonModule,
        FormsModule, 
        ReactiveFormsModule,
        MaterialModule
    ],
    providers: [
        SharedDataService
    ]
})
export class HomeModule {

}