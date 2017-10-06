import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { CompleteProfilePage } from '../complete-profile/complete-profile';
import { AuthService } from '../../services/auth.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'page-o-tp',
  templateUrl: 'o-tp.html'
})
export class OTPPage {

  constructor(public navCtrl: NavController, private authService: AuthService, private userDataService: UserDataService) {
  }

  onSubmit(form: NgForm) {
    const data = {
      otp: +form.value.otp
    };
    // console.log(+form.value.otp);
    
    this.authService.validateOtp(data).subscribe(
      (res) => {
        if(res.success) {
          console.log(res.success.data.data);        
          this.userDataService.setUserData(res.success.data.data);
          this.navCtrl.push(CompleteProfilePage);
        }
      }
    )
  }

  // goToCompleteProfile(params){
  //   if (!params) params = {};
  //   this.navCtrl.push(CompleteProfilePage);
  // }goToHome(params){
  //   if (!params) params = {};
  //   this.navCtrl.push(HomePage);
  // }
}
