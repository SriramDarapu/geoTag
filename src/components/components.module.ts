import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MapComponent } from './map/map';
import { DealsSavedComponent } from './deals-saved/deals-saved';
import { NotificationsComponent } from './notifications/notifications';
import { EditProfileComponent } from './edit-profile/edit-profile';
@NgModule({
	declarations: [
		MapComponent,
		DealsSavedComponent,
    	NotificationsComponent,
    	EditProfileComponent
	],
	imports: [
		IonicModule
	],
	exports: [
		MapComponent,
		DealsSavedComponent,
    	NotificationsComponent,
    	EditProfileComponent
	]
})
export class ComponentsModule {}
