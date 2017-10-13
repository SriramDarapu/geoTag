import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, Platform, NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

import { Storage } from '@ionic/storage';
import md5 from 'crypto-md5';

import { HomePage } from '../../pages/home/home';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserDataService } from '../../services/user-data.service';
import { SharedService } from '../../services/shared.service';

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

  lastImage: string = null;
  loading: Loading;
  // profilePicture: string = null;

  dob: string;
  imageData: string = "assets/img/user.png";
  userObj = null;
  profilePicture: any = "https://www.gravatar.com/avatar/";

  constructor(
    public navCtrl: NavController, 
    private actionSheetCtrl: ActionSheetController, 
    private platform: Platform,
    private authService: AuthService,
    private userDataService: UserDataService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private alertCtrl: AlertController,
    private camera: Camera,
    private transfer: FileTransfer,
    private file: File,
    private filePath: FilePath,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private sharedService: SharedService
  ) {  }

  ngOnInit() {
    this.data = this.userDataService.getUserData();
    this.storage.get('userObj').then((val) => {
      console.log('Your age is', val);
      this.userObj = val;
      this.profilePicture = "https://www.gravatar.com/avatar/" + md5(this.data.email.toLowerCase(), 'hex');
    });
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
          if(!this.userObj){
            this.storage.set('userObj', dataObj);
          }
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
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Gallery',
          icon: !this.platform.is('ios') ? 'images' : null,
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
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

  public takePicture(sourceType) {

    this.loading = this.loadingCtrl.create({
      content: 'Uploading your picture...',
    });
    this.loading.present();
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.sharedService.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }
  
  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.uploadImage();
    }, error => {
      this.sharedService.presentToast('Error while storing file.');
    });
  }
  
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return this.file.dataDirectory + img;
    }
  }

  public uploadImage() {
    // Destination URL
    var url = "http://ec2-34-215-112-156.us-west-2.compute.amazonaws.com:8080/file_upload";
   
    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
   
    // File name only
    var filename = this.lastImage;
   
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      headers: {
        Connection: "close"
      },
      mimeType: "multipart/form-data",
      params : {
        'fileName': filename,
        "_id": this.data.id
      }
    };
   
    const fileTransfer: FileTransferObject = this.transfer.create();
   
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      const dataObj = JSON.parse(data.response);
      this.profilePicture = dataObj.filename;
      this.storage.set('profilePicture', this.profilePicture);
      this.loading.dismissAll();
      this.sharedService.presentToast('Image successfuly uploaded.');
    }, err => {
      this.loading.dismissAll();
      this.alertCtrl.create({
        title: 'Error!',
        subTitle: `Err Code: ${err.code}, Error Source: ${err.source}`,
        buttons: ['OK']
      }).present();
    });
  }

}
