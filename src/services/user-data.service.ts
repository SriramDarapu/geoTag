// import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

// import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
// import { Geolocation } from '@ionic-native/geolocation';
@Injectable()
export class UserDataService {
    userData = {
        id: '',
        name: '',
        phone: '',
        email: '',
        profilePic: ''
    };

    imageData = '';

    isEditable = false;
    
    // public mysubject: Subject<any> = new Subject();

    // constructor(
    //     private geolocation: Geolocation,
    //     private nativeGeocoder: NativeGeocoder
    // ) {}

    setEditVal() {
        this.isEditable = true;
        // this.mysubject.next({isEdit: true});
    }

    setUserData(data: any) {
        this.userData['id'] = data._id;
        this.userData['name'] = data.name;
        this.userData['phone'] = data.phone;
        this.userData['email'] = data.email;
        this.userData['profilePic'] = data.profilePicture;
    }

    setImageData(image: string) {
        this.imageData = image;
    }

    getEditable() {
        return this.isEditable;
    }

    getUserData() {
        return this.userData;
    }

    getImageData() {
        return this.imageData;
    }

    // getCurrentLocation() {
    //     this.geolocation.getCurrentPosition().then((resp) => {
    //     // resp.coords.latitude
    //     // resp.coords.longitude
    //     this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
    //         .then((result: NativeGeocoderReverseResult) => {
    //             const location = JSON.stringify(result)
    //             console.log(location);
    //             return result;
    //         })
    //         .catch((error: any) => console.log(error));
    //     }).catch((error) => {
    //     console.log('Error getting location', error);
    //     });
    // }
}