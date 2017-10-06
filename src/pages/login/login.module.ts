import { NgModule } from "@angular/core";
import { IonicModule, IonicPageModule } from "ionic-angular";

import { LoginPage } from "./login";

@NgModule({
    declarations: [
        LoginPage
    ],
    imports: [
        IonicModule,
        IonicPageModule.forChild(LoginPage)
    ]
})
export class LoginPageModule {}