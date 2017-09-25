import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CartPage } from '../pages/cart/cart';
import { CloudPage } from '../pages/cloud/cloud';
import { LoginPage } from '../pages/login/login';
import { OTPPage } from '../pages/o-tp/o-tp';
import { CompleteProfilePage } from '../pages/complete-profile/complete-profile';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CartPage,
    CloudPage,
    LoginPage,
    OTPPage,
    CompleteProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CartPage,
    CloudPage,
    LoginPage,
    OTPPage,
    CompleteProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}