import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'page-complete-profile',
  templateUrl: 'complete-profile.html'
})
export class CompleteProfilePage implements OnInit {

  data = [];

  constructor(public navCtrl: NavController, private userDataService: UserDataService) {
  }

  ngOnInit() {
    this.data.push(this.userDataService.getUserData());
  }
  
}
