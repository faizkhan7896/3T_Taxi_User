import {showMessage} from 'react-native-flash-message';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {baseUrl, mapsApiKey} from './constance';
import store from '../redux/store';
import {USERDATA} from '../redux/ActionTypes';
import moment from 'moment';

export const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const cords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          // latitude: position.coords.latitude,
          // longitude: position.coords.longitude,
          heading: position?.coords?.heading,
        };
        console;
        resolve(cords);
      },
      error => {
        reject(error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });

export const locationPermission = () =>
  new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
      try {
        const permissionStatus = await Geolocation.requestAuthorization(
          'whenInUse',
        );
        if (permissionStatus === 'granted') {
          return resolve('granted');
        }
        reject('Permission not granted');
      } catch (error) {
        return reject(error);
      }
    }
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )
      .then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          resolve('granted');
        }
        return reject('Location Permission denied');
      })
      .catch(error => {
        console.log('Ask Location permission error: ', error);
        return reject(error);
      });
  });

const showError = message => {
  showMessage({
    message,
    type: 'danger',
    icon: 'danger',
  });
};

const showSuccess = message => {
  showMessage({
    message,
    type: 'success',
    icon: 'success',
  });
};

export {showError, showSuccess};

export const add_time = (date, addtime) => {
  var d = date; // get current date
  console.log(JSON.stringify(moment(date).format('Do MMM')));
  // return
  d.setHours(d.getHours(), d.getMinutes() + addtime, 0, 0);
  return d;
};
export const Get_timeBy_LatLng = (
  pickup_latitude,
  pickup_longitude,
  destination_latitude,
  destination_longitude,
) => {
  const url =
    `https://maps.googleapis.com/maps/api/directions/json?origin=${pickup_latitude},${pickup_longitude}&destination=${destination_latitude},${destination_longitude}&key=` +
    mapsApiKey;

  console.log(url);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.routes && data.routes.length > 0) {
        const duration = data.routes[0].legs[0].duration.text;
        const hours = duration?.split(' hours ') || 0;
        const minutes = hours[1]?.split(' mins')[0];
        const totalMinutes =
          parseFloat(hours[0] * 60 || 0) + parseFloat(minutes);

        const addTime = moment(new Date()).add(6, 'minutes');

        // alert(
        //   JSON.stringify(moment(addTime).format('Do MMM' + ' @' + 'hh:mm a')),
        // );
        return moment(addTime).format('Do MMM' + ' @' + 'hh:mm a');
      }
    })
    .catch(error => console.log('Error fetching directions:', error));
};

export const post_api = async (api_name, body) => {
  try {
    const response = await fetch(baseUrl + api_name, {
      method: 'POST',
      body: body,
      headers: {'content-type': 'multipart/form-data'},
    });
    const res = await response.json();
    // console.log(res);
    return res;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

export const get_Profile = async id => {
  try {
    const body1 = new FormData();
    body1.append('user_id', id);
    const response = await fetch(baseUrl + 'get_profile', {
      method: 'POST',
      body: body1,
      headers: {'content-type': 'multipart/form-data'},
    });
    // console.log('get_Profile');
    const res = await response.json();
    // console.log(res);
    // console.log('get_Profile_userdata===>', res);
    if (res.status) {
      store.dispatch({type: USERDATA, payload: res.result});
    }
  } catch (error) {
    console.log(error);
  }
};
