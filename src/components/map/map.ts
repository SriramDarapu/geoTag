import { Component, OnInit } from '@angular/core';
import { ViewController, AlertController } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

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

  address:any = {
    place: '',
    set: false,
  };
  markers = [];
  placedetails: any;

  map: any;
  infoWindow: any;
  marker: any;

  constructor(private viewCtrl: ViewController, private nativeGeocoder: NativeGeocoder, private alertCtrl: AlertController) {
    let that = this;
    setTimeout(() => {
      that.initMap();
    }, 2000);
  }

  ngOnInit() {
    this.showSearchRes = false;
    this.acService = new google.maps.places.AutocompleteService();        
    this.autocompleteItems = [];
    this.autocomplete = {
        query: ''
    };    
    this.initMap();
    this.initPlacedetails();    
  }

  private initMap() {
    let that = this;
    // var point = {lat: -34.603684, lng: -58.381559}; 
    // let divMap = (<HTMLInputElement>document.getElementById('map'));
    // this.map = new google.maps.Map(divMap, {
    //     center: point,
    //     zoom: 15,
    //     // disableDefaultUI: true,
    //     zoomControl: true
    // });
    // this.infoWindow = new google.maps.InfoWindow;
    
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        that.alertCtrl.create({
          title: 'Your Location Coordinates from InitMap!',
          subTitle: `lat: ${pos.lat}, long: ${pos.lng}`,
          buttons: ['OK']
        }).present();
        let divMap = (<HTMLInputElement>document.getElementById('map'));
        that.map = new google.maps.Map(divMap, {
            center: location,
            zoom: 16,
            // disableDefaultUI: true,
            zoomControl: true
        });
        // Create a marker and set its position.
        that.marker = new google.maps.Marker({
          // map: this.map,
          position: location,
          title: 'Hello World!'
        });

        that.marker.setMap(that.map);
        // marker.setMap(this.map);
        // this.infoWindow = new google.maps.InfoWindow;
        // that.infoWindow.setPosition(location);
        // that.infoWindow.setContent('Location found.');
        // that.infoWindow.open(this.map);
        // that.map.setCenter(pos);
        // this.createMapMarker(pos);
        // that.marker = new google.maps.Marker({
        //   position: pos,
        //   map: that.map,
        //   title: 'Hello World!'
        // });
      }, function() {
        that.handleLocationError(true, that.infoWindow, that.map.getCenter(), that.map);
      });
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, this.infoWindow, this.map.getCenter(), this.map);
    }
  }


  // initMap() {
  //   let that = this;
  //   that.map = new google.maps.Map(document.getElementById('map'), {
  //     center: {lat: -34.397, lng: 150.644},
  //     zoom: 16
  //   });
  //   that.infoWindow = new google.maps.InfoWindow;

  //   // Try HTML5 geolocation.
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(function(position) {
  //       var pos = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude
  //       };

  //       that.infoWindow.setPosition(pos);
  //       that.infoWindow.setContent('Location found.');
  //       that.infoWindow.open(that.map);
  //       that.map.setCenter(pos);
  //       that.marker = new google.maps.Marker({
  //         position: pos,
  //         map: that.map,
  //         title: 'Hello World!'
  //       });
  //     }, function() {
  //       that.handleLocationError(true, that.infoWindow, that.map.getCenter(), that.map);
  //     });
  //   } else {
  //     // Browser doesn't support Geolocation
  //     that.handleLocationError(false, that.infoWindow, that.map.getCenter(), that.map);
  //   }
  // }

  handleLocationError(browserHasGeolocation, infoWindow, pos, map) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

  chooseItem(item: any) {
    let self = this;
    self.showSearchRes = false;
    console.log('modal > chooseItem > item > ', item);
    self.getPlaceDetail(item.place_id);
    // self.viewCtrl.dismiss(item);
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

  getPlaceDetail(place_id:string):void {
    var self = this;
    var request = {
        placeId: place_id
    };
    self.alertCtrl.create({
      title: 'Your Location Coordinates!',
      subTitle: `Selected item: ${place_id}`,
      buttons: ['OK']
    }).present();
    this.placesService = new google.maps.places.PlacesService(this.map);
    this.placesService.getDetails(request, callback);
    function callback(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            console.log('page > getPlaceDetail > place > ', place);
            // set full address
            self.placedetails.address = place.formatted_address;
            self.placedetails.lat = place.geometry.location.lat();
            self.placedetails.lng = place.geometry.location.lng();
            for (var i = 0; i < place.address_components.length; i++) {
                let addressType = place.address_components[i].types[0];
                let values = {
                    short_name: place.address_components[i]['short_name'],
                    long_name: place.address_components[i]['long_name']
                }
                if(self.placedetails.components[addressType]) {
                    self.placedetails.components[addressType].set = true;
                    self.placedetails.components[addressType].short = place.address_components[i]['short_name'];
                    self.placedetails.components[addressType].long = place.address_components[i]['long_name'];
                }                                     
            }                  
            // set place in map
            self.map.setCenter(place.geometry.location);
            self.createMapMarker(place);
            // populate
            self.address.set = true;
            console.log('page > getPlaceDetail > details > ', self.placedetails);
        }else{
            console.log('page > getPlaceDetail > status > ', status);
        }
    }
  }

  createMapMarker(place:any):void {
    var placeLoc = place.geometry.location;
    let image = "assets/img/store.png";
    var marker = new google.maps.Marker({
      map: this.map,
      position: placeLoc,
      icon: image
    });    
    this.markers.push(marker);
  }

  initPlacedetails() {
    this.placedetails = {
        address: '',
        lat: '',
        lng: '',
        components: {
            route: { set: false, short:'', long:'' },                           // calle 
            street_number: { set: false, short:'', long:'' },                   // numero
            sublocality_level_1: { set: false, short:'', long:'' },             // barrio
            locality: { set: false, short:'', long:'' },                        // localidad, ciudad
            administrative_area_level_2: { set: false, short:'', long:'' },     // zona/comuna/partido 
            administrative_area_level_1: { set: false, short:'', long:'' },     // estado/provincia 
            country: { set: false, short:'', long:'' },                         // pais
            postal_code: { set: false, short:'', long:'' },                     // codigo postal
            postal_code_suffix: { set: false, short:'', long:'' },              // codigo postal - sufijo
        }    
    };        
  }   

}
