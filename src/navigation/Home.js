import messaging from '@react-native-firebase/messaging';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {AppState, Platform} from 'react-native';
import {useSelector} from 'react-redux';
import EndTripSheet from '../components/EndTripSheet';
import Rating from '../components/Rating';
import Drawer from '../navigation/Drawer';
import AddAmount from '../screens/home/AddAmount';
import AddCard from '../screens/home/AddCard';
import BookLater from '../screens/home/BookLater';
import BookOrder from '../screens/home/BookOrder';
import BookingReceipt from '../screens/home/BookingReceipt';
import ChatDeatils from '../screens/home/ChatDeatils';
import ChooseAccount from '../screens/home/ChooseAccount';
import ConfirmAccount from '../screens/home/ConfirmAccount';
import Coupon from '../screens/home/Coupon';
import FullMap from '../screens/home/FullMap';
import HomeMap from '../screens/home/HomeMap';
import Inbox from '../screens/home/Inbox';
import MyAccount from '../screens/home/MyAccount';
import Myprofile from '../screens/home/Myprofile';
import PaymentOption from '../screens/home/PaymentOption';
import Privacy from '../screens/home/Privacy';
import SavePalace from '../screens/home/SavePalace';
import Start_Trip from '../screens/home/Start_Trip';
import TripDetail from '../screens/home/TripDetail';
import TripEnd from '../screens/home/TripEnd';
import PaymentWebview from '../components/PaymentWebview';
import {getCurrentLocation, get_Profile, post_api} from '../utils/Constants';
import {baseUrl} from '../utils/constance';
import NotificationDetails from '../screens/home/NotificationDetails';

const Stack = createNativeStackNavigator();

function HomeNavigator() {
  const {userId, divice_token} = useSelector(state => state?.user);

  const add_latlong = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    const {latitude, longitude, heading} = await getCurrentLocation();

    const body = new FormData();
    body.append('user_id', userId);
    body.append('lat', latitude);
    body.append('lon', longitude);
    body.append('register_id', token);

    post_api('update_lat_lon', body)
      .then(v => {
        if (v.status == 1) {
          // //console.log(v);
        }
      })
      .catch(() => console.log(v));
  };

  async function status(status) {
    try {
      const url = baseUrl + 'update_chat_online_status';

      const body = new FormData();
      body.append('user_id', userId);
      body.append('online_status', status);
      body.append('status_time', new Date().toISOString());

      const res = await fetch(url, {
        method: 'POST',
        body: body,
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      //console.log(res);
      const rslt = await res.json();
      // //console.log(rslt);
      //console.log(status);
      // alert(status);
    } catch (e) {}
  }

  const handlePutAppToBackground = state => {
    //console.log(state);
    if (
      (Platform.OS == 'android' && state == 'background') ||
      (Platform.OS == 'ios' && state == 'inactive')
    )
      status('OFFLINE');
    else if (state == 'active') status('ONLINE');
  };

  React.useEffect(() => {
    status('ONLINE');
    const sub = AppState.addEventListener('change', handlePutAppToBackground);
    return () => {
      sub.remove();
      return status('OFFLINE');
    };
  }, []);

  React.useEffect(() => {
    add_latlong();
    get_Profile(userId);
    const intervalCall = setInterval(() => {
      add_latlong();
    }, 2500);
    return () => {
      // clean up
      clearInterval(intervalCall);
    };
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Drawer">
      <Stack.Screen name="Drawer" component={Drawer} />
      {/* <Stack.Screen name="Home" component={Home} /> */}
      <Stack.Screen name="HomeMap" component={HomeMap} />
      <Stack.Screen name="BookLater" component={BookLater} />
      <Stack.Screen name="SavePalace" component={SavePalace} />
      <Stack.Screen name="FullMap" component={FullMap} />
      <Stack.Screen name="BookingReceipt" component={BookingReceipt} />
      <Stack.Screen name="ConfirmAccount" component={ConfirmAccount} />
      <Stack.Screen name="ChooseAccount" component={ChooseAccount} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="PaymentOption" component={PaymentOption} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="Myprofile" component={Myprofile} />
      <Stack.Screen name="MyAccount" component={MyAccount} />
      <Stack.Screen name="Coupon" component={Coupon} />
      <Stack.Screen name="TripEnd" component={TripEnd} />
      <Stack.Screen name="Inbox" component={Inbox} />
      <Stack.Screen name="ChatDeatils" component={ChatDeatils} />
      <Stack.Screen name="BookOrder" component={BookOrder} />
      <Stack.Screen name="TripDetail" component={TripDetail} />
      <Stack.Screen name="AddAmount" component={AddAmount} />
      <Stack.Screen name="Start_Trip" component={Start_Trip} />
      <Stack.Screen name="Rating" component={Rating} />
      <Stack.Screen name="EndTripSheet" component={EndTripSheet} />
      <Stack.Screen name="PaymentWebview" component={PaymentWebview} />

      <Stack.Screen
        name="NotificationDetails"
        component={NotificationDetails}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
