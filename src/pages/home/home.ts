import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import md5 from 'crypto-md5';

import { EditProfilePage } from '../edit-profile/edit-profile';
import { UserDataService } from '../../services/user-data.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userData = {};
  pet = "nearme";
  imageSrc = 'https://raw.githubusercontent.com/ionic-team/ionic-preview-app/master/src/assets/img/avatar-gollum.jpg';

  constructor(
    public navCtrl: NavController, 
    private actionSheetCtrl: ActionSheetController, 
    private platform: Platform, 
    private userDataService: UserDataService,
    private storage: Storage
  ) {  }

  ionViewDidLoad() {
    this.storage.get('userObj').then((val) => {
      if(val){
        this.userData = val;
        this.imageSrc = "https://www.gravatar.com/avatar/" + md5(val.email.toLowerCase(), 'hex');
        this.userDataService.setUserData(val);
      }
    });
    this.storage.get('profilePicture').then(
      (val) => {
        if(val){
          this.imageSrc = val;
        }
      }
    )
    this.userData = this.userDataService.getUserData();
    // alert(JSON.stringify(this.userData));
    const imgSrc = this.userDataService.getImageData();
    if(imgSrc) {
      this.imageSrc = imgSrc;
    }
  }

  segmentChanged(data) {
    // if(data.value == "puppies"){
    //   this.showMap();
    // }
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Change your picture',
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

  gotoEditProfile() {
    this.userDataService.setEditVal();
    this.navCtrl.push(EditProfilePage);
  }
  
}
