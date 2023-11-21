// import {
//   View,
//   Text,
//   useWindowDimensions,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ImageBackground,
//   TextInput,
//   Dimensions,
// } from 'react-native';
// import React, {useEffect, useRef, useState} from 'react';
// import {theme} from '../../utils/theme';
// import Statusbar from '../../components/Statusbar';
// import {useNavigation} from '@react-navigation/native';
// import CustomButton_2 from '../../components/CustomButton_2';
// import MapView, {Marker} from 'react-native-maps';
// import {get_address, mapDarkStyle} from '../../utils/constance';
// import {ImagePath} from '../../utils/ImagePath';
// import { locationPermission } from '../../utils/Constants';

// const screen = Dimensions.get('window');
// const ASPECT_RATIO = screen.width / screen.height;
// const LATITUDE_DELTA = 0.04;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// export default function SeupProfile() {
//   const dimension = useWindowDimensions();
//   const navigation = useNavigation();
//   const mapRef = useRef();
//   const markerRef = useRef();

//   const [state, setState] = useState({
//     curLoc: {
//       latitude: 30.7046,
//       longitude: 77.1025,
//       latitudeDelta: LATITUDE_DELTA,
//       longitudeDelta: LONGITUDE_DELTA,
//     },
//     address1: '',
//     address2: '',
//     destinationCords: {},
//     isLoading: false,
//     coordinate: {
//       latitude: 30.7046,
//       longitude: 77.1025,
//       latitudeDelta: LATITUDE_DELTA,
//       longitudeDelta: LONGITUDE_DELTA,
//     },
//     // coordinate: new AnimatedRegion({
//     //   latitude: 30.7046,
//     //   longitude: 77.1025,
//     //   latitudeDelta: LATITUDE_DELTA,
//     //   longitudeDelta: LONGITUDE_DELTA,
//     // }),
//     time: 0,
//     distance: 0,
//     heading: 0,
//   });
//   const [MarkerDraged, setMarkerDraged] = useState(false);
//   console.log(coordinate);
//   const {
//     curLoc,
//     time,
//     distance,
//     destinationCords,
//     isLoading,
//     coordinate,
//     heading,
//     address1,
//     address2,
//   } = state;
//   const updateState = data => setState(state => ({...state, ...data}));

//   const getLiveLocation = async () => {
//     const locPermissionDenied = await locationPermission();
//     if (locPermissionDenied) {
//       const {latitude, longitude, heading} = await getCurrentLocation();
//       // console.log('address_1',),
//       get_address(latitude, longitude).then(v =>
//         updateState({
//           address1: v,
//         }),
//       );
//       onCenter();
//       console.log('console.log(address_1,)', address1);
//       animate(latitude, longitude);
//       //   console.log('get live location after 4 second', heading);
//       updateState({
//         heading: heading,
//         curLoc: {latitude, longitude},
//         coordinate: new AnimatedRegion({
//           latitude: latitude,
//           longitude: longitude,
//           latitudeDelta: LATITUDE_DELTA,
//           longitudeDelta: LONGITUDE_DELTA,
//         }),
//       });
//     }
//   };

//   const onCenter = () => {
//     mapRef.current.animateToRegion(
//       {
//         latitude: curLoc.latitude,
//         longitude: curLoc.longitude,
//         latitudeDelta: LATITUDE_DELTA,
//         longitudeDelta: LONGITUDE_DELTA,
//       },
//       1000,
//     );
//   };

//   useEffect(() => {
//     getLiveLocation();
//     getDragLocation()
//   }, []);

//   const getDragLocation = async () => {
//     const locPermissionDenied = await locationPermission();
//     if (locPermissionDenied) {
//       get_address(curLoc?.latitude, curLoc?.longitude).then(v =>
//         updateState({
//           address1: v,
//         }),
//       );
//       onCenter();
//       console.log('console.log(address_1,)', address1);
//       animate(curLoc?.latitude, curLoc?.longitude);
//     }
//   };

//   // alert(JSON.stringify(address1))

