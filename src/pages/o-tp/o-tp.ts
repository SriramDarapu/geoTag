import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { CompleteProfilePage } from '../complete-profile/complete-profile';
import { AuthService } from '../../services/auth.service';
import { UserDataService } from '../../services/user-data.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'page-o-tp',
  templateUrl: 'o-tp.html'
})
export class OTPPage {

  userId: any;

  constructor(
    public navCtrl: NavController, 
    private authService: AuthService, 
    private userDataService: UserDataService, 
    private sharedService: SharedService
  ) {
  }

  onSubmit(form: NgForm) {
    this.userId = this.userDataService.getUserData().id;
    const data = {
      otp: +form.value.otp,
      _id: this.userId
    };
    // console.log(+form.value.otp);
    
    this.authService.validateOtp(data).subscribe(
      (res) => {
        if(res.success) {
          console.log(res.success.data.data);        
          this.userDataService.setUserData(res.success.data.data);
          this.navCtrl.push(CompleteProfilePage);
        }else if(res.error) {
          this.sharedService.presentToast(res.error.description);
        }else {
          this.sharedService.presentToast("Something went wrong!");
        }
      }
    )
  }
}
