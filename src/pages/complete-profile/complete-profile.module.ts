import { NgModule } from "@angular/core";
import { IonicModule, IonicPageModule } from "ionic-angular";

import { CompleteProfilePage } from "./complete-profile";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
    declarations: [
        CompleteProfilePage
    ],
    imports: [
        IonicModule,
        IonicPageModule.forChild(CompleteProfilePage),
        ComponentsModule
    ]
})
export class CompleteProfilePageModule {}