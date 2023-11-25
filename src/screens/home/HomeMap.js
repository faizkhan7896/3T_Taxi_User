import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {AnimatedRegion, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import ChooseLocation from '../../components/ChooseLocation';
import Continue_Trip from '../../components/Continue_Trip';
import CustomHeader from '../../components/CustomHeader';
import {
  ADDRESS,
  BOOKING_STATUS,
  B_ID,
  CONTINUE_FALSE,
  CONTINUE_TRUE,
  END,
  START,
  START_TRUE,
  TRIP_DATA,
} from '../../redux/ActionTypes';
import store from '../../redux/store';
import Start_Trip from '../../screens/home/Start_Trip';
import {
  getCurrentLocation,
  get_Profile,
  locationPermission,
  post_api,
  showError,
} from '../../utils/Constants';
import {ImagePath} from '../../utils/ImagePath';
import {
  ShowToast,
  baseUrl,
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

const MARKERS = [
  {latitude: 22.761794329667982, longitude: 75.88739432394505},
  {latitude: 22.761794329667982, longitude: 75.89292671531439},
  {latitude: 22.757228500578126, longitude: 75.89016135782003},
  {latitude: 22.75746563806522, longitude: 75.88488578796387},
  {latitude: 22.752597898978536, longitude: 75.88765282183886},
  {latitude: 22.753667060297012, longitude: 75.8931852132082},
  {latitude: 22.718897408101107, longitude: 75.87684486061335},
  {latitude: 22.721981027815573, longitude: 75.87356217205524},
  {latitude: 22.71557217938178, longitude: 75.87382100522517},
  {latitude: 22.711539550780383, longitude: 75.87684486061335},
  {latitude: 22.71842299890038, longitude: 75.86970280855894},
  {latitude: 22.712013983840972, longitude: 75.87053831666708},
];

const HomeMap = ({navigation}) => {
  const {
    userId,
    startTrip,
    userData,
    countryId,
    booking_id,
    address_,
    tripData,
    booking_status,
    cityId,
  } = useSelector(state => state?.user);
  const [isFocused, setIsFocused] = useState(true);
  const [driverLatLon, setdriverLatLon] = useState({});

  // alert(JSON.stringify(cityId));
  // console.log('tripData', tripData);
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
  // console.log(coordinate);
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

  // Mørtelverksbakken 19, 0580 Oslo, Norway
  const [updatedLocation, setUpdatedLocation] = useState();
  const [updatedDropLocation, setUpdatedDropLocation] = useState();
  const [TollData, setTollData] = useState({});
  const [marker, setMarker] = useState(null);
  const [lat, setLat] = useState(true);

  const [AddsBanner, setAddsBanner] = useState();
  const [modal, setModal] = useState(false);
  const [DriversNearBy, setDriversNearBy] = useState([]);

  // alert(JSON.stringify(startTrip))
  // alert(JSON.stringify(book))

  // alert(JSON.stringify(userData))
  // alert(JSON.stringify(tripData?.status))

  const country =
    countryId == '4'
      ? 'INR'
      : countryId == '9'
      ? 'NOK'
      : countryId == '10'
      ? 'EGP'
      : countryId == '11' && 'SAR';

  const GetToll = async () => {
    try {
      var requestOptions = {
        method: 'GET',
      };

      const response = await fetch(
        'https://router.hereapi.com/v8/routes?origin=' +
          curLoc?.latitude +
          ',' +
          curLoc?.longitude +
          '&destination=' +
          destinationCords?.latitude +
          ',' +
          destinationCords?.longitude +
          '&return=tolls&transportMode=car&departureTime=' +
          moment(new Date()).format('yyyy-MM-DDTh:mm:ss') +
          '&currency=' +
          country +
          '&apikey=thMhMyY4WurTOql3MeQnbad_YODxRL8N0JT4pAjL3qw',
      );

      console.log('GetTollGetTollGetToll', response.url);
      // return;

      const res = await response.json();
      console.log(
        'GetTollGetTollGetToll',
        res?.routes[0]?.sections[0]?.tolls[0]?.fares[0]?.convertedPrice,
      );

      if (res?.routes?.length == 1) {
        // alert(JSON.stringify(res?.routes[0]))
        setTollData(res?.routes[0]?.sections[0]);
      } else {
        ShowToast(res.title || 'Unknown error', 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetNearestDriver = async () => {
    const {latitude, longitude, heading} = await getCurrentLocation();

    try {
      var requestOptions = {
        method: 'GET',
      };

      const url =
        baseUrl + 'get_nearest_driver?lat=' + latitude + '&lon=' + longitude;

      // console.log('Nearest Driver URL.....................', url);
      const response = await fetch(url, requestOptions);
      const res = await response.json();
      // console.log('Nearest Driver.....................', res);

      if (res.status == '1') {
        // alert(JSON.stringify(res?.message));
        setDriversNearBy(res?.result);
        // setCountry(res);
      } else {
        setDriversNearBy([]);
        // ShowToast(result.message || 'Unknown error', 'error');
      }
    } catch (error) {
      showError(error);
    }
  };

  const GetTrip = async () => {
    const body = new FormData();
    body.append('request_id', booking_id);

    post_api('get_booking_details', body)
      .then(v => {
        // console.log('booking detail api v - ', v);

        console.log('______________________', v?.result[0]?.status);
        // console.log('booking_id______________________', booking_id);

        if (v.status == 1) {
          animateMarker(
            v?.result[0]?.driver_details?.lat,
            v?.result[0]?.driver_details?.lon,
          );
          store.dispatch({type: TRIP_DATA, payload: v.result[0]});

          if (
            v?.result[0]?.status == 'Finish' &&
            v?.result[0]?.review_by_user == false
          ) {
            navigation.navigate('TripEnd');
            // alert('TripEnd');
          }
          if (v?.result[0]?.review_by_user == true) {
            // alert(JSON.stringify(v?.result[0]?.status));
            navigation.navigate('HomeMap');

            setBook(0);
            store.dispatch({type: B_ID, booking_id: ''});
            store.dispatch({type: TRIP_DATA, payload: {}});
          }
          if (v?.result[0]?.status == 'Cancel') {
            // alert(JSON.stringify(v?.result[0]?.status));

            store.dispatch({type: BOOKING_STATUS, booking_id: 'FINISH'});
            store.dispatch({type: B_ID, booking_id: ''});
            store.dispatch({type: START, startTrip: false});
            store.dispatch({type: END, startTrip: false});
            store.dispatch({type: TRIP_DATA, tripData: {}});
            store.dispatch({type: CONTINUE_TRUE, continue_trip: false});
            store.dispatch({type: START_TRUE, start_trip: false});
            store.dispatch({type: CONTINUE_FALSE, continue_trip: false});
            navigation.navigate('HomeMap');
            setBook(0);
          }
        }
      })
      .catch(e => {
        showError(e);
      });
  };

  const animateMarker = (lat, lon) => {
    // alert('cds')
    const newCoordinate = {
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    if (Platform.OS === 'android') {
      if (marker) {
        marker.animateMarkerToCoordinate(newCoordinate, 5000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  useEffect(() => {
    // setBook(0);

    // CLEAR ALL DATA & REDUX

    // store.dispatch({type: BOOKING_STATUS, booking_status: 'FINISH'});
    // store.dispatch({type: B_ID, booking_id: ''});
    // store.dispatch({type: START, startTrip: true});
    // store.dispatch({type: END, startTrip: false});
    // store.dispatch({type: TRIP_DATA, tripData: {}});
    // store.dispatch({type: CONTINUE_TRUE, continue_trip: false});
    // store.dispatch({type: START_TRUE, start_trip: false});
    // store.dispatch({type: CONTINUE_FALSE, continue_trip: false});

    if (startTrip == undefined) {
      store.dispatch({type: START, startTrip: false});
      store.dispatch({type: END, startTrip: false});
    }

    if (address_?.address == undefined) {
      updateState({
        address2: '',
        destinationCords: {},
      });
    }
    if (address_?.address != undefined) {
      // alert('ferrefce')
      updateState({
        address2: address_.address,
        destinationCords: {
          latitude: parseFloat(address_?.lat),
          longitude: parseFloat(address_?.lon),
        },
      });
      store.dispatch({
        type: ADDRESS,
        payload: {},
      });
      // setMarkerDraged(true); make a complex & logican task for a React Native developer 3 year experience include Redux, signup through Redux, Login through Redux, session timeout, etc
    }

    getLiveLocation();
    get_Profile(userId);
    // store.dispatch({type: BOOKING_STATUS, booking_status: 1});

    const body3 = new FormData();
    body3.append('user_id', userId);
    body3.append('country_id', userData?.country);

    const int = setInterval(() => {
      GetNearestDriver();
      GetTrip(true);
      if (isFocused) {
        setLat(!lat);
        post_api('get_ads_notice', body3).then(v => {
          // console.log('get_ads_notice', v);
          // alert()
          if (v.status === '1') {
            setAddsBanner(v.result);
            setModal(true);
          } else {
            // ShowToast(v.message, 'error');
          }
        });
      }
    }, 2500);
    return () => clearInterval(int);
  }, [isFocused, tripData]);

  async function RemoveBanner() {
    try {
      const url = baseUrl + 'add_remove_title';
      const body = new FormData();
      body.append('user_id', userId);
      body.append('board_id', AddsBanner[0]?.id);

      const res = await fetch(url, {
        method: 'post',
        headers: {'content-type': 'multipart/form-data'},
        body: body,
      });

      const rslt = await res.json();
      console.log('CAR Data =>', rslt);
      if (rslt.status == 1) {
        setModal(false);
      } else {
        // ShowToast(rslt.message, 'error');
      }
    } catch (e) {
      // alert('An error occured.');
      console.log(e);
    }
  }

  useEffect(() => {
    getDragLocation();
  }, [updatedLocation]);

  useEffect(() => {
    getDropDragLocation();
  }, [updatedDropLocation]);

  const getDragLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      console.log('curLoc - ', curLoc);
      get_address(curLoc?.latitude, curLoc?.longitude).then(v => {
        console.log('v 1 - ', v);
        updateState({
          address1: v,
        });
      });
      onCenter();
      console.log('console.log(address_1,)', address1);
      animate(curLoc?.latitude, curLoc?.longitude);
    }
  };

  const getDropDragLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      console.log('locations latitued - ', destinationCords?.latitude);
      get_address(destinationCords?.latitude, destinationCords?.longitude).then(
        v => {
          console.log('v data - ', address1);
          updateState({
            address2: v,
          });
        },
      );
      onCenter();
      console.log('console.log(address_1,)', address1);
      animate(destinationCords?.latitude, destinationCords?.longitude);
    }
  };

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const {latitude, longitude, heading} = await getCurrentLocation();
      get_address(latitude, longitude).then(v => {
        updateState({
          address1: v,
        });
      });
      onCenter();
      // console.log('console.log(address_1,)', address1);
      animate(latitude, longitude);
      //   console.log('get live location after 4 second', heading);
      updateState({
        heading: heading,
        curLoc: {latitude, longitude},
        coordinate: new AnimatedRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      });
    }
  };

  const fetchValue1 = data => {
    console.log('this is Pickup data', data);
    animate(data.lat, data.lng);
    onCenter();
    updateState({
      address1: data.address,
      curLoc: {latitude: data.lat, longitude: data.lng},
      coordinate: {
        latitude: data.lat,
        longitude: data.lng,
      },
    });
  };

  const fetchValue2 = data => {
    // alert(JSON.stringify( data));
    console.log(
      'fetchDestinationCords2fetchDestinationCords2fetchDestinationCords2',
      data,
    );

    updateState({
      address2: data.address,
      destinationCords: {
        latitude: data.lat,
        longitude: data.lng,
      },
    });
  };

  const checkValid = async () => {
    // Get_timeBy_LatLng(19.076, 72.8777, 22.9676, 76.0534);

    // console.log('Get_timeBy_LatLngGet_timeBy_LatLngGet_timeBy_LatLngGet_timeBy_LatLng',
    //   Get_timeBy_LatLng(
    //     curLoc?.latitude,
    //     curLoc?.longitude,
    //     destinationCords?.latitude,
    //     destinationCords?.longitude,
    //   ),
    // );

    // console.log(
    //   'lat1, lon1, drop_lat, drop_lon',
    //   curLoc?.latitude,
    //   curLoc?.longitude,
    //   destinationCords?.latitude,
    //   destinationCords?.longitude,
    // );
    // return;
    if (Object.keys(destinationCords).length === 0) {
      showError(localizationStrings?.msg_destination_location);
      return false;
    }
    GetToll();
    setTimeout(() => {
      setBook('2');
      setBookingType('now');
    }, 2000);
    return true;
  };

  const checkValid_Later = () => {
    if (Object.keys(destinationCords).length === 0) {
      showError(localizationStrings?.msg_destination_location);
      return false;
    }
    setBook('1');
    setBookingType('later');
    return true;
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
      <CustomHeader
        left={
          <TouchableOpacity
            onPress={() =>
              book == '1' || book == '2'
                ? setBook('0')
                : navigation.openDrawer()
            }
            style={{
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={
                book == '1' || book == '2'
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

      {curLoc.latitude != 0 && (
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
            {startTrip == false && (
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
                  console.log(lat, lon);
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
            )}

            {destinationCords?.latitude != undefined && (
              <Marker
                coordinate={{
                  ...destinationCords,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}>
                <Image
                  source={ImagePath.blue_pin}
                  style={{height: 40, width: 22, resizeMode: 'contain'}}
                />
              </Marker>
            )}

            {booking_id == undefined &&
              DriversNearBy?.map((v, i) => (
                <Marker
                  key={i}
                  coordinate={{
                    latitude: parseFloat(v.lat) || 0,
                    longitude: parseFloat(v.lon) || 0,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }}>
                  <Image
                    source={require('../../assets/icons/using/car_top.png')}
                    style={{height: 24, width: 24, resizeMode: 'contain'}}
                  />
                </Marker>
              ))}

            {tripData?.status == 'Start' && (
              <Marker
                coordinate={{
                  latitude: parseFloat(tripData?.picuplat),
                  longitude: parseFloat(tripData?.pickuplon),
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}>
                <Image
                  source={ImagePath.red_pin}
                  style={{height: 40, width: 22, resizeMode: 'contain'}}
                />
              </Marker>
            )}

            {tripData?.status == 'Ride_Start' && (
              <Marker
                coordinate={{
                  latitude: parseFloat(tripData?.droplat),
                  longitude: parseFloat(tripData?.droplon),
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}>
                <Image
                  source={ImagePath.blue_pin}
                  style={{height: 40, width: 22, resizeMode: 'contain'}}
                />
              </Marker>
            )}

            {tripData?.driver_details?.lat != undefined && (
              <Marker.Animated
                ref={marker => {
                  setMarker(marker);
                }}
                anchor={{x: 0.5, y: 0.5}}
                coordinate={{
                  latitude: parseFloat(tripData?.driver_details?.lat),
                  longitude: parseFloat(tripData?.driver_details?.lon),
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}>
                <Image
                  source={require('../../assets/icons/using/car_top.png')}
                  style={{height: 40, width: 22, resizeMode: 'contain'}}
                />
              </Marker.Animated>
            )}

            {tripData?.status == 'Start' ? (
              <MapViewDirections
                // origin={curLoc}
                origin={{
                  latitude: parseFloat(tripData?.driver_details?.lat),
                  longitude: parseFloat(tripData?.driver_details?.lon),
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}
                destination={{
                  latitude: tripData?.picuplat,
                  longitude: tripData?.pickuplon,
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
                  GetToll();
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
            ) : tripData?.status == 'Ride_Start' ? (
              <MapViewDirections
                // origin={curLoc}
                origin={{
                  latitude: parseFloat(tripData?.driver_details?.lat),
                  longitude: parseFloat(tripData?.driver_details?.lon),
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}
                destination={{
                  latitude: parseFloat(tripData?.droplat),
                  longitude: parseFloat(tripData?.droplon),

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
                  GetToll();
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
            ) : (
              Object?.keys(destinationCords)?.length > 0 && (
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
                    GetToll();
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
              )
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
                bottom: MarkerDraged == true ? 50 : 240,
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

      {startTrip == false && (
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
          time={time.toFixed(2)}
          BookingType={BookingType}
          TollData={TollData}
          updateState={updateState}
        />
      )}
      {tripData?.status == 'Start' && <Continue_Trip setBook={setBook} />}
      {tripData?.status == 'Ride_Start' && <Start_Trip />}

      {modal == true && (
        <Modal
          animationType="fade"
          visible={modal}
          onDismiss={() => setModal(false)}
          transparent
          style={{}}>
          <TouchableOpacity
            // onPress={() => setModal(false)}
            activeOpacity={1}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent',
              backgroundColor: theme.colors.Black + 'A6',
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            }}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                // backgroundColor: theme.colors.primary,
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                // marginBottom: 45,
              }}>
              <View>
                <Image
                  style={{
                    width: Dimensions.get('window').width / 1.3,
                    height: Dimensions.get('window').width / 1,
                    resizeMode: 'stretch',
                    borderRadius: 15,
                    backgroundColor: theme.colors.lightGray,
                  }}
                  source={{uri: AddsBanner[0]?.image}}
                />
                <TouchableOpacity onPress={() => RemoveBanner()}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'contain',
                      position: 'absolute',
                      bottom: -100,
                      alignSelf: 'center',
                    }}
                    source={require('../../assets/icons/using/Cross_1.png')}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

export default HomeMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
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

// import React, {useEffect, useState} from 'react';
// import {View, Text} from 'react-native';
// import MapView, {Marker} from 'react-native-maps';
// import {mapsApiKey} from '../../utils/constance';

// const YourComponent = () => {
//   const [origin, setOrigin] = useState({latitude: 0, longitude: 0});
//   const [destination, setDestination] = useState({latitude: 0, longitude: 0});
//   const [estimatedTime, setEstimatedTime] = useState('');

//   useEffect(() => {
//     // Replace with your actual coordinates for origin and destination
//     setOrigin({latitude: 19.076, longitude: 72.8777});
//     setDestination({latitude: 22.9676, longitude: 76.0534});

//     // Get estimated time using the Google Maps Directions API
//     const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${mapsApiKey}`;

//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         if (data.routes && data.routes.length > 0) {
//           const duration = data.routes[0].legs[0].duration.text;
//           setEstimatedTime(duration);
//         }
//       })
//       .catch(error => console.error('Error fetching directions:', error));
//   }, []);

//   return (
//     <View>
//       <MapView
//         style={{width: '100%', height: 300}}
//         initialRegion={{
//           latitude: origin.latitude,
//           longitude: origin.longitude,
//           latitudeDelta: 0.05,
//           longitudeDelta: 0.05,
//         }}>
//         <Marker coordinate={origin} title="Origin" />
//         <Marker coordinate={destination} title="Destination" />
//       </MapView>
//       <Text>Estimated Time: {estimatedTime}</Text>
//     </View>
//   );
// };

// export default YourComponent;
