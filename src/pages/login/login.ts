import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OTPPage } from '../o-tp/o-tp';
import { CompleteProfilePage } from '../complete-profile/complete-profile';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';
import { UserDataService } from '../../services/user-data.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  userData: any;
  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    private authService: AuthService, 
    public userDataService: UserDataService,
    public sharedService: SharedService, 
    public formBuilder: FormBuilder
  ) {
    let phoneRegex = '[0-9]*';
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.loginForm = formBuilder.group({
      phone: ['', Validators.compose([Validators.maxLength(10), Validators.pattern(phoneRegex), Validators.required])],
      email: ['', Validators.compose([Validators.pattern(emailRegex), Validators.required])]
    });
  }

  onSubmit() {

    const data = this.loginForm.value;
    // console.log(this.loginForm);
    
    this.authService.signInUser(data).subscribe(
      (res) => {
        // console.log(res);
        if(res.success) {
          this.userData = {
            _id: res.success.data.id,
            name: '',
            phone: '',
            email: ''
          };
          this.userDataService.setUserData(this.userData);
          this.sharedService.presentToast("OTP has been sent to your registered email ID!");
          // this.sharedService.presentToast();
          this.navCtrl.push(OTPPage);
        }else if(res.error) {
          this.sharedService.presentToast(res.error.description);
        }else {
          this.sharedService.presentToast("Something went wrong!");
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
