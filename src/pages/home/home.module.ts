import { NgModule } from "@angular/core";
import { HomePage } from "./home";
import { IonicModule, IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
    declarations: [
        HomePage
    ],
    imports: [
        IonicModule,
        IonicPageModule.forChild(HomePage),
        ComponentsModule
    ]
})
export class HomePageModule {}