//   return (
//     <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
//       <Statusbar
//         barStyle={'light-content'}
//         backgroundColor={theme.colors.ButtonText}
//       />
// <View
//   style={{
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 16,
//     marginVertical: 15,
//   }}>
//   <TouchableOpacity
//     onPress={() => navigation.goBack()}
//     style={{
//       height: 30,
//       width: 30,
//       justifyContent: 'center',
//       alignItems: 'center',
//     }}>
//     <Image
//       source={require('../../assets/icons/using/Back.png')}
//       style={{height: 26, width: 26, resizeMode: 'contain'}}
//     />
//   </TouchableOpacity>
//   <View style={styles.searchBar}>
//     <Image
//       source={require('../../assets/icons/using/Pin.png')}
//       style={styles.img}
//     />
//     <TextInput
//       placeholder="Enter location"
//       placeholderTextColor={'#BAB6AE'}
//       value={address1}
//       style={{
//         flex: 1,
//         marginHorizontal: 10,
//         fontSize: 16,
//         fontFamily: 'Jost-Regular',
//         color: '#fff',
//       }}
//       editable={false}
//     />
//     <Image
//       source={require('../../assets/icons/using/search.png')}
//       style={styles.img}
//     />
//   </View>
// </View>

//       <View style={{flex: 1}}>
//         <MapView
//           ref={mapRef}
//           style={StyleSheet.absoluteFill}
//           customMapStyle={mapDarkStyle}
//           // region={curLoc}>
//           initialRegion={curLoc}>
//           <Marker
//             draggable
//             onPress={() => {
//               // alert()
//               // setMarkerDraged(!MarkerDraged);
//               ShowToast("Long Press the marker for dragging!');
//             }}
//             onDragEnd={v => {
//               const lat = v?.nativeEvent?.coordinate?.latitude;
//               const lon = v?.nativeEvent?.coordinate?.longitude;
//               console.log(lat, lon);

//               updateState({
//                 curLoc: {
//                   latitude: v?.nativeEvent?.coordinate?.latitude,
//                   longitude: v?.nativeEvent?.coordinate?.longitude,
//                 },
//               });
//             }}
//             coordinate={{
//               ...curLoc,
//               latitudeDelta: LATITUDE_DELTA,
//               longitudeDelta: LONGITUDE_DELTA,
//             }}>
//             <Image
//               source={ImagePath.red_pin}
//               style={{height: 40, width: 22, resizeMode: 'contain'}}
//             />
//           </Marker>
//         </MapView>
//       </View>
//       <View style={{position: 'absolute', width: '100%', bottom: 30}}>
//         <CustomButton_2
//           title={'Select This Location'}
//           bgColor="#FFDC00"
//           color={'#000'}
//           mh={16}
//         />
//       </View>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   img: {height: 18, width: 18, resizeMode: 'contain'},
// searchBar: {
//   height: 50,
//   flex: 1,
//   backgroundColor: '#25231F',
//   borderWidth: 1,
//   borderColor: '#36342F',
//   borderRadius: 8,
//   flexDirection: 'row',
//   alignItems: 'center',
//   paddingHorizontal: 15,
//   marginLeft: 10,
// },
// });

