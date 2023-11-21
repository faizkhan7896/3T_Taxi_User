import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GradientLine from './GradientLine';
import CustomButton_2 from './CustomButton_2';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../utils/theme';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import HoriLine from './HoriLine';
import SwipeButton from 'rn-swipe-button';
import {Dimensions} from 'react-native';
import PaymentOptions from '../components/PaymentOptions';
import PopUpBox from '../components/PopUpBox';
import AskNow from '../components/AskNow';
import TimeText from '../components/TimeText';
import CarDeatail from '../components/CarDeatail';
import {baseUrl, get_address, mapsApiKey, ShowToast} from '../utils/constance';
import {useSelector} from 'react-redux';
import SearchingDriverPopup from './SearchingDriverPopup';
import localizationStrings from '../utils/Localization';
const HomeBookNow = ({
  setPlace1,
  setPlace2,
  setBook,
  book,
  add1,
  add2,
  time,
  distance,
  latlong1,
  latlong2,
  Loading,
  setLoading,
}) => {
  const {userId, countryId} = useSelector(state => state.user||9);
  console.log('userUd', userId);
  // const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(1);
  const navigation = useNavigation();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  // alert();

  const [payment, setPayment] = useState(false);
  const [visible, setVisible] = useState(false);

  const [ask, setAsk] = useState(false);

  const add_booking = async () => {
    // setLoading(true);
    try {
      // setLoading(true);
      const body = new FormData();
      body.append('user_id', '1');
      body.append('picuplocation', add1);
      body.append('picuplat', latlong1.latitude);
      body.append('pickuplon', latlong1.longitude);
      body.append('dropofflocation', add2);
      body.append('droplat', latlong2.latitude);
      body.append('droplon', latlong2.longitude);
      body.append('car_type_id', selected);
      body.append('picklatertime', '10:11');
      body.append('picklaterdate', '2022-12-21');
      body.append('amount', '100');
      body.append('payment_type', 'Cash');
      body.append('distance', distance);
      body.append('distance_time', time);
      body.append('timezone', 'asia/kolkata');

      var requestOptions = {
        method: 'POST',
        body: body,
        headers: {'Content-Type': 'multipart/form-data'},
      };
      const response = await fetch(
        baseUrl + 'addBookingRequest',
        requestOptions,
      );
      const res = await response.json();
      console.log('api responce', res);
      if (res.status == 1) {
        setVisible(true);
        setLoading(false);
      } else {
        ShowToast(res.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const CheckoutButton = () => {
    return (
      <View
        style={{
          width: 60,
          height: 35,
          backgroundColor: '#FFDC00',
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/icons/using/car.png')}
          style={{
            height: 18,
            width: 40,
            resizeMode: 'contain',
            tintColor: '#000000',
          }}
        />
      </View>
    );
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const country =
    countryId == '4'
      ? 'INR'
      : countryId == '9'
      ? 'NOK'
      : countryId == '10'
      ? 'EGP'
      : countryId == '11' && 'SAR';
  return (
    <View
      style={{
        backgroundColor: theme.colors.ButtonText,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        position: 'absolute',
        bottom: 0,
        width: '100%',
      }}>
      {/* <ScrollView contentContainerStyle={{flexGrow: 1, flex: 1}}> */}
      <View
        style={{
          backgroundColor: '#25231F',
          borderWidth: 1,
          borderColor: '#36342F',
          margin: 16,
          paddingHorizontal: 15,
          borderRadius: 10,
          flexDirection: 'row',
        }}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../assets/icons/using/Pin.png')}
            style={{
              height: 16,
              width: 16,
              resizeMode: 'contain',
              tintColor: theme.colors.lightGray,
            }}
          />
          <GradientLine
            colors={['#FFDC0000', '#FFDC00']}
            height={22}
            width={1}
            marginVertical={7}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 20,
                backgroundColor: theme.colors.yellow,
                marginLeft: 8,
              }}
            />
            <Image
              source={require('../assets/icons/using/next_arrow.png')}
              style={{height: 8, width: 8, resizeMode: 'contain'}}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            paddingLeft: 10,
          }}>
          <GooglePlacesAutocomplete
            placeholder={
              add1 ||
              localizationStrings.Departure + ' ' + localizationStrings.Address
            }
            enableHighAccuracyLocation={true}
            textInputProps={{
              placeholderTextColor: '#fff',
            }}
            numberOfLines={1}
            styles={{
              container: {zIndex: 100},
              textInput: {
                backgroundColor: 'transparent',
                color: '#FFF',
                height: 40,
              },
              textInputContainer: {backgroundColor: 'transparent'},
            }}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
              setPlace1([
                {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                },
                {place: data.description},
              ]);
            }}
            query={{
              key: 'AIzaSyDmLCUMGhVP2osA_Fv5w87nVwiqJbk2HhQ',
              language: 'en',
            }}
            enablePoweredByContainer={false}
            currentLocation={true}
            fetchDetails={true}
            currentLocationLabel="Current location"
          />

          <HoriLine mv={1} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <GooglePlacesAutocomplete
              placeholder={add2 || 'Enter Destination'}
              GooglePlacesDetailsQuery={true}
              enableHighAccuracyLocation={true}
              textInputProps={{
                placeholderTextColor: add2 ? '#fff' : '#FFFFFF4D',
              }}
              styles={{
                container: {zIndex: 100},
                textInput: {
                  backgroundColor: 'transparent',
                  color: '#FFF',
                  height: 40,
                },
                textInputContainer: {backgroundColor: 'transparent'},
              }}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                // console.log(data, details?.geometry.location.lat);
                setPlace2([
                  {
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                  },
                  {place: data.description},
                ]);
              }}
              query={{
                key: 'AIzaSyDmLCUMGhVP2osA_Fv5w87nVwiqJbk2HhQ',
                language: 'en',
              }}
              enablePoweredByContainer={false}
              currentLocation={true}
              fetchDetails={true}
              currentLocationLabel="Current location"
            />
          </View>
        </View>
      </View>
      {keyboardVisible || book || (
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 4,
            marginBottom: 20,
            zIndex: 0,
          }}>
          <CustomButton_2
            containerStyle={{zIndex: 0}}
            title={localizationStrings.Book_Later}
            color={theme.colors.yellow}
            bgColor={theme.colors.yellow + '33'}
            flex={1}
            mh={12}
            onPress={() => navigation.navigate('BookLater')}
          />
          <CustomButton_2
            // disabled={(add1&&add2)?false:true}
            containerStyle={{zIndex: 0}}
            title={localizationStrings.Book_Now}
            color={theme.colors.ButtonText}
            bgColor={theme.colors.yellow}
            flex={1}
            mh={12}
            onPress={
              () => {
                add1 && add2
                  ? setBook(true)
                  : ShowToast(
                      'Please enter departure address and destination address',
                      'error',
                    );
              } /* navigation.navigate('BookOrder') */
            }
          />
        </View>
      )}
      {book && (
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 16,
              //   justifyContent: 'space-between',
            }}>
            <TimeText
              title={localizationStrings.Departure}
              date={'11th Apr'}
              time={'05:30'}
            />
            <TimeText
              title={localizationStrings.Estimated_arrival}
              date={'11th Apr'}
              time={'10:30'}
            />
          </View>
          <HoriLine />
          <CarDeatail selected={selected} setSelected={setSelected} />
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 16,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: '#fff',
                fontFamily: 'Jost-Regular',
                flex: 1,
              }}>
              Asking a Price
            </Text>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setAsk(true)}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#FFDC00',
                  fontFamily: 'Jost-Medium',
                  marginRight: 10,
                }}>
                Ask now
              </Text>
              <Image
                source={require('../assets/icons/using/Next.png')}
                style={{height: 14, width: 14, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View> */}
          <HoriLine />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 16,
            }}>
            <Image
              source={require('../assets/icons/using/Cash.png')}
              style={{height: 20, width: 35, resizeMode: 'contain'}}
            />
            <Text
              style={{
                fontSize: 14,
                color: '#fff',
                fontFamily: 'Jost-Regular',
                flex: 1,
                marginLeft: 15,
              }}>
              {localizationStrings.Pay_Tyep}
            </Text>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setPayment(true)}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#FFDC00',
                  fontFamily: 'Jost-Medium',
                  marginRight: 10,
                }}>
                {localizationStrings.Change}
              </Text>
              <Image
                source={require('../assets/icons/using/Next.png')}
                style={{height: 14, width: 14, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
          <HoriLine />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 16,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: '#fff',
                fontFamily: 'Jost-Regular',
                flex: 1,
              }}>
              {localizationStrings.Maximum_price}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#fff',
                fontFamily: 'Jost-Bold',
                marginRight: 10,
              }}>
              25 {country}
            </Text>
          </View>
          <SwipeButton
            containerStyles={{
              marginHorizontal: 16,
              height: 40,
              borderRadius: 30,
              marginVertical: 10,
            }}
            height={40}
            width={Dimensions.get('window').width - 32}
            // onSwipeFail={() => updateSwipeStatusMessage('Incomplete swipe!')}
            // onSwipeStart={() => updateSwipeStatusMessage('Swipe started!')}
            // onSwipeSuccess={() => navigation.navigate('StartTrip')}
            onSwipeSuccess={() => add_booking() /*  setVisible(true) */}
            railBackgroundColor="#FFDC004D"
            railStyles={{borderRadius: 30, height: 40}}
            thumbIconComponent={CheckoutButton}
            thumbIconStyles={{borderRadius: 30, height: 30}}
            railBorderColor={'transparent'}
            railFillBorderColor={'transparent'}
            railFillBackgroundColor={'transparent'}
            disabledRailBackgroundColor={'transparent'}
            titleColor={'#FFDC00'}
            title={localizationStrings.Swipe_Order}
            thumbIconWidth={60}
            thumbIconBorderColor={'transparent'}
            thumbIconBackgroundColor={'#FFDC00'}
          />
          <AskNow isOpen={ask} setIsOpen={setAsk} />
          {/* <PopUpBox visible={visible} setVisible={setVisible} /> */}
          <SearchingDriverPopup
            visible={visible}
            setVisible={setVisible}
            onPress={() => setVisible(false)}
          />
          <PaymentOptions
            isOpen={payment}
            setIsOpen={setPayment}
            // onPress={() => setVisible(true)}
          />
        </View>
      )}
      {/* </ScrollView> */}
    </View>
  );
};

export default HomeBookNow;

const styles = StyleSheet.create({});
