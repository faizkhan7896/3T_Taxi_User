import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import messaging from '@react-native-firebase/messaging';
import { initStripe } from '@stripe/stripe-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  LogBox,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FlashMessage from 'react-native-flash-message';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Root from './src/navigation/Root';
import store, { persistor } from './src/redux/store';
import { theme } from './src/utils/theme';

export default function App({navigation}) {
  // GoogleSignin.configure({
  //   webClientId:
  //     '1015011691931-ib2p7q6f08ioi1o8296sq9k1j6taft10.apps.googleusercontent.com',
  // });
  const dimension = useWindowDimensions();
  // const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const handleViewRef = useRef();
  const [notival, setNotival] = useState('');

  // alert(visible)

  const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } catch (error) {
        console.log('Notification Authorization status:', authStatus);
      }
    }
  };

  async function requestUserPermission() {
    // checkApplicationPermission();
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const get_token = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log('token', token);
  };

  useEffect(() => {
    LogBox.ignoreAllLogs();
    requestUserPermission();
    get_token();
    initStripe({
      // publishableKey: "pk_test_51MY68nKcyP8J3Gsb9xV80XexI3P5Jd9pGCXv6XDgTo6iPTT2QxQjJOIoUn40FXC0oOL5kHHLvZlVBTbwzGoQDlkV00cCrU6gwg",
      publishableKey:
        'pk_live_51MY68nKcyP8J3Gsb9BcoQzFyD2TZMOQ7irrzgm3IHbwJQ20GmhR5uQpLVXoWZrP2MrTM1ubsbjX5m4XGaMGB9huK00kYoCMp66',
      // merchantIdentifier: 'BCR2DN4TRKYLFSLH',
      urlScheme: 'RNStripe',
    });
  }, []);

  const CusomNotification = navigation => {
    return (
      <Animatable.View
        duration={300}
        animation={visible ? 'fadeInDown' : 'fadeInUp'}
        ref={handleViewRef}
        style={{
          backgroundColor: '#25231F',
          position: 'absolute',
          width: Dimensions.get('window').width,
          paddingVertical: 10,
          paddingHorizontal: 15,
          top: 0,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setNotival('');
            setVisible(false);
            // navigation.navigate('Inbox');
          }}
          style={{
            backgroundColor: '#25231F',
            position: 'absolute',
            width: Dimensions.get('window').width,
            paddingVertical: 10,
            paddingHorizontal: 15,
            top: 0,
          }}>
          <View style={{}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{height: 50, width: 50, marginRight: 10}}
                resizeMode="contain"
                source={require('./src/assets/icons/taxi_logo.png')}
              />
              <Text
                numberOfLines={2}
                style={{
                  color: '#fff',
                  // fontSize: 18,
                  fontWeight: '500',
                  width: Dimensions.get('window').width / 1.3,
                }}>
                {notival}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setNotival(remoteMessage?.notification?.body);
      setVisible(true);
      setTimeout(() => {
        setNotival('');
        setVisible(false);
      }, 3000);
      console.log('A new FCM message arrived', remoteMessage);
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <GestureHandlerRootView style={{flex: 1}}>
          <BottomSheetModalProvider>
            <View style={{flex: 1}}>
              {Platform.OS == 'android' ? (
                <Root />
              ) : (
                <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
                  <Root />
                </KeyboardAvoidingView>
              )}
            </View>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
        <FlashMessage position="top" />
        {visible == true && (
          <CusomNotification
            source={require('./src/assets/icons/alert.png')}
            visible={visible}
            setVisible={setVisible}
            navigation={navigation}
          />
        )}
        <Toast
          visibilityTime={1500}
          autoHide={true}
          config={{
            success: props => (
              <View
                style={[
                  styles.toastContainer,
                  {backgroundColor: theme.colors.yellow},
                ]}>
                <Text style={styles.toastText}>{props.text1}</Text>
              </View>
            ),
            error: props => (
              <View
                style={[styles.toastContainer, {backgroundColor: '#F36566'}]}>
                <Text style={styles.toastText}>{props.text1}</Text>
              </View>
            ),
          }}
        />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    width: Dimensions.get('window').width - 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  toastText: {color: 'white', fontWeight: '500', textAlign: 'left'},
});

// import React, {useEffect} from 'react';
// import {TouchableOpacity, Text, StyleSheet, View, Platform} from 'react-native';
// import {
//   pay,
//   MerchantInfo,
//   CustomerInfo,
//   FawryCallbacks,
//   FawryLanguages,
//   openCardsManager,
//   BillItems,
// } from '@fawry_pay/rn-fawry-pay-sdk';
// import uuid from 'react-native-uuid';

// const fawryConfig = {
//   baseUrl: 'https://atfawry.fawrystaging.com/',
//   language: FawryLanguages.ENGLISH,
//   signature: '',
//   allow3DPayment: true,
//   skipReceipt: false,
//   skipLogin: true,
//   payWithCardToken: true,
//   authCaptureMode: false,
//   allowVoucher: true,
//   merchantInfo: {
//     merchantCode:
//       Platform.OS === 'android'
//         ? '+/IAAY2notgLsdUB9VeTFg=='
//         : '+/IAAY2nothN6tNlekupwA==',
//     merchantSecretCode:
//       Platform.OS === 'android'
//         ? '69826c87-963d-47b7-8beb-869f7461fd93'
//         : '4b815c12-891c-42ab-b8de-45bd6bd02c3d',
//     merchantRefNum: uuid.v4().toString(),
//   },
//   customerInfo: {
//     customerName: 'Ahmed Kamal',
//     customerMobile: '+1234567890',
//     customerEmail: 'ahmed.kamal@example.com',
//     customerProfileId: '12345',
//   },
// };

