import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealInfoPage } from './deal-info';

@NgModule({
  declarations: [
    DealInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(DealInfoPage),
  ],
})
export class DealInfoPageModule {}
