import {
  View,
  Text,
  ScrollView,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Share,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ProfileImg from './ProfileImg';
import SearchFieldContainer from './SearchFieldContainer';
import CustomButton_2 from './CustomButton_2';
import LinearGradient from 'react-native-linear-gradient';
import PaymentOptions from './PaymentOptions';
import EmergencyPopup from './EmergencyPopup';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {add_time, post_api, showError} from '../utils/Constants';
import * as Animatable from 'react-native-animatable';
import {ShowToast} from '../utils/constance';
import {B_ID, END, TRIP_DATA} from '../redux/ActionTypes';
import store from '../redux/store';
import {theme} from '../utils/theme';
import localizationStrings from '../utils/Localization';
export default function StartTripSlider({start}) {
  const navigation = useNavigation();
  const scrollRef = useRef();
  const [hide, setHide] = useState(true);
  const dimension = useWindowDimensions();
  const [payment, setPayment] = useState(false);
  const [emergencyVisible, setEmergencyVisible] = useState(false);
  const {userId, startTrip, booking_id, tripData, userData} = useSelector(
    state => state?.user,
  );

  const [estimatedTome, setEstimatedTome] = useState();
  console.log(estimatedTome);

  // alert(JSON.stringify(tripData?.driver_details?.mobile));

  const {countryId} = useSelector(state => state.user || 9);

  const country =
    countryId == '4'
      ? 'INR'
      : countryId == '9'
      ? 'NOK'
      : countryId == '10'
      ? 'EGP'
      : countryId == '11' && 'SAR';

  const EndTrip = async () => {
    const body = new FormData();
    // body.append('request_id', '75');
    body.append('request_id', booking_id);

    console.log(body);

    post_api('get_booking_finish', body)
      .then(v => {
        console.log('distanceCalculation===>', v);

        if (v.status == 1) {
          store.dispatch({type: TRIP_DATA, payload: v.result});
          store.dispatch({type: END});
          ShowToast(localizationStrings?.msg_Booking_Completed);
          navigation.navigate('TripEnd');
        }
      })
      .catch(e => {
        showError(e);
      });
  };

  function formatEstimatedTime(timeData) {
    if (typeof timeData !== 'number' || timeData < 0) {
      return 'Invalid time';
    }

    const hours = Math.floor(timeData / 60);
    const minutes = timeData % 60;

    const formattedTime = [];

    if (hours > 0) {
      formattedTime.push(`${hours} hr`);
    }

    if (minutes > 0) {
      formattedTime.push(`${minutes} min`);
    }

    setEstimatedTome(formattedTime.join(' '));
    return;
  }

  const GetEstimatedTime = async () => {
    const body = new FormData();
    // body.append('request_id', '75');
    body.append('pick_lat', tripData?.picuplat);
    body.append('pick_lon', tripData?.pickuplon);
    body.append('droff_lat', tripData?.droplat);
    body.append('droff_lon', tripData?.droplon);
    // 23.1994097,77.4058914,11z

    console.log(body);

    post_api('distanceCalculation', body)
      .then(v => {
        console.log('distanceCalculation===>', v);

        if (v.status == 1) {
          formatEstimatedTime(v?.min);
          // setEstimatedTome_1(v?.hr);
        }
      })
      .catch(e => {
        showError(e);
      });
  };

  useEffect(() => {
    GetEstimatedTime();
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Track my 3T ride!\n Hey I booked a 3T! The Captain is' +
          tripData?.driver_details?.user_name +
          ', driving a ' +
          tripData?.driver_details?.car_name +
          ', ' +
          tripData?.driver_details?.plate_number +
          ', mobile number is +' +
          tripData?.driver_details?.mobile +
          '.\n\nhttps://play.google.com/store/apps/details?id=com.RN_3T_Driver',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const fadeIn = {
    from: {marginLeft: -120},
    to: {marginLeft: dimension.width / 2.1},
  };
  // alert()
  return (
    <View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          paddingTop: 12,
          // marginTop: 20,
        }}>
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
            paddingTop: !hide ? 30 : 44,
          }}>
          <View
            style={{
              backgroundColor: '#171614',
              borderWidth: 1,
              borderColor: '#36342F',
              padding: 11,
              borderRadius: 6,
              marginHorizontal: 16,
              marginBottom: 20,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Jost-Regular',
                    color: '#FFFFFF',
                  }}>
                  {/* Reaching your desitnation in */}
                  {localizationStrings.My_desitnation}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Jost-SemiBold',
                    color: '#FFFFFF',
                  }}>
                  {/* {moment(add_time(new Date(), 0)).format(
                      'Do MMM' + ' @' + 'hh:mm a',
                    )} */}
                  {estimatedTome}{' '}
                  {parseFloat(tripData?.distance).toFixed(2) + ' km'}
                </Text>
              </View>
              <CustomButton_2
                onPress={() => setEmergencyVisible(true)}
                title={localizationStrings.Emergency_alarm}
                color={'#F01D50'}
                bgColor={'#F01D504D'}
                source={require('../assets/icons/emergency.png')}
                br={5}
                h={30}
                fontSize={12}
                family="Jost-Regular"
                size={16}
                ph={12}
              />
            </View>

            <View>
              <View
                style={{
                  // paddingTop: 23,
                  // paddingBottom: 36,
                  justifyContent: 'center',
                  marginTop: 10,
                  overflow: 'hidden',
                  paddingVertical: 30,
                }}>
                <View style={{height: 2, backgroundColor: '#36342F'}}>
                  <Animatable.View
                    // iterationCount={'infinite'}
                    style={{
                      height: 7,
                      paddingLeft: 50,
                    }}
                    duration={20000}
                    animation={fadeIn}>
                    <Image
                      source={require('../assets/icons/loadingCar.png')}
                      style={{
                        height: 12,
                        width: 133,
                        resizeMode: 'contain',
                        position: 'absolute',
                        bottom: 0,
                      }}
                    />
                  </Animatable.View>
                  <Image
                    source={require('../assets/icons/Pin.png')}
                    style={{
                      height: 30,
                      width: 13,
                      resizeMode: 'contain',
                      position: 'absolute',
                      right: 0,
                      bottom: -5,
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
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
              {localizationStrings.Current_trip}
            </Text>

            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => onShare()}>
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
                other={
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Jost-Medium',
                      color: theme.colors.yellow,
                    }}>
                    {/* {localizationStrings.Change} */}
                  </Text>
                }
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
                  {localizationStrings.payment}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 16,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <Image
                    source={
                      tripData?.payment_type == 'OPay'
                        ? require('../assets/icons/using/Opay.jpeg')
                        : tripData?.payment_type == 'Card'
                        ? require('../assets/icons/using/card.png')
                        : tripData?.payment_type == 'Apple Pay'
                        ? require('../assets/icons/using/apple_white.png')
                        : tripData?.payment_type == 'Google Pay'
                        ? require('../assets/icons/using/GooglePay.png')
                        : tripData?.payment_type == 'Pay_in_Car'
                        ? require('../assets/icons/using/CardMachine_EG.png')
                        : require('../assets/icons/using/CashMachine.png')
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
                    {localizationStrings?.Pay_Tyep+' '}
                    {tripData?.payment_type == 'OPay'
                      ? localizationStrings?.Opay
                      : tripData?.payment_type == 'Card'
                      ? localizationStrings?.Visa_Card
                      : tripData?.payment_type == 'Apple Pay'
                      ? 'Apple Pay'
                      : tripData?.payment_type == 'Google Pay'
                      ? localizationStrings.Google_Pay
                      : tripData?.payment_type == 'Pay_in_Car'
                      ? localizationStrings.PayInCar
                      : tripData?.payment_type == 'Cash' &&
                        localizationStrings?.Cash}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Jost-Medium',
                      color: '#FFFFFF',
                    }}>
                    {tripData?.amount + ' ' + country}
                  </Text>
                  {/* <View
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => setPayment(true)}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Jost-Medium',
                      color: theme.colors.yellow,
                      marginRight: 8,
                    }}>
                    Switch
                  </Text>
                  <Image
                    source={require('../assets/icons/using/Next.png')}
                    style={{height: 12, width: 12, resizeMode: 'contain'}}
                  />
                </View> */}
                </View>
              </View>
              <View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: '#36342F',
                    marginHorizontal: 16,
                    marginTop: 15,
                  }}
                />
                <CustomButton_2
                  // onPress={() => EndTrip()}
                  onPress={() => EndTrip()}
                  title={localizationStrings.End_Ride}
                  source={require('../assets/icons/cancel.png')}
                  color={'#F01D50'}
                  bgColor={'#F01D504D'}
                  mh={16}
                  mt={20}
                  mb={10}
                />
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
          // onPress={() => setVisible(true)}
        />
        <EmergencyPopup
          visible={emergencyVisible}
          setVisible={setEmergencyVisible}
        />
      </View>
    </View>
  );
}
