import { ToastController } from "ionic-angular";
import { Injectable } from "@angular/core";

@Injectable()
export class SharedService {

    constructor(private toastCtrl: ToastController){}

    presentToast(text) {
        let toast = this.toastCtrl.create({
          message: text,
          duration: 3000,
          position: 'top',
          showCloseButton: true,
          closeButtonText: 'Ok'
        });
        toast.present();
    }

    
}