import {
  View,
  Text,
  Linking,
  Platform,
  useWindowDimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
// import SendSMS from 'react-native-sms';
import CustomHeader from '../../components/CustomHeader';
import CustomButton_2 from '../../components/CustomButton_2';
import {ImageBackground} from 'react-native';
import StartTripSlider from '../../components/StartTripSlider';
import AlertPopup from '../../components/AlertPopup';
import CallPopup from '../../components/CallPopup';
import CancelRide from '../../components/CancelRide';
import {useEffect} from 'react';
import localizationStrings from '../../utils/Localization';

export default function StartTrip({navigation}) {
  const dimension = useWindowDimensions();
  const [callNow, setCallNow] = useState(false);
  const [cancelRide, setCancelRide] = useState(false);
  const [onStartTrip, setOnStartTrip] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOnStartTrip(true);
    }, 10000);
  }, []);

  dialCall = number => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  const [mobileNumber, setMobileNumber] = useState('9999999999');
  const [bodySMS, setBodySMS] = useState();

  const initiateSMS = () => {
    // Check for perfect 10 digit length
    if (mobileNumber.length != 10) {
      return;
    }

    //   SendSMS.send(
    //     {
    //       // Message body
    //       body: bodySMS,
    //       // Recipients Number
    //       recipients: [mobileNumber],
    //       // An array of types
    //       // "completed" response when using android
    //       successTypes: ['sent', 'queued'],
    //     },
    //     (completed, cancelled, error) => {
    //       if (completed) {
    //         //console.log('SMS Sent Completed');
    //       } else if (cancelled) {
    //         //console.log('SMS Sent Cancelled');
    //       } else if (error) {
    //         //console.log('Some error occured');
    //       }
    //     },
    //   );
  };
  // const _scrollToBottomY = ''; //Y position of the dummy view
  const _scrollRef = useRef();
  return (
    <View style={{flex: 1, backgroundColor: '#171614'}}>
      <CustomHeader
        left={
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/icons/using/side_bar.png')}
              style={{height: 22, width: 22, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        }
        imgSource={require('../../assets/icons/using/Logo.png')}
        source2={require('../../assets/icons/using/noti.png')}
        size2={18}
        onPress2={() => navigation.navigate('Inbox')}
      />

      <ImageBackground
        source={require('../../assets/icons/using/Map.png')}
        style={{flex: 1}}
        resizeMode="cover">
        {!onStartTrip && (
          <View
            style={{
              alignItems: 'center',
              height: 40,
              justifyContent: 'center',
              backgroundColor: '#5F5C57B2',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'Jost-Regular',
              }}>
              {/* Meet Driver Name at the pickup point */}
              {localizationStrings.Pickup_point_Description}
            </Text>
          </View>
        )}

        {!onStartTrip && (
          <View
            style={{
              alignItems: 'center',
              height: 40,
              justifyContent: 'center',
              backgroundColor: '#5F5C5766',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'Jost-Regular',
              }}>
              Your ride is arriving in{' '}
            </Text>
            <Text
              style={{
                color: '#FFDC00',
                fontSize: 16,
                fontFamily: 'Jost-Regular',
              }}>
              25 min
            </Text>
          </View>
        )}
        <Image
          source={require('../../assets/icons/using/Pick_up_Point.png')}
          style={{
            height: dimension.width - 50,
            width: dimension.width - 50,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
        <StartTripSlider start={onStartTrip} />
      </ImageBackground>
      {!onStartTrip && (
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
            source={require('../../assets/icons/using/message.png')}
            bgColor="#47CADC1A"
            color={'#47CADC'}
            flex={1}
            // onPress={() => initiateSMS()}
            h={34}
          />
          <CustomButton_2
            title={localizationStrings.Call}
            source={require('../../assets/icons/using/bigphone.png')}
            bgColor="#FFDC004D"
            color={'#FFDC00'}
            flex={1}
            mh={10}
            onPress={() => setCallNow(true)}
            h={34}
          />
          <CustomButton_2
            title={localizationStrings.Cancel}
            source={require('../../assets/icons/using/Cross.png')}
            bgColor="#F01D504D"
            color={'#F01D50'}
            flex={1}
            onPress={() => setCancelRide(true)}
            h={34}
          />
        </View>
      )}
      <AlertPopup
        visible={callNow}
        setVisible={setCallNow}
        children={<CallPopup />}
        source={require('../../assets/icons/call_now.png')}
      />
      <CancelRide isOpen={cancelRide} setIsOpen={setCancelRide} />
    </View>
  );
}
const styles = StyleSheet.create({
  img: {
    width: 50,
    height: 10,
    marginTop: -10,
    marginLeft: 140,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
