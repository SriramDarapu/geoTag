import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

declare var google: any;

@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent {

  map: any;
  text: string;
  lat: any;
  lng: any;

  @ViewChild('map') mapRef: ElementRef;

  constructor(private geolocation: Geolocation, private platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.showMap();
    });
  }

  // ngOnInit() {
  //   this.showMap();
  // }

  showMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      const location = new google.maps.LatLng(this.lat, this.lng);
      const options = {
        center: location,
        zoom: 16
      };
      this.map = new google.maps.Map(this.mapRef.nativeElement, options);
      const marker = new google.maps.Marker({
          position: location,
          title:"Your Location"
      });
      
      // To add the marker to the map, call setMap();
      marker.setMap(this.map);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
