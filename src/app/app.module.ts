import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { CartPage } from '../pages/cart/cart';
import { CloudPage } from '../pages/cloud/cloud';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps, Spherical } from '@ionic-native/google-maps';
import { ComponentsModule } from '../components/components.module';
import { QrCodePageModule } from '../pages/qr-code/qr-code.module';
import { EditProfilePageModule } from '../pages/edit-profile/edit-profile.module';
import { DealInfoPageModule } from '../pages/deal-info/deal-info.module';
import { LoginPageModule } from '../pages/login/login.module';
import { OTPPageModule } from '../pages/o-tp/otp.module';
import { CompleteProfilePageModule } from '../pages/complete-profile/complete-profile.module';
import { HomePageModule } from '../pages/home/home.module';
import { AuthService } from '../services/auth.service';
import { UserDataService } from '../services/user-data.service';
import { SharedService } from '../services/shared.service';

@NgModule({
  declarations: [
    MyApp,
    CartPage,
    CloudPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    ComponentsModule,
    LoginPageModule,
    OTPPageModule,
    CompleteProfilePageModule,
    HomePageModule,
    EditProfilePageModule,
    DealInfoPageModule,
    QrCodePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CartPage,
    CloudPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FileTransfer,
    FileTransferObject,
    FilePath,
    Camera,
    GoogleMaps,
    Spherical,
    Geolocation,
    NativeGeocoder,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    UserDataService,
    SharedService
  ]
})
export class AppModule {}