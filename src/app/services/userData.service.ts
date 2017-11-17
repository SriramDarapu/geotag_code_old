import { Subject } from "rxjs";
import { Deals } from "../components/postdeals/deals.model";

// import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
// import { Geolocation } from '@ionic-native/geolocation';

export class UserDataService {
    allowEdit: boolean;
    userData = {
        id: '',
        name: '',
        phone: '',
        email: '',
        location: '',
        radius: '',
        businessCategory: '',
        address:''
    };

    dealsData: Deals[];

    imageData = '';
    isRegistered = null;
    isLoggedIn = false;
    subject: Subject<any> = new Subject();

    setUserData(data: any) {
        this.userData['id'] = data._id;
        this.userData['name'] = data.business_name;
        this.userData['phone'] = data.phone;
        this.userData['email'] = data.email;
        this.userData['location'] = data.location;
        this.userData['radius'] = data.radius;
        this.userData['businessCategory'] = data.business_ctgry;
        this.userData['address'] = data.address;
    }

    setImageData(image: string) {
        this.imageData = image;
    }

    setRegisteredToken(val: boolean) {
        this.isRegistered = val;
    }

    setLoggedIn(val: any) {
        this.isLoggedIn = val;
        this.subject.next(this.isLoggedIn);
    }

    setDealsData(data: any) {
        this.dealsData = data;
    }

    setEditval() {
        this.allowEdit = true;
    }

    getUserData() {
        return this.userData;
    }

    getDealsData() {
        return this.dealsData;
    }

    getImageData() {
        return this.imageData;
    }

    getRegisteredToken() {
        return this.isRegistered;
    }

    getLoggedIn() {
        return this.isLoggedIn;
    }

    getEditval() {
        return this.allowEdit;
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
