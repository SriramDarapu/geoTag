import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { OTPPage } from '../o-tp/o-tp';
import { CompleteProfilePage } from '../complete-profile/complete-profile';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, private authService: AuthService, public toastCtrl: ToastController) {
  }

  onSubmit(form: NgForm) {
    const data = form.value;
    this.authService.signInUser(data).subscribe(
      (res) => {
        // console.log(res);
        if(res.success) {
          let toast = this.toastCtrl.create({
            message: 'OTP has been sent to your registered email ID!',
            duration: 3000
          });
          toast.present();
          this.navCtrl.push(OTPPage);
        }
      }
    );
  }

  goToOTP(params){
    if (!params) params = {};
    this.navCtrl.push(OTPPage);
  }
  goToCompleteProfile(params){
    if (!params) params = {};
    this.navCtrl.push(CompleteProfilePage);
  }
  goToHome(params){
    if (!params) params = {};
    this.navCtrl.push(HomePage);
  }
}
