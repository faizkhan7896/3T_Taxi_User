import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import CustomDrawer from '../components/CustomDrawer';

import Receipt from '../screens/home/Receipt';
import Bookings from '../screens/home/Bookings';
import MyWalletPre from '../screens/home/MyWalletPre';
import PaymentOption from '../screens/home/PaymentOption';
import Myprofile from '../screens/home/Myprofile';
import Coupon from '../screens/home/Coupon';
import Help from '../screens/home/Help';
import BookLater from '../screens/home/BookLater';
import StartTrip from '../screens/home/StartTrip';
import Language from '../screens/home/Language';
import SavePalace from '../screens/home/SavePalace';
import store from '../redux/store';
import {SIGNOUT} from '../redux/ActionTypes';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {theme} from '../utils/theme';
import Home from '../screens/home/Home';
import HomeMap from '../screens/home/HomeMap';
import Inbox from '../screens/home/Inbox';
// import ChatDeatils from '../screens/home/ChatDeatils';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

async function signout() {
  const out = await GoogleSignin.signOut();
  console.log('signout', out);
  store.dispatch({
    type: SIGNOUT,
    payload: {id: 1},
  });
}


const showConfirmDialog = () => {
  return Alert.alert(
    "Are your sure?",
    "Are you sure you want to Logout?",
    [
      // The "Yes" button
      {
        text: "Yes",
        onPress: () => {
          signout();
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "No",
      },
    ]
  );
};
function App() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: theme.colors.yellow,
        drawerActiveTintColor: theme.colors.Black,
        drawerInactiveTintColor: theme.colors.Gray,
        drawerLabelStyle: {marginLeft: -20, fontSize: 14, color: '#171614'},
      }}
      backBehavior="firstRoute"
      initialRouteName="HomeMap">
      {/* <Drawer.Screen
        name="Home"
        component={Home}
        options={{drawerItemStyle: {height: 0}}}
      /> */}

      <Drawer.Screen
        name="HomeMap"
        component={HomeMap}
        options={{drawerItemStyle: {height: 0}}}
      />
      <Drawer.Screen
        name="Inbox"
        component={Inbox}
        options={{drawerItemStyle: {height: 0}}}
      />
      <Drawer.Screen
        name="Bookings"
        component={Bookings}
        options={{
          drawerIcon: ({color}) => (
            <Image
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
              }}
              source={require('../assets/icons/using/black_location.png')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Receipt"
        component={Receipt}
        options={{
          title: 'Receipts',
          drawerIcon: ({color}) => (
            <Image
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
              }}
              source={require('../assets/icons/using/Receipt.png')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Myprofile}
        options={{
          drawerIcon: ({color}) => (
            <Image
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
              }}
              source={require('../assets/icons/using/Profile_1.png')}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="PaymentOptions"
        component={PaymentOption}
        options={{
          drawerIcon: ({color}) => (
            <Image
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
              }}
              source={require('../assets/icons/using/PaymentOptions.png')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="MyWalletPre"
        component={MyWalletPre}
        options={{
          drawerIcon: ({color}) => (
            <Image
              style={{
                height: 20,
                width: 20,
                // resizeMode: 'contain',
                tintColor: '#171614',
              }}
              source={require('../assets/icons/using/wallet.png')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Language"
        component={Language}
        options={{
          drawerIcon: ({color}) => (
            <Image
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                tintColor: '#171614',
              }}
              source={require('../assets/icons/using/Language.png')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="PromoCode"
        component={Coupon}
        options={{
          drawerIcon: ({color}) => (
            <Image
              style={{
                height: 20,
                width: 20,
                // resizeMode: 'contain',
              }}
              source={require('../assets/icons/using/Promo.png')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={Help}
        options={{
          drawerIcon: ({color}) => (
            <Image
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
              }}
              source={require('../assets/icons/using/help.png')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={showConfirmDialog}
        options={{
          drawerIcon: ({color}) => (
            <TouchableOpacity>
              <Image
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                }}
                source={require('../assets/icons/using/logout.png')}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="StartTrip"
        component={StartTrip}
        options={{drawerItemStyle: {height: 0}}}
      />

      <Drawer.Screen
        name="BookLater"
        component={BookLater}
        options={{drawerItemStyle: {height: 0}}}
      />

      <Drawer.Screen
        name="SavePalace"
        component={SavePalace}
        options={{drawerItemStyle: {height: 0}}}
      />
    </Drawer.Navigator>
  );
}

export default App;
