import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { QrCodePage } from '../qr-code/qr-code';

/**
 * Generated class for the DealInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deal-info',
  templateUrl: 'deal-info.html',
})
export class DealInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DealInfoPage');
  }

  showQRCode() {
    let modal = this.modalCtrl.create(QrCodePage);
    modal.present();
  }

}
