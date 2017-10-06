import { NgModule } from "@angular/core";
import { IonicModule, IonicPageModule } from "ionic-angular";

import { OTPPage } from "./o-tp";

@NgModule({
    declarations: [
        OTPPage
    ],
    imports: [
        IonicModule,
        IonicPageModule.forChild(OTPPage)
    ]
})
export class OTPPageModule {}