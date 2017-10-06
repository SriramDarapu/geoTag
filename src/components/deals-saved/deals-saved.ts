import { Component } from '@angular/core';
import { ModalController, AlertController } from 'ionic-angular';
import { QrCodePage } from '../../pages/qr-code/qr-code';

/**
 * Generated class for the DealsSavedComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'deals-saved',
  templateUrl: 'deals-saved.html'
})
export class DealsSavedComponent {

  text: string;
  dealsObj = [
    {
      url: 'assets/img/venkman.jpg',
      name: 'Venkman',
      desc: "Back off man, I'm a scientist."
    },
    {
      url: 'assets/img/spengler.jpg',
      name: 'Egon',
      desc: "We're gonna go full stream."
    },
    {
      url: 'assets/img/stantz.jpg',
      name: 'Ray',
      desc: "Ugly little spud, isn't he?"
    },
    {
      url: 'assets/img/venkman.jpg',
      name: 'Venkman',
      desc: 'Back off man, I\'m a scientist.'
    },
    {
      url: 'assets/img/winston.jpg',
      name: 'Winston',
      desc: "That's a big Twinkie."
    },
    {
      url: 'assets/img/tully.jpg',
      name: 'Winston',
      desc: "Okay, who brought the dog?"
    },
    {
      url: 'assets/img/barrett.jpg',
      name: 'Dana',
      desc: "I am The Gatekeeper!"
    },
  ];
  
  constructor(public modalCtrl: ModalController, public alertCtrl: AlertController) {
    console.log('Hello DealsSavedComponent Component');
    this.text = 'Hello World';
  }

  showQRCode() {
    let modal = this.modalCtrl.create(QrCodePage);
    modal.present();
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Remove Deal from this list?',
      message: 'Are you sure, you want to remove this deal from this list?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

}
