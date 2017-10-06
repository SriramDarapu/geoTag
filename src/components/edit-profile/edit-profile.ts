import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, Platform, NavController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

import { HomePage } from '../../pages/home/home';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserDataService } from '../../services/user-data.service';

/**
 * Generated class for the EditProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'edit-profile',
  templateUrl: 'edit-profile.html'
})
export class EditProfileComponent implements OnInit {

  @Input('userData') data;
  dob: string;
  imageData: string = "assets/img/user.png";
  // loc: any;
  // alert: any;

  constructor(
    public navCtrl: NavController, 
    private actionSheetCtrl: ActionSheetController, 
    private platform: Platform,
    private authService: AuthService,
    private userDataService: UserDataService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private alertCtrl: AlertController,
    private camera: Camera
  ) {  }

  ngOnInit() {
    this.data = this.userDataService.getUserData();
    // this.loc = this.userDataService.getCurrentLocation();
    // this.data.location = this.loc.subLocality;
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
          .then((result: NativeGeocoderReverseResult) => {
            const location = JSON.stringify(result)
            console.log(location);
            this.data.location = result.subLocality;
            let alert = this.alertCtrl.create({
              title: 'Your Location!',
              subTitle: location,
              buttons: ['OK']
            });
            alert.present();
          })
          .catch((error: any) => console.log(error));
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  onSubmit(formData: NgForm) {
    const dataObj = formData.value;
    dataObj['dob'] = this.data.dob;
    dataObj['id'] = this.data.id;
    console.log(dataObj);
    
    this.authService.completeProfile(dataObj).subscribe(
      (res) => {
        if(res.success) {
          this.userDataService.setUserData(dataObj);
          console.log(res.message);
          this.goToHome();
        }
      }
    )
  }

  goToHome(){
    this.navCtrl.setRoot(HomePage);
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose your picture',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Camera',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.openCamera();
            console.log('Share clicked');
          }
        },
        {
          text: 'Gallery',
          icon: !this.platform.is('ios') ? 'images' : null,
          handler: () => {
            console.log('Play clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imageData = base64Image;
      this.userDataService.setImageData(this.imageData);
     }, (err) => {
      // Handle error
     });
  }

}
