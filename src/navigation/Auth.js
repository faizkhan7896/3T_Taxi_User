import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import GetStarted from '../screens/auth/GetStarted';
import Login from '../screens/auth/Login';
import VerifyCode from '../screens/auth/VerifyCode';
import SetProfile from '../screens/auth/SetProfile';
import SetupPayment from '../screens/auth/SetupPayment';
import ApplyPromoCode from '../screens/auth/ApplyPromoCode';
import PromoCode from '../screens/auth/PromoCode';
import ForgotPassword from '../screens/auth/ForgotPassword';
import PaymentAuth from '../screens/auth/PaymentAuth';
import Splash from '../screens/auth/Splash';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="GetStarted">
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="VerifyCode" component={VerifyCode} />
      <Stack.Screen name="SetProfile" component={SetProfile} />
      <Stack.Screen name="SetupPayment" component={SetupPayment} />
      <Stack.Screen name="ApplyPromoCode" component={ApplyPromoCode} />
      <Stack.Screen name="PromoCode" component={PromoCode} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="PaymentAuth" component={PaymentAuth} />
    </Stack.Navigator>
  );
}

export default App;