import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {AnimatedRegion, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {ADDRESS, TRIP_DATA} from '../../redux/ActionTypes';
import store from '../../redux/store';
import {
  getCurrentLocation,
  locationPermission,
  post_api,
  showError,
} from '../../utils/Constants';
import {ImagePath} from '../../utils/ImagePath';
import {
  ShowToast,
  get_address,
  mapDarkStyle,
  mapsApiKey,
} from '../../utils/constance';
import {theme} from '../../utils/theme';
import localizationStrings from '../../utils/Localization';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const HomeMap = () => {
  const {userId, startTrip, countryId, booking_id, address_, tripData} =
    useSelector(state => state?.user);
  const {params} = useRoute();
  const navigation = useNavigation();

  console.log('tripData', tripData);
  const mapRef = useRef();
  const markerRef = useRef();
  const [book, setBook] = useState('0');
  const [BookingType, setBookingType] = useState('');
  const [state, setState] = useState({
    curLoc: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    address1: '',
    address2: '',
    destinationCords: {},
    isLoading: false,
    coordinate: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    // coordinate: new AnimatedRegion({
    //   latitude: 30.7046,
    //   longitude: 77.1025,
    //   latitudeDelta: LATITUDE_DELTA,
    //   longitudeDelta: LONGITUDE_DELTA,
    // }),
    time: 0,
    distance: 0,
    heading: 0,
  });
  const [MarkerDraged, setMarkerDraged] = useState(false);
  console.log(coordinate);
  const {
    curLoc,
    time,
    distance,
    destinationCords,
    isLoading,
    coordinate,
    heading,
    address1,
    address2,
  } = state;
  const updateState = data => setState(state => ({...state, ...data}));

  const [updatedLocation, setUpdatedLocation] = useState();
  const [updatedDropLocation, setUpdatedDropLocation] = useState();

  // alert(JSON.stringify(address1));

  const GetTrip = async () => {
    const body = new FormData();
    body.append('request_id', booking_id);

    console.log(body);

    post_api('get_booking_details', body)
      .then(v => {
        console.log('distanceCalculation===>', v);

        if (v.status == 1) {
          store.dispatch({type: TRIP_DATA, payload: v.result});
        }
      })
      .catch(e => {
        showError(e);
      });
  };

  useEffect(() => {
    GetTrip();
    getLiveLocation();
  }, []);

  useEffect(() => {
    getDragLocation();

    // params?.state('Alfaiz')
  }, [updatedLocation]);

  const getDragLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      get_address(updatedLocation?.latitude, updatedLocation?.longitude).then(
        v =>
          updateState({
            address1: v,
          }),
      );
      get_address(updatedLocation?.latitude, updatedLocation?.longitude).then(
        v =>
          store.dispatch({
            type: ADDRESS,
            payload: {
              address: v,
              lat: updatedLocation?.latitude,
              lon: updatedLocation?.longitude,
            },
          }),
        alert(JSON.stringify(address_?.address)),
      );
      onCenter();
      console.log('console.log(address_1,)', address1);

      animate(updatedLocation?.latitude, updatedLocation?.longitude);
    }
  };

  console.log(
    'curLoc?.latitude, curLoc?.longitude',
    curLoc?.latitude,
    curLoc?.longitude,
  );

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const {latitude, longitude, heading} = await getCurrentLocation();
      console.log('latitude,ongitudelatitude, longitude', latitude, longitude),
        updateState({
          coordinate: new AnimatedRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }),
        });
      get_address(latitude, longitude).then(v =>
        updateState({
          address1: v,
        }),
      );
      onCenter();
      console.log('console.log(address_1,)', address1);
      //   console.log('get live location after 4 second', heading);
      updateState({
        heading: heading,
        curLoc: {latitude, longitude},
      });
      animate(latitude, longitude);
    }
  };
  const animate = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};

    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 2000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  const onCenter = () => {
    {
      curLoc.latitude != 0 &&
        mapRef.current.animateToRegion(
          {
            latitude: curLoc.latitude,
            longitude: curLoc.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          1000,
        );
    }
  };

  const fetchTime = (d, t) => {
    updateState({
      distance: d,
      time: t,
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 16,
          marginVertical: 15,
          backgroundColor: theme.colors.ButtonText,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SavePalace', {address: address1})}
          style={{
            height: 30,
            width: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/icons/using/Back.png')}
            style={{height: 26, width: 26, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <View
          style={{
            height: 50,
            flex: 1,
            backgroundColor: '#25231F',
            borderWidth: 1,
            borderColor: '#36342F',
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
            marginLeft: 10,
          }}>
          <Image
            source={require('../../assets/icons/using/Pin.png')}
            style={{height: 18, width: 18, resizeMode: 'contain'}}
          />
          <TextInput
            placeholder="Enter location"
            placeholderTextColor={'#BAB6AE'}
            value={address1}
            style={{
              flex: 1,
              marginHorizontal: 10,
              fontSize: 10,
              fontFamily: 'Jost-Regular',
              color: '#fff',
              height: 70,
            }}
            editable={false}
            multiline
            numberOfLines={2}
          />
          <Image
            source={require('../../assets/icons/using/search.png')}
            style={{height: 18, width: 18, resizeMode: 'contain'}}
          />
        </View>
      </View>
      {curLoc?.latitude != 0 && (
        <View style={{flex: 1}}>
          <MapView
            ref={mapRef}
            style={StyleSheet.absoluteFill}
            customMapStyle={mapDarkStyle}
            initialRegion={{
              latitude: curLoc.latitude,
              longitude: curLoc.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            <Marker
              draggable
              onPress={() => {
                // alert()
                setMarkerDraged(!MarkerDraged);
                ShowToast(localizationStrings?.msg_marker_dragging);
              }}
              onDragEnd={v => {
                const lat = v?.nativeEvent?.coordinate?.latitude;
                const lon = v?.nativeEvent?.coordinate?.longitude;
                console.log('onDragEndonDragEndonDragEnd', v);
                setMarkerDraged(true);

                setUpdatedLocation(v?.nativeEvent?.coordinate);
                updateState({
                  curLoc: {
                    latitude: v?.nativeEvent?.coordinate?.latitude,
                    longitude: v?.nativeEvent?.coordinate?.longitude,
                  },
                });
              }}
              coordinate={{
                ...curLoc,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}>
              <Image
                source={ImagePath.red_pin}
                style={{height: 40, width: 22, resizeMode: 'contain'}}
              />
            </Marker>

            {Object?.keys(destinationCords)?.length > 0 && (
              <Marker
                draggable
                onPress={() => {
                  // alert()
                  setMarkerDraged(!MarkerDraged);
                  ShowToast(localizationStrings?.msg_marker_dragging);
                }}
                onDragEnd={v => {
                  setMarkerDraged(true);
                  setUpdatedDropLocation(v?.nativeEvent?.coordinate);
                  updateState({
                    destinationCords: {
                      latitude: v?.nativeEvent?.coordinate?.latitude,
                      longitude: v?.nativeEvent?.coordinate?.longitude,
                    },
                  });
                }}
                coordinate={destinationCords}>
                <Image
                  source={ImagePath.blue_pin}
                  style={{height: 40, width: 22, resizeMode: 'contain'}}
                />
              </Marker>
            )}

            {Object?.keys(destinationCords)?.length > 0 && (
              <MapViewDirections
                origin={curLoc}
                destination={{
                  // latitude: requestData[0]?.picuplat,
                  // longitude: requestData[0]?.pickuplon,
                  ...destinationCords,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}
                apikey={mapsApiKey}
                strokeWidth={2}
                strokeColor="#FFDC00"
                optimizeWaypoints={true}
                onStart={params => {
                  console.log(
                    `Started routing between "${params.origin}" and "${params.destination}"`,
                  );
                }}
                onReady={result => {
                  console.log(`Distance: ${result.distance} km`);
                  console.log(`Duration: ${result.duration} min.`);
                  fetchTime(result.distance, result.duration),
                    mapRef.current.fitToCoordinates(result.coordinates, {
                      edgePadding: {
                        right: 10,
                        bottom: 180,
                        left: 10,
                        top: 10,
                      },
                    });
                }}
                onError={errorMessage => {
                  console.log('GOT AN ERROR');
                }}
              />
            )}
          </MapView>
          {startTrip || (
            <TouchableOpacity
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                position: 'absolute',
                backgroundColor: '#36342F',
                bottom: 50,
                right: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={onCenter}>
              <Icon name="my-location" size={25} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* {startTrip || (
        <ChooseLocation
          setMarkerDraged={setMarkerDraged}
          MarkerDraged={MarkerDraged}
          getCordinates1={fetchValue1}
          getCordinates2={fetchValue2}
          onBookNow_press={() => checkValid()}
          onBooklater_press={() => checkValid_Later()}
          book={book}
          setBook={setBook}
          add1={address1}
          lat1={curLoc?.latitude}
          lon1={curLoc?.longitude}
          drop_lat={destinationCords?.latitude}
          drop_lon={destinationCords?.longitude}
          Drop_address={address2}
          distance={distance}
          time={time}
          BookingType={BookingType}
        />
      )}
      {tripData?.status == 'Start' && <Continue_Trip />}
      {tripData?.status == 'Ride_Start' && <Start_Trip />} */}
    </View>
  );
};

export default HomeMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.ButtonText,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 0,
    borderLeftWidth: 5,
    borderTopColor: '#D9D9D9',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    marginBottom: 3,
  },
});
