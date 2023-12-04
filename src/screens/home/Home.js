import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  PermissionsAndroid,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {useSelector} from 'react-redux';
import CustomHeader from '../../components/CustomHeader';
import HomeBookNow from '../../components/HomeBookNow';
import Loader from '../../components/Loader';
import {get_address, mapDarkStyle} from '../../utils/constance';
import {mapsApiKey} from '../../utils/theme';

export default function Home({navigation}) {
  const [loading, setLoading] = useState(false);
  const {startTrip, continue_trip} = useSelector(state => state.user);
  console.log('startTrip', continue_trip);
  const dimension = useWindowDimensions();
  const mapRef = useRef();
  const [book, setBook] = useState(false);
  const [add1, setAdd1] = useState('');
  const [add2, setAdd2] = useState('');
  const [place1, setPlace1] = useState([]);
  const [place2, setPlace2] = useState('');
  const [coords1, setCoords1] = useState('');
  const [coords2, setCoords2] = useState('');
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  console.log('place1', place1);
  // alert()

  // const requestLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     );
  //     if (granted) {
  //       Geolocation.getCurrentPosition(
  //         position => {
  //           console.log(position);
  //           setCoords1({
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //           });
  //           get_address(
  //             position.coords.latitude,
  //             position.coords.longitude,
  //           ).then(v => setAdd1(v));
  //         },
  //         error => {
  //           // See error code charts below.
  //           console.log('error:-', error.code, error.message);
  //         },
  //         {
  //           accuracy: {android: 'high', ios: 'best'},
  //         },
  //         {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //       );
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // useEffect(() => {
  //   requestLocationPermission();
  // }, []);

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <Loader />
      ) : (
        <View style={{flex: 1, backgroundColor: '#171614'}}>
          <CustomHeader
            left={
              <TouchableOpacity
                onPress={() =>
                  book ? setBook(false) : navigation.openDrawer()
                }
                style={{
                  height: 30,
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={
                    book
                      ? require('../../assets/icons/using/Back.png')
                      : require('../../assets/icons/using/side_bar.png')
                  }
                  style={{height: 22, width: 22, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            }
            imgSource={require('../../assets/icons/using/Logo.png')}
            source2={require('../../assets/icons/using/noti.png')}
            size2={18}
            onPress2={() => navigation.navigate('Inbox')}
          />
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not ussing Google Maps
            style={{flex: 1}}
            customMapStyle={mapDarkStyle}
            ref={mapRef}
            showsMyLocationButton={false}
            userInterfaceStyle="dark"
            showsUserLocation={false}
            // onPress={e => {
            //   console.log(e.nativeEvent.coordinate);
            //   setCoords2(e.nativeEvent.coordinate);
            //   get_address(
            //     e.nativeEvent.coordinate.latitude,
            //     e.nativeEvent.coordinate.longitude,
            //   ).then(address => setAdd2(address));
            // }}
            onRegionChangeComplete={e => console.log('onchange region ', e)}
            // onRegionChange={e => console.log('rigion', e)}
            region={{
              latitude: coords1.latitude || 22.7030465,
              longitude: coords1.longitude || 75.8717318,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}>
            {coords2 != '' && (
              <MapViewDirections
                origin={coords1}
                destination={coords2}
                apikey={mapsApiKey}
                strokeWidth={2}
                strokeColor={'#FFDC00'}
                timePrecision={'now'}
                waypoints={[
                  {
                    latitude: coords1.latitude,
                    longitude: coords1.longitude,
                  },
                  place1.length != 0
                    ? place1[0]
                    : {
                        latitude: coords2.latitude,
                        longitude: coords2.longitude,
                      },
                ]}
                onStart={params => {
                  console.log(
                    `Started routing between "${params.origin}" and "${params.destination}"`,
                  );
                }}
                onReady={result => {
                  console.log(`Distance: ${result.distance} km`);
                  setDistance(result.distance);
                  console.log(`Duration: ${result.duration} min.`);
                  setTime(result.duration);
                }}
                onError={errorMessage => {
                  // console.log('GOT AN ERROR');
                }}
              />
            )}
            {place1.length > 0 ? (
              <Marker coordinate={place1[0]}>
                <Image
                  source={require('../../assets/icons/Pin_1.png')}
                  style={{height: 40, width: 22, resizeMode: 'contain'}}
                />
              </Marker>
            ) : (
              coords1 != '' && (
                <Marker coordinate={coords1}>
                  <Image
                    source={require('../../assets/icons/Pin_1.png')}
                    style={{height: 40, width: 22, resizeMode: 'contain'}}
                  />
                </Marker>
              )
            )}
            {coords2 != '' && (
              <Marker coordinate={coords2}>
                <Image
                  source={require('../../assets/icons/Pin.png')}
                  style={{height: 40, width: 22, resizeMode: 'contain'}}
                />
              </Marker>
            )}
          </MapView>
          {!continue_trip && (
            <HomeBookNow
              book={book}
              setBook={setBook}
              setPlace1={setPlace1}
              setPlace2={setPlace2}
              add1={add1}
              add2={add2}
              time={time}
              distance={distance}
              latlong1={coords1}
              latlong2={coords2}
            />
          )}
          {/* <Continue_Trip /> */}
        </View>
      )}
    </View>
  );
}
