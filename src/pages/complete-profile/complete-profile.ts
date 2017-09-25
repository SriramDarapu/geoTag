import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-complete-profile',
  templateUrl: 'complete-profile.html'
})
export class CompleteProfilePage {

  constructor(public navCtrl: NavController) {
  }
  goToHome(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HomePage);
  }
}
