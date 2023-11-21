// import {useNavigation} from '@react-navigation/native';
// import React, {useEffect, useRef, useState} from 'react';
// import {
//   Image,
//   Linking,
//   Text,
//   TouchableOpacity,
//   useWindowDimensions,
//   View,
// } from 'react-native';
// import {useSelector} from 'react-redux';
// import {START_TRUE, TRIP_DATA} from '../../redux/ActionTypes';
// import store from '../../redux/store';
// import {post_api, showError} from '../../utils/Constants';
// import CancelRide from '../../components/CancelRide';
// import CustomButton_2 from '../../components/CustomButton_2';
// import PaymentOptions from '../../components/PaymentOptions';
// import ProfileImg from '../../components/ProfileImg';
// import SearchFieldContainer from '../../components/SearchFieldContainer';

// export default function Continue_Trip({start}) {
//   const navigation = useNavigation();
//   const scrollRef = useRef();
//   const [hide, setHide] = useState(true);
//   const dimension = useWindowDimensions();
//   const [payment, setPayment] = useState(false);
//   const [cancel_ride, setCancel_ride] = useState(false);
//   const [emergencyVisible, setEmergencyVisible] = useState(false);
//   const {userId, booking_id, tripData} = useSelector(state => state?.user);
//   const [isFocused, setIsFocused] = useState(true);

//   // alert(JSON.stringify(tripData?.driver_image));
//   // console.log('tripDatatripData', tripData);
//   const [data, setData] = useState([]);
//   const [TripStatus, setTripStatus] = useState('');
//   // alert(JSON.stringify());

//   const GetTripData = async () => {
//     const body = new FormData();
//     // body.append('request_id', '75');
//     body.append('request_id', booking_id);

//     console.log(body);

//     post_api('get_booking_details', body)
//       .then(v => {
//         console.log('contineu===>', v);

//         if (v.status == 1) {
//           store.dispatch({type: TRIP_DATA, payload: v.result[0]});
//         }
//       })
//       .catch(e => {
//         showError(e);
//       });
//   };

//   useEffect(() => {
//     GetTripData();
//     if (tripData?.status == 'Ride_Start') {
//       store.dispatch({type: START_TRUE});
//     }
//     const int = setInterval(() => {
//       if (isFocused) GetTripData(true);
//     }, 2500);
//     return () => clearInterval(int);
//   }, [isFocused]);

//   return (
//     <View>
//       <View
//         style={{
//           position: 'absolute',
//           bottom: 0,
//           width: '100%',
//           paddingTop: 12,
//         }}>
//         <TouchableOpacity
//           onPress={() => setHide(!hide)}
//           style={{
//             alignSelf: 'center',
//             position: 'absolute',
//             top: 0,
//             zIndex: 1,
//           }}>
//           <Image
//             source={require('../../assets/icons/using/down.png')}
//             style={{
//               height: 25,
//               width: 25,
//               resizeMode: 'contain',
//               transform: [{rotate: !hide ? '0deg' : '180deg'}],
//             }}
//           />
//         </TouchableOpacity>
//         <View
//           style={{
//             backgroundColor: '#25231F',
//             borderWidth: 1,
//             borderColor: '#36342F',
//             borderBottomWidth: 0,
//             borderTopLeftRadius: 20,
//             borderTopRightRadius: 20,
//             // paddingHorizontal: 16,
//             paddingTop: 20,
//           }}>
//           <View style={{flexDirection: 'row', marginHorizontal: 16}}>
//             <ProfileImg
//               br={60}
//               size={80}
//               source={{uri: tripData?.driver_details?.image}}
//             />
//             <View
//               style={{
//                 flex: 1,
//                 justifyContent: 'space-between',
//                 marginLeft: 10,
//               }}>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   fontFamily: 'Jost-Medium',
//                   color: '#FFFFFF',
//                 }}>
//                 {tripData?.driver_details?.user_name}
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 12,
//                   fontFamily: 'Jost-Regular',
//                   color: '#BAB6AE',
//                 }}>
//                 {tripData?.driver_details?.car_name}
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 12,
//                   fontFamily: 'Jost-Regular',
//                   color: '#BAB6AE',
//                   backgroundColor: '#36342F',
//                   paddingHorizontal: 10,
//                   paddingVertical: 5,
//                   borderRadius: 4,
//                   alignSelf: 'flex-start',
//                 }}>
//                 {tripData?.driver_details?.plate_number}
//               </Text>
//             </View>

//             <View
//               style={{
//                 backgroundColor: '#171614',
//                 borderRadius: 6,
//                 paddingVertical: 10,
//                 paddingHorizontal: 15,
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 borderWidth: 1,
//                 borderColor: '#36342F',
//                 height: 70,
//                 alignSelf: 'center',
//               }}>
//               <Text
//                 style={{
//                   fontSize: 12,
//                   fontFamily: 'Jost-Regular',
//                   color: '#BAB6AE',
//                 }}>
//                 Start OTP
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 18,
//                   fontFamily: 'Jost-SemiBold',
//                   color: '#FFFFFF',
//                 }}>
//                 {tripData?.otp}
//               </Text>
//             </View>
//           </View>
//           <View
//             style={{
//               height: 1,
//               backgroundColor: '#36342F',
//               marginHorizontal: 16,
//               marginTop: 15,
//             }}
//           />
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               // paddingTop: 10,
//               marginTop: 15,
//               marginHorizontal: 16,
//             }}>
//             <Text
//               style={{
//                 fontSize: 14,
//                 fontFamily: 'Jost-Regular',
//                 color: '#FFFFFF',
//                 flex: 1,
//               }}>
//               Your current trip
//             </Text>

