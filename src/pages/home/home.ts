import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: any;

  @ViewChild('map') mapRef: ElementRef;

  pet = "puppies";

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log(this.mapRef);
    this.showMap();
  }

  segmentChanged(data) {
    // if(data.value == "puppies"){
    //   this.showMap();
    // }
    
  }

  showMap() {
    const location = new google.maps.LatLng(51.7, -0.123);
    const options = {
      center: location,
      zoom: 10
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }
  
}
