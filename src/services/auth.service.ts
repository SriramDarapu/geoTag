import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class AuthService {

    serviceData = {
        domain: "http://ec2-34-215-112-156.us-west-2.compute.amazonaws.com:8080/", //"http://localhost:5000/",
        url: {
            registration: "registration",
            otpValidation: "validateOtp",
            profileCompletion: "profileUpdate",
            getProfile: "usersListData",
            updateProfile: "userProfileUpdate"
        }
    };

    constructor(private http: Http) {}

    signInUser(data: any) {
        const link = this.serviceData.domain + this.serviceData.url.registration;     
        return this.http.post(link, data).map(
            (response: Response) => {
                return response.json();
            }
        );
    }

    validateOtp(data: any) {
        const link = this.serviceData.domain + this.serviceData.url.otpValidation;
        return this.http.post(link, data).map(
            (response: Response) => {
                return response.json();
            }
        )
    }

    completeProfile(data: any) {
        const link = this.serviceData.domain + this.serviceData.url.profileCompletion+"/"+data.id;
        return this.http.post(link, data).map(
            (response: Response) => {
                return response.json();
            }
        )
    }

    getProfileData(data: any) {
        const link = this.serviceData.domain + this.serviceData.url.getProfile+"/"+data.id;
        return this.http.get(link).map(
            (response: Response) => {
                return response.json();
            }
        )
    }

    updateUserProfile(data: any) {
        // alert(`In UpdateUserProfile ${JSON.stringify(data)}`);
        const link = this.serviceData.domain + this.serviceData.url.updateProfile+"/"+data.id;
        return this.http.post(link, data).map(
            (response: Response) => {
                // alert(`In UpdateUserProfile response ${JSON.stringify(data)}`);
                return response.json();
            }
        )
    }
}