import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import CustomButton_2 from './CustomButton_2';
import {useSelector} from 'react-redux';
import {ImagePath} from '../utils/ImagePath';
import {post_api, showError, showSuccess} from '../utils/Constants';
import Loader from './Loader';
import messaging from '@react-native-firebase/messaging';
import CancelRide from './CancelRide';
import store from '../redux/store';
import {B_ID, END, START, TRIP_DATA} from '../redux/ActionTypes';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {TouchableOpacity} from 'react-native';
import localizationStrings from '../utils/Localization';
const SearchingDriverPopup = ({visible, setVisible, estimate}) => {
  const {userId, booking_id, tripData} = useSelector(state => state.user);
  const [driver_data, setDriver_data] = useState({});
  const [loading, setLoading] = useState(false);
  const [cancel_ride_popup, setCancel_ride_popup] = useState(false);
  const dimension = useWindowDimensions();
  const [accept, setAccept] = useState(false);
  // console.log('booking_id', booking_id, 'userId', userId);
  // alert(JSON.stringify(booking_id));

  const cancel_trip = () => {
    setLoading(true);
    const body = new FormData();
    body.append('user_id', userId);
    body.append('booking_id', booking_id);

    console.log(body);

    post_api('user_cancel_ride', body)
      .then(v => {
        setLoading(false);
        if (v.status == 1) {
          setVisible(false);
          showSuccess(localizationStrings?.msg_Ride_canceled);
          store.dispatch({type: END});
          store.dispatch({type: TRIP_DATA, payload: {}});
          store.dispatch({type: B_ID, payload: ''});
          return;
        }
        showError(v.message);
      })
      .catch(e => {
        setLoading(false);
        showError(e);
      });
  };

  const seraching_driver = async () => {
    const body = new FormData();
    body.append('user_id', userId);
    // body.append('request_id', '45');
    body.append('request_id', booking_id);

    console.log('get_User_Search_Booking', body);
    post_api('get_User_Search_Booking', body)
      .then(v => {
        // console.log('driver==>', v);
        if (v.status == 1) {
          setDriver_data(v.result);
          setAccept(true);
          setTimeout(() => {
            // alert('kjjvbhj')
            continue_ride();
          }, 3000);
          return;
        }
        // showError(v.message);
        setAccept(false);
      })
      .catch(e => {
        setLoading(false);
        showError(e);
      });
  };

  const continue_ride = async () => {
    const body = new FormData();
    body.append('user_id', userId);
    body.append('accepted_request_id', booking_id);
    post_api('userbookingcontinue', body)
      .then(v => {
        console.log('contineucontineucontineu===>', v);
        setLoading(false);
        if (v.status == 1) {
          setVisible(false);
          store.dispatch({type: START});
          store.dispatch({type: TRIP_DATA, payload: v.result});
          showSuccess(localizationStrings?.msg_Ride_continue);
          return;
        }
        // showError(v.message);
      })
      .catch(e => {
        setLoading(false);
        showError(e);
      });
  };

  useEffect(() => {
    // continue_ride();

    setDriver_data({});
    setAccept(false);

    seraching_driver();
    // store.dispatch({type: B_ID, payload: ''});
    setAccept(false);

    const intervalCall = setInterval(() => {
      if (driver_data.user_name == undefined) {
        seraching_driver();
      }
    }, 2500);
    return () => {
      // clean up
      clearInterval(intervalCall);
    };
  }, [booking_id]);

  // const fadeIn = {from: {marginHorizontal: 0}, to: {marginHorizontal: 200}};
  // const fadeIn = {from: {paddingLeft: 0}, to: {paddingLeft: 200}};

  const fadeIn = {
    from: {marginLeft: -120},
    to: {marginLeft: dimension.width / 1.6},
  };
  const fadeOut = {from: {height: 50}, to: {height: 0}};

  return (
    <Modal isVisible={visible}>
      <View
        style={[
          styles.container,
          {
            width: dimension.width - 40,
            alignSelf: 'center',
            overflow: 'hidden',
            // paddingHorizontal: 40,
          },
        ]}>
        <View>
          {accept == true && (
            <Text style={styles.title}>
              Driver will reach you in {estimate}mins.
            </Text>
          )}
          {/* <Text style={styles.title}>
              Booking ID {booking_id}
            </Text> */}
          <TouchableOpacity
            style={styles.img}
            onPress={() => {
              seraching_driver();
              // continue_ride();
            }}>
            <Image
              source={
                accept == false
                  ? ImagePath.searching_driver
                  : {uri: driver_data?.user_image}
              }
              style={styles.img}
            />
          </TouchableOpacity>

          <Text style={styles.title1}>
            {accept == false
              ? localizationStrings?.Safe_and_hygenic_ride
              : driver_data.user_name}
          </Text>

          {accept == false && (
            <View>
              <View
                style={{
                  paddingTop: 23,
                  paddingBottom: 6,
                  justifyContent: 'center',
                  marginTop: 10,
                  overflow: 'hidden',
                }}>
                <View style={{height: 2, backgroundColor: '#36342F'}}></View>
                <Animatable.View
                  iterationCount={'infinite'}
                  style={{
                    // backgroundColor: 'red',
                    height: 12,
                    paddingLeft: 50,
                  }}
                  duration={2000}
                  animation={fadeIn}>
                  <Image
                    source={require('../assets/icons/loadingCar.png')}
                    style={{
                      height: 25,
                      width: 143,
                      resizeMode: 'contain',
                      position: 'absolute',
                      bottom: 0,
                    }}
                  />
                </Animatable.View>
              </View>
            </View>
          )}

          {accept == false || (
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Jost-Regular',
                  color: '#BAB6AE',
                  textAlign: 'center',
                }}>
                {driver_data.car_name}
              </Text>
              <Text style={styles.number}>{driver_data.car_number}</Text>
            </View>
          )}
          {accept == false ? (
            <CustomButton_2
              title={localizationStrings.Cancel}
              bgColor="#F01D504D"
              source={require('../assets/icons/using/Cross.png')}
              color={'#F01D50'}
              onPress={() => cancel_trip()}
              h={34}
              mt={20}
            />
          ) : (
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <CustomButton_2
                title={localizationStrings.Cancel}
                bgColor="#F01D504D"
                source={require('../assets/icons/using/Cross.png')}
                color={'#F01D50'}
                onPress={() => setCancel_ride_popup(true)}
                h={34}
                flex={1}
              />
              {/* <View style={{width: 20}} />
              <CustomButton_2
                title={'Continue'}
                bgColor="#74C12C4D"
                source={require('../assets/icons/using/Checked.png')}
                color={'#74C12C'}
                onPress={() => {
                  store.dispatch({type: TRIP_DATA, payload: []});
                  setTimeout(() => {
                    continue_ride(driver_data.id);
                  }, 1500);
                }}
                h={34}
                flex={1}
              /> */}
            </View>
          )}
        </View>
      </View>

      <CancelRide
        setIsOpen={setCancel_ride_popup}
        isOpen={cancel_ride_popup}
        setcancel_popup={setVisible}
      />
    </Modal>
  );
};

export default SearchingDriverPopup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25231F',
    borderWidth: 1,
    borderColor: '#36342F',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Jost-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    marginHorizontal: 15,
    lineHeight: 23,
    marginBottom: 10,
  },
  title1: {
    fontSize: 18,
    fontFamily: 'Jost-Medium',
    color: '#FFFFFF',
    textAlign: 'center',
    marginHorizontal: 15,
    lineHeight: 23,
    marginTop: 10,
  },
  number: {
    fontSize: 12,
    fontFamily: 'Jost-Regular',
    color: '#BAB6AE',
    backgroundColor: '#36342F',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    alignSelf: 'center',
    marginVertical: 5,
  },
  img: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    backgroundColor: '#36342F',
    borderRadius: 40,
  },
});
