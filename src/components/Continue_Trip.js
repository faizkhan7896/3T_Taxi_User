import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Linking,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {TRIP_DATA} from '../redux/ActionTypes';
import store from '../redux/store';
import {post_api, showError} from '../utils/Constants';
import CancelRide from './CancelRide';
import CustomButton_2 from './CustomButton_2';
import PaymentOptions from './PaymentOptions';
import ProfileImg from './ProfileImg';
import SearchFieldContainer from './SearchFieldContainer';
import * as Animatable from 'react-native-animatable';
import {theme} from '../utils/theme';
import {baseUrl} from '../utils/constance';
import Geolocation from 'react-native-geolocation-service';
import localizationStrings from '../utils/Localization';

export default function Continue_Trip({setBook}) {
  const navigation = useNavigation();
  const scrollRef = useRef();
  const [hide, setHide] = useState(true);
  const dimension = useWindowDimensions();
  const [payment, setPayment] = useState(false);
  const [cancel_ride, setCancel_ride] = useState(false);
  const [emergencyVisible, setEmergencyVisible] = useState(false);
  const {booking_id, tripData, userId} = useSelector(state => state?.user);
  const [isFocused, setIsFocused] = useState(true);

  // alert(JSON.stringify(tripData?.status));
  // //console.log('tripDatatripData', tripData);

  const [data, setData] = useState([]);
  const [TripStatus, setTripStatus] = useState('');
  const [payType, setPayType] = useState('');

  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');

  const [inBackground, setInBackground] = useState(false);

  // alert(JSON.stringify(tripData?.live_user_status));
  // //console.log('',driver_details);

  const {countryId} = useSelector(state => state.user || 9);

  const country =
    countryId == '4'
      ? 'INR'
      : countryId == '9'
      ? 'NOK'
      : countryId == '10'
      ? 'EGP'
      : countryId == '11' && 'SAR';

  const GetTripData = async () => {
    // alert()
    const body = new FormData();
    // body.append('request_id', '75');
    body.append('request_id', booking_id);

    // //console.log(body);

    post_api('get_booking_details', body)
      .then(v => {
        // //console.log('contineu===>', v);

        if (v.status == 1) {
          store.dispatch({type: TRIP_DATA, payload: v.result[0]});
          if (v.result[0].status == 'Ride_Start') {
            // store.dispatch({type: START});
            // navigation.replace('Start_Trip');
          }
        }
      })
      .catch(e => {
        showError(e);
      });
  };

  const requestLocationPermission = async () => {
    try {
      Geolocation.getCurrentPosition(
        position => {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        },
        error => {
          // See error code charts below.
          //console.log('error:-', error.code, error.message);
        },
        {
          accuracy: {android: 'high', ios: 'best'},
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (err) {
      console.warn(err);
    }
  };
  const UpdateLiveLocation = async () => {
    // alert()
    try {
      Geolocation.getCurrentPosition(
        position => {
          ShareLiveLocation(
            position.coords.latitude,
            position.coords.longitude,
          );
        },
        error => {
          // See error code charts below.
          //console.log('error:-', error.code, error.message);
        },
        {
          accuracy: {android: 'high', ios: 'best'},
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (err) {
      console.warn(err);
    }
  };

  async function ShareLiveLocation(lati, longi) {
    // alert(JSON.stringify(lati, longi));
    try {
      const url = baseUrl + 'update_user_live_lat_lon';

      const body = new FormData();
      body.append('user_id', userId);
      body.append('booking_id', booking_id);
      {
        tripData?.live_user_status == 'false' &&
          body.append('live_user_status', 'true');
      }
      body.append('lat', lati || lat);
      body.append('lon', longi || long);
      //console.log('update_user_live_lat_lon', body);

      const res = await fetch(url, {
        method: 'POST',
        body: body,
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      //console.log('update_user_live_lat_lon', res);
      const rslt = await res.json();
      //console.log('update_user_live_lat_lon', rslt);
    } catch (e) {
      //console.log(e);
    }
  }

  async function DisableLiveLocation() {
    // alert();
    // alert(JSON.stringify(lat, long));

    try {
      const url = baseUrl + 'update_user_live_lat_lon';

      const body = new FormData();
      body.append('user_id', userId);
      body.append('booking_id', booking_id);
      {
        tripData?.live_user_status == 'true' &&
          body.append('live_user_status', 'false');
      }
      body.append('lat', lat);
      body.append('lon', long);
      //console.log('update_user_live_lat_lon', body);

      const res = await fetch(url, {
        method: 'POST',
        body: body,
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      //console.log('update_user_live_lat_lon', res);
      const rslt = await res.json();
      //console.log('update_user_live_lat_lon', rslt);
    } catch (e) {
      //console.log(e);
    }
  }

  useEffect(() => {
    DisableLiveLocation();
    GetTripData();
    requestLocationPermission();

    const int = setInterval(() => {
      if (isFocused) {
        GetTripData(true);

        if (tripData?.live_user_status == 'true') {
          // alert();
          UpdateLiveLocation();
        }
      }
    }, 2500);
    return () => clearInterval(int);
  }, [isFocused]);

  // alert(JSON.stringify(tripData?.live_user_status));

  const fadeIn = {from: {height: 240}, to: {height: 485}};
  const fadeOut = {from: {height: 485}, to: {height: 240}};

  return (
    <Animatable.View
      duration={1000}
      animation={hide == false ? fadeIn : fadeOut}
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingTop: 12,
      }}>
      {/* <TouchableOpacity
        onPress={() => {}}
        style={{flexDirection: 'row', marginTop: 10}}>
        <Text style={{marginHorizontal: 10, color: theme.colors.white}}>
          curr {lat || 0}
        </Text>
        <Text style={{marginHorizontal: 10, color: theme.colors.white}}>
          curr {long || 0}
        </Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={() => setHide(!hide)}
        style={{
          alignSelf: 'center',
          position: 'absolute',
          top: 0,
          zIndex: 1,
        }}>
        <Image
          source={require('../assets/icons/using/down.png')}
          style={{
            height: 25,
            width: 25,
            resizeMode: 'contain',
            transform: [{rotate: !hide ? '0deg' : '180deg'}],
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: '#25231F',
          borderWidth: 1,
          borderColor: '#36342F',
          borderBottomWidth: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          // paddingHorizontal: 16,
          paddingTop: 20,
        }}>
        <View style={{flexDirection: 'row', marginHorizontal: 16}}>
          <ProfileImg
            br={60}
            size={80}
            source={{uri: tripData?.driver_details?.image}}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              marginLeft: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Jost-Medium',
                color: '#FFFFFF',
              }}>
              {tripData?.driver_details?.user_name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Jost-Regular',
                color: '#BAB6AE',
              }}>
              {tripData?.driver_details?.car_name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Jost-Regular',
                color: '#BAB6AE',
                backgroundColor: '#36342F',
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 4,
                alignSelf: 'flex-start',
              }}>
              {tripData?.driver_details?.plate_number}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#171614',
              borderRadius: 6,
              paddingVertical: 10,
              paddingHorizontal: 15,
              alignItems: 'center',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: '#36342F',
              height: 70,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Jost-Regular',
                color: '#BAB6AE',
              }}>
              {localizationStrings?.StartOTP}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Jost-SemiBold',
                color: '#FFFFFF',
              }}>
              {tripData?.otp}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: '#36342F',
            marginHorizontal: 16,
            marginTop: 15,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // paddingTop: 10,
            marginTop: 15,
            marginHorizontal: 16,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Jost-Regular',
              color: '#FFFFFF',
              flex: 1,
            }}>
            {/* Your current trip */}
            {localizationStrings?.ShareLive_Location}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (tripData?.live_user_status == 'false') {
                ShareLiveLocation();
                // alert(tripData?.live_user_status);
              }
              if (tripData?.live_user_status == 'true') {
                // alert(tripData?.live_user_status);
                DisableLiveLocation();
              }
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/icons/using/livelocation.png')}
              style={{
                height: 16,
                width: 16,
                resizeMode: 'contain',
                tintColor: theme.colors.yellow,
              }}
            />
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Jost-Regular',
                color: theme.colors.yellow,
                marginLeft: 6,
              }}>
              {localizationStrings.Share}
            </Text>
          </TouchableOpacity>
        </View>

        {!hide && (
          <View>
            <SearchFieldContainer
              title={tripData?.picuplocation}
              title2={tripData?.dropofflocation}
              color2={'#BAB6AE'}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 16,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Jost-Regular',
                  color: '#FFFFFF',
                }}>
                {localizationStrings?.payment}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Jost-Medium',
                  color: '#FFFFFF',
                }}>
                {tripData?.amount + ' ' + country}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 16,
                marginTop: 10,
              }}>
              <Image
                source={
                  tripData?.payment_type == '3T Wallet'
                    ? require('../assets/icons/using/Logo.png')
                    : tripData?.payment_type == 'Card'
                    ? require('../assets/icons/using/card.png')
                    : tripData?.payment_type == 'Apple Pay'
                    ? require('../assets/icons/using/apple_white.png')
                    : tripData?.payment_type == 'Google Pay'
                    ? require('../assets/icons/using/GooglePay.png')
                    : require('../assets/icons/using/Cash.png')
                }
                style={{height: 20, width: 35, resizeMode: 'contain'}}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Jost-Regular',
                  color: '#FFFFFF',
                  flex: 1,
                  marginLeft: 15,
                }}>
                {localizationStrings?.Pay_Tyep +
                  ' ' +
                  (tripData?.payment_type == 'Google Pay'
                    ? localizationStrings?.Google_Pay
                    : tripData?.payment_type == 'Card'
                    ? localizationStrings?.Card
                    : tripData?.payment_type == 'OPay'
                    ? localizationStrings?.Opay
                    : tripData?.payment_type == 'Cash' &&
                      localizationStrings?.Cash)}
              </Text>
              <View
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => setPayment(true)}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Jost-Medium',
                    color: '#FFDC00',
                    marginRight: 8,
                  }}>
                  {localizationStrings.Switch}
                </Text>
                <Image
                  source={require('../assets/icons/using/Next.png')}
                  style={{height: 12, width: 12, resizeMode: 'contain'}}
                />
              </View>
            </View>
          </View>
        )}

        <View
          style={{
            height: 1,
            backgroundColor: '#36342F',
            marginHorizontal: 16,
            marginTop: 15,
          }}
        />
      </View>
      <PaymentOptions
        isOpen={payment}
        setIsOpen={setPayment}
        setSelected={setPayType}
        selected={payType}
        // onPress={() => setVisible(true)}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 15,
          backgroundColor: '#25231F',
        }}>
        <CustomButton_2
          title={localizationStrings.Message}
          source={require('../assets/icons/using/message.png')}
          bgColor="#47CADC1A"
          color={'#47CADC'}
          flex={1}
          onPress={() =>
            navigation.navigate('ChatDeatils', {item: tripData, Driver: true})
          }
          h={34}
        />
        <CustomButton_2
          title={localizationStrings.Call}
          source={require('../assets/icons/using/bigphone.png')}
          bgColor="#FFDC004D"
          color={'#FFDC00'}
          flex={1}
          mh={10}
          // onPress={() => setCallNow(true)}
          onPress={() => {
            Linking.openURL('tel:' + tripData?.mobile);
          }}
          h={34}
        />
        <CustomButton_2
          title={localizationStrings.Cancel}
          source={require('../assets/icons/using/Cross.png')}
          bgColor="#F01D504D"
          color={'#F01D50'}
          flex={1}
          onPress={() => setCancel_ride(true)}
          h={34}
        />
      </View>
      <CancelRide
        isOpen={cancel_ride}
        setIsOpen={setCancel_ride}
        setBook={setBook}
      />
    </Animatable.View>
  );
}