//             <Image
//               source={require('../../assets/icons/using/share.png')}
//               style={{height: 16, width: 16, resizeMode: 'contain'}}
//             />
//             <Text
//               style={{
//                 fontSize: 14,
//                 fontFamily: 'Jost-Regular',
//                 color: '#FFDC00',
//                 marginLeft: 6,
//               }}>
//               Share
//             </Text>
//           </View>

//           {!hide && (
//             <View>
//               <SearchFieldContainer
//                 title={tripData?.picuplocation}
//                 title2={tripData?.dropofflocation}
//                 color2={'#BAB6AE'}
//               />
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   marginHorizontal: 16,
//                 }}>
//                 <Text
//                   style={{
//                     fontSize: 14,
//                     fontFamily: 'Jost-Regular',
//                     color: '#FFFFFF',
//                   }}>
//                   Payment
//                 </Text>
//                 <Text
//                   style={{
//                     fontSize: 14,
//                     fontFamily: 'Jost-Medium',
//                     color: '#FFFFFF',
//                   }}>
//                   {tripData?.amount} NOK
//                 </Text>
//               </View>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginHorizontal: 16,
//                   marginTop: 10,
//                 }}>
//                 <Image
//                   source={require('../../assets/icons/using/Cash.png')}
//                   style={{height: 20, width: 35, resizeMode: 'contain'}}
//                 />
//                 <Text
//                   style={{
//                     fontSize: 14,
//                     fontFamily: 'Jost-Regular',
//                     color: '#FFFFFF',
//                     flex: 1,
//                     marginLeft: 15,
//                   }}>
//                   Pay with {tripData?.payment_type}
//                 </Text>
//                 <TouchableOpacity
//                   style={{flexDirection: 'row', alignItems: 'center'}}
//                   onPress={() => setPayment(true)}>
//                   <Text
//                     style={{
//                       fontSize: 14,
//                       fontFamily: 'Jost-Medium',
//                       color: '#FFDC00',
//                       marginRight: 8,
//                     }}>
//                     Switch
//                   </Text>
//                   <Image
//                     source={require('../../assets/icons/using/Next.png')}
//                     style={{height: 12, width: 12, resizeMode: 'contain'}}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}

//           <View
//             style={{
//               height: 1,
//               backgroundColor: '#36342F',
//               marginHorizontal: 16,
//               marginTop: 15,
//             }}
//           />
//         </View>
//         <PaymentOptions
//           isOpen={payment}
//           setIsOpen={setPayment}
//           // onPress={() => setVisible(true)}
//         />

//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             paddingHorizontal: 16,
//             paddingVertical: 15,
//             backgroundColor: '#25231F',
//           }}>
//           <CustomButton_2
//             title={'Message'}
//             source={require('../../assets/icons/using/message.png')}
//             bgColor="#47CADC1A"
//             color={'#47CADC'}
//             flex={1}
//             onPress={() =>
//               navigation.navigate('ChatDeatils', {item: tripData, Driver: true})
//             }
//             h={34}
//           />
//           <CustomButton_2
//             title={'Call Now'}
//             source={require('../../assets/icons/using/bigphone.png')}
//             bgColor="#FFDC004D"
//             color={'#FFDC00'}
//             flex={1}
//             mh={10}
//             // onPress={() => setCallNow(true)}
//             onPress={() => {
//               Linking.openURL('tel:' + tripData?.mobile);
//             }}
//             h={34}
//           />
//           <CustomButton_2
//             title={'Cancel Ride'}
//             source={require('../../assets/icons/using/Cross.png')}
//             bgColor="#F01D504D"
//             color={'#F01D50'}
//             flex={1}
//             onPress={() => setCancel_ride(true)}
//             h={34}
//           />
//         </View>
//         <CancelRide isOpen={cancel_ride} setIsOpen={setCancel_ride} />
//       </View>
//     </View>
//   );
// }

import React, {useRef, useState} from 'react';
import {
  Image,
  Linking,
  Platform,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
// import SendSMS from 'react-native-sms';
import {ImageBackground} from 'react-native';
import AlertPopup from '../../components/AlertPopup';
import CallPopup from '../../components/CallPopup';

import CustomButton_2 from '../../components/CustomButton_2';
import StartTripSlider from '../../components/StartTripSlider';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import CancelRide from '../../components/CancelRide';

export default function StartTrip({navigation}) {
  const dimension = useWindowDimensions();
  const [callNow, setCallNow] = useState(false);
  const [cancelRide, setCancelRide] = useState(false);
  const [onStartTrip, setOnStartTrip] = useState(false);
  const {booking_id, tripData} = useSelector(state => state?.user);

  // alert(JSON.stringify(start_trip));
  // console.log('tripDatatripData', tripData);

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

  const _scrollRef = useRef();
  return (
    <View style={{flex: 1, backgroundColor: '#171614'}}>
      <ImageBackground
        source={require('../../assets/icons/using/Map.png')}
        style={{flex: 1}}
        resizeMode="cover">
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
