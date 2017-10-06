import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DealInfoPage } from '../../pages/deal-info/deal-info';

/**
 * Generated class for the NotificationsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsComponent {

  text: string;
  notificationsObj = [
    {
      url: 'assets/img/slimer.jpg',
      name: 'Slimer',
      desc: "Boo!"
    },
    {
      url: 'assets/img/marshmallow-man.png',
      name: 'Stay Puft Marshmallow Man',
      desc: "Never cross the streams!"
    },
    {
      url: 'assets/img/gozer.png',
      name: 'Gozer',
      desc: "Are you a God?"
    },
    {
      url: 'assets/img/barrett.jpg',
      name: 'Dana',
      desc: "I am The Gatekeeper!"
    },
  ];

  constructor(private navCtrl: NavController) {
    console.log('Hello NotificationsComponent Component');
    this.text = 'Hello World';
  }

  itemSelected() {
    this.navCtrl.push(DealInfoPage);
  }

}
