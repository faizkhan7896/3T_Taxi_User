import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import messaging from '@react-native-firebase/messaging';
import {initStripe} from '@stripe/stripe-react-native';
import React, {useEffect, useRef, useState} from 'react';
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
  useWindowDimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FlashMessage from 'react-native-flash-message';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Root from './src/navigation/Root';
import store, {persistor} from './src/redux/store';
import {theme} from './src/utils/theme';

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
