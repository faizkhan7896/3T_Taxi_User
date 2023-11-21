// export const baseUrl = 'http://162.240.54.118/~taxi/webservice/';
export const baseUrl = 'https://3tdrive.com/webservice/';
// export const baseUrl = 'https://myasp-app.com/3t_taxi/webservice/';
export const mapsApiKey = 'AIzaSyDmLCUMGhVP2osA_Fv5w87nVwiqJbk2HhQ';

import Toast from 'react-native-toast-message';
import _ from 'lodash';
import {getDistance, getPreciseDistance} from 'geolib';

export const ShowToast = (msg, type = 'success', otherProps = {}) =>
  Toast.show({text1: msg, type, ...otherProps});

export const validate = text => {
  console.log(text);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    console.log('Email is Not Correct');
    return false;
  } else {
    console.log('Email is Correct');
    return true;
  }
};

export const calculateDistance = () => {
  var dis = getDistance(
    {latitude: 22.713575518853403, longitude: 75.82227900624275},
    {latitude: 22.713575518853852, longitude: 75.22227900624254},
  );
  // alert(`Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`);
};

export const calculatePreciseDistance = coordinates => {
  var pdis = getPreciseDistance(
    {latitude: coordinates[0].latitude, longitude: coordinates[0].longitude},
    {latitude: coordinates[1].latitude, longitude: coordinates[1].longitude},
  );
  // alert(`Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`);
};

export const get_address = async (latitude, longitude) => {
  const url =
    'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
    latitude +
    ',' +
    longitude +
    '&key=AIzaSyDmLCUMGhVP2osA_Fv5w87nVwiqJbk2HhQ';
  // console.log('get_address',url);
  try {
    const res = await fetch(url);
    const json = await res.json();
    // console.log('get_address',json);
    return json.results[0]?.formatted_address;
  } catch (e) {
    // alert(e.message);
    console.log('get_address', e);
  }
};

export const mapDarkStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f00',
        // color: '#212121',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'on',
        color: '#f00',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#181818',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1b1b1b',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#2c2c2c',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8a8a8a',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#373737',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3c3c3c',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#4e4e4e',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        // color: '#000000',
        color: '#8FD6F6',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        // color: '#3d3d3d',
        color: '#8FD6F6',
      },
    ],
  },
];