// const eventListeners = [
//   {
//     eventName: FawryCallbacks.FAWRY_EVENT_PAYMENT_COMPLETED,
//     listener: data => {
//       console.log(FawryCallbacks.FAWRY_EVENT_PAYMENT_COMPLETED, data);
//     },
//   },
//   {
//     eventName: FawryCallbacks.FAWRY_EVENT_ON_SUCCESS,
//     listener: data => {
//       console.log(FawryCallbacks.FAWRY_EVENT_ON_SUCCESS, data);
//     },
//   },
//   {
//     eventName: FawryCallbacks.FAWRY_EVENT_ON_FAIL,
//     listener: error => {
//       console.log(FawryCallbacks.FAWRY_EVENT_ON_FAIL, error);
//     },
//   },
//   {
//     eventName: FawryCallbacks.FAWRY_EVENT_CardManager_FAIL,
//     listener: error => {
//       console.log(FawryCallbacks.FAWRY_EVENT_CardManager_FAIL, error);
//     },
//   },
// ];

// const attachEventListeners = () => {
//   eventListeners.forEach(eventListener => {
//     const {eventName, listener} = eventListener;
//     FawryCallbacks.FawryEmitter.addListener(eventName, listener);
//   });
// };

// const detachEventListeners = () => {
//   eventListeners.forEach(eventListener => {
//     const {eventName, listener} = eventListener;
//     FawryCallbacks.FawryEmitter.removeAllListeners(eventName);
//   });
// };

// export default function App() {
//   useEffect(() => {
//     attachEventListeners();

//     return detachEventListeners;
//   }, []);

//   const handlePayments = () => {
//     const billItems: BillItems[] = [
//       {
//         itemId: 'item1',
//         description: 'Item 1 Description',
//         quantity: '1',
//         price: '50',
//       },
//       {
//         itemId: 'item2',
//         description: 'Item 2 Description',
//         quantity: '2',
//         price: '25',
//       },
//       {
//         itemId: 'item3',
//         description: 'Item 3 Description',
//         quantity: '3',
//         price: '20',
//       },
//     ];

//     pay(
//       fawryConfig.baseUrl,
//       fawryConfig.language,
//       fawryConfig.merchantInfo,
//       fawryConfig.customerInfo,
//       billItems,
//       fawryConfig.allow3DPayment,
//       fawryConfig.skipReceipt,
//       fawryConfig.skipLogin,
//       fawryConfig.payWithCardToken,
//       fawryConfig.authCaptureMode,
//       fawryConfig.allowVoucher,
//       fawryConfig.signature,
//     );
//   };

//   const handleCardsManager = () => {
//     openCardsManager(
//       fawryConfig.baseUrl,
//       fawryConfig.language,
//       fawryConfig.merchantInfo,
//       fawryConfig.customerInfo,
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button} onPress={handlePayments}>
//         <Text style={styles.buttonText}>Checkout / Pay</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={handleCardsManager}>
//         <Text style={styles.buttonText}>Manage Cards</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     padding: 10,
//     paddingHorizontal: 20,
//     borderRadius: 25,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// import {View, Text, TouchableOpacity} from 'react-native';
// import React from 'react';
// import {OPay, OPayCountry} from 'opay-online-rn-sdk';

// export default function App() {
//   const payInput = {
//     publicKey: '{PublicKey}', // your public key
//     merchantId: '256612345678901', // your merchant id
//     merchantName: 'TEST 123',
//     reference: '12347544444555666', // reference unique, must be updated on each request
//     countryCode: 'EG', // uppercase
//     currency: 'EGP', // uppercase
//     payAmount: 10000,
//     productName: '',
//     productDescription: '',
//     callbackUrl: 'http://www.callbackurl.com',
//     userClientIP: '110.246.160.183',
//     expireAt: 30,
//     paymentType: '', // optional
//     // optional
//     userInfo: {
//       userId: 'userId',
//       userEmail: 'userEmail',
//       userMobile: 'userMobile',
//       userName: 'uesrName',
//     },
//   };
//   const cashierStatusParams = {
//     privateKey: 'OPAYPRV16946278056470.6527620987722339',
//     merchantId: '281823091304127',
//     reference: '123',
//     countryCode: 'EG',
//   };

//   return (
//     <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
//       <TouchableOpacity
//         style={{
//           height: 50,
//           width: 100,
//           backgroundColor: 'blue',
//           borderRadius: 5,
//         }}
//         onPress={() => {
//           new OPay().getCashierStatus(cashierStatusParams);
//           // new OPay().getCashierStatus(cashierStatusParam).then((response){
//           //   const status = response.data.status
//           //   switch(status){
//           //       case PayResultStatus.initial:
//           //         break;
//           //       case PayResultStatus.pending:
//           //           break;
//           //       case PayResultStatus.success:
//           //           break;
//           //       case PayResultStatus.fail:
//           //           break;
//           //       case PayResultStatus.close:
//           //           break;
//           //   }})
//         }}>
//         <Text>App</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
