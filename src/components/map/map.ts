import { Component, NgZone, OnInit } from '@angular/core';
import { Platform, Events, AlertController, ViewController } from 'ionic-angular';

import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

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
export class MapComponent implements OnInit {

  autocompleteItems: any;
  autocomplete: any;
  acService:any;
  placesService: any;
  showSearchRes: any;

  zone:any;
  map: GoogleMap;
  mapElement: HTMLElement;

  classTransActive:boolean = false;

  constructor(
    platform: Platform,
    public googleMaps: GoogleMaps,
    public events: Events,
    private geolocation: Geolocation,
    public ngZone: NgZone,
    public alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private nativeGeocoder: NativeGeocoder
  ) {

    this.zone = new NgZone({ enableLongStackTrace: false });

    platform.ready().then(() => {

      this.loadMap();

    });

    events.subscribe('map:block', (bloquar:boolean) => {

      if(this.map){

        this.map.setClickable(!bloquar);
      }

    });
  }

  ngOnInit() {
    this.showSearchRes = false;
    this.acService = new google.maps.places.AutocompleteService();        
    this.autocompleteItems = [];
    this.autocomplete = {
        query: ''
    };        
  }

  // dismiss() {
  //     this.viewCtrl.dismiss();
  // }

  chooseItem(item: any) {
    this.showSearchRes = false;
      console.log('modal > chooseItem > item > ', item);
      // this.alertCtrl.create({
      //   title: 'Your Location Coordinates!',
      //   subTitle: `Selected item: ${item.description}`,
      //   buttons: ['OK']
      // }).present();
      this.nativeGeocoder.forwardGeocode(item.description)
      .then(
        (coordinates: NativeGeocoderForwardResult) => {
          const lat:any = coordinates.latitude;
          const long: any = coordinates.longitude;
          // this.alertCtrl.create({
          //   title: 'Your Location Coordinates!',
          //   subTitle: 'The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude,
          //   buttons: ['OK']
          // }).present();
          this.map.animateCamera({
            target: {
              lat: coordinates.latitude,
              lng: coordinates.longitude
            },
            zoom: 15,
            duration: 1000
          });
          
          this.map.addMarker({
            title: 'Your Location',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: lat,
              lng: long
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                
              });
          });
          console.log('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude)
        }
      )
      .catch((error: any) => console.log(error));
      this.viewCtrl.dismiss(item);
  }

  updateSearch() {
    this.showSearchRes = true;
      console.log('modal > updateSearch');
      if (this.autocomplete.query == '') {
          this.autocompleteItems = [];
          return;
      }
      let self = this;
      let config = { 
          types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
          input: this.autocomplete.query, 
          componentRestrictions: { country: 'IN' } 
      }
      this.acService.getPlacePredictions(config, function (predictions, status) {
          console.log('modal > getPlacePredictions > status > ', status);
          self.autocompleteItems = [];            
          predictions.forEach(function (prediction) {              
              self.autocompleteItems.push(prediction);
          });
      });
  }

  loadMap() {
    
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 17.4075691,
          lng: 78.3823673
        },
        zoom: 10,
      },
      controls:{
        myLocationButton:false,
        compass:false,
        mapToolbar:false
      },
      preferences:{

        padding: {

          bottom: 60
        },
      }
    };

    this.mapElement = document.getElementById('map');
    this.map = this.googleMaps.create(this.mapElement, mapOptions);

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {

      this.map.addMarker({
        title: 'Your Location',
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: 17.4075691,
          lng: 78.3823673
        }
      })
      .then(marker => {
        marker.on(GoogleMapsEvent.MARKER_CLICK)
          .subscribe(() => {
            
          });
      });
      this.map.setMyLocationEnabled(true);
      this.locateMe();

    });

    this.map.on(GoogleMapsEvent.CAMERA_MOVE_START).subscribe(() => {

      this.toggleTrans(true);
    });

    this.map.on(GoogleMapsEvent.CAMERA_MOVE_END).subscribe(() => {

      this.toggleTrans(false);
    });
  }


  toggleTrans(active){
    this.zone.run(() => {
      this.classTransActive = active;
    });
  }


  locateMe(){

    this.geolocation.getCurrentPosition().then((resp) => {

      this.alertCtrl.create({
        title: 'Your Location Coordinates!',
        subTitle: `lat: ${resp.coords.latitude}, long: ${resp.coords.longitude}`,
        buttons: ['OK']
      }).present();
      this.map.animateCamera({
        target: {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        },
        zoom: 15,
        duration: 1000
      });

    }).catch((error) => {
      this.alertCtrl.create({
        title: 'Error!',
        subTitle: `Error: ${error}`,
        buttons: ['OK']
      }).present();
    });
  }

}
