import { ToastController } from "ionic-angular";
import { Injectable } from "@angular/core";

@Injectable()
export class SharedService {

    constructor(private toastCtrl: ToastController){}

    presentToast(text) {
        let toast = this.toastCtrl.create({
          message: text,
          position: 'top',
          showCloseButton: true,
          closeButtonText: 'Ok',
          duration: 4000
        });
        toast.present();
    }

    
}