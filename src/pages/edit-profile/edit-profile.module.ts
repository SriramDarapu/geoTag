import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';

import { EditProfilePage } from './edit-profile';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    EditProfilePage,
  ],
  imports: [
    IonicModule,
    IonicPageModule.forChild(EditProfilePage),
    ComponentsModule
  ],
  // exports: [
  //   ComponentsModule
  // ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditProfilePageModule {}
