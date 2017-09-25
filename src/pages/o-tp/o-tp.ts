import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CompleteProfilePage } from '../complete-profile/complete-profile';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-o-tp',
  templateUrl: 'o-tp.html'
})
export class OTPPage {

  constructor(public navCtrl: NavController) {
  }
  goToCompleteProfile(params){
    if (!params) params = {};
    this.navCtrl.push(CompleteProfilePage);
  }goToHome(params){
    if (!params) params = {};
    this.navCtrl.push(HomePage);
  }
}
