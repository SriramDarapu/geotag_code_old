import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainComponent } from "../main/main.component";
import { ProfileComponent } from "../profile/profile.component";
import { PostdealsComponent } from "../postdeals/postdeals.component";

const homeRoutes: Routes = [
    {
        path: '', 
        redirectTo: '/home/main', //full child path
        pathMatch: 'full'
    },
    {
        path: 'main', component: MainComponent
    },
    {
        path: 'postDeal', component: PostdealsComponent
    }
]

@NgModule ({
    imports: [
        RouterModule.forChild(homeRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class HomeRoutingModule {

}