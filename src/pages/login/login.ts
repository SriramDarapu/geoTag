import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OTPPage } from '../o-tp/o-tp';
import { CompleteProfilePage } from '../complete-profile/complete-profile';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {
  }
  goToOTP(params){
    if (!params) params = {};
    this.navCtrl.push(OTPPage);
  }goToCompleteProfile(params){
    if (!params) params = {};
    this.navCtrl.push(CompleteProfilePage);
  }goToHome(params){
    if (!params) params = {};
    this.navCtrl.push(HomePage);
  }
}
