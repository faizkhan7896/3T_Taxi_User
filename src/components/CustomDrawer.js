import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDrawerStatus} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Plus from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {SIGNOUT} from '../redux/ActionTypes';
import store from '../redux/store';
import {theme} from '../utils/theme';
import ProfileImg from './ProfileImg';
import Statusbar from './Statusbar';
import localizationStrings from '../utils/Localization';

async function signout() {
  const out = await GoogleSignin.signOut();
  console.log('signout', out);
}

export default function CustomDrawer(props) {
  const navigation = useNavigation();
  const isOpen = useDrawerStatus();
  const [darkTheme, setDarkTheme] = useState(false);
  const {userData, countryId} = useSelector(state => state.user||9);
  console.log(userData);

  const country =
    countryId == '4'
      ? 'INR'
      : countryId == '9'
      ? 'NOK'
      : countryId == '10'
      ? 'EGP'
      : countryId == '11' && 'SAR';

  var pkg = require('../../package.json');
  // alert(countryId);

  async function signout() {
    // const out = await GoogleSignin.signOut();
    // console.log('signout', out);
    store.dispatch({
      type: SIGNOUT,
      payload: {id: 1},
    }); 
  }

  const showConfirmDialog = () => {
    return Alert.alert('Are your sure?', 'Are you sure you want to Logout?', [
      {text: 'Yes', onPress: () => signout()},
      {text: 'No'},
    ]);
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.yellow, zIndex: 100}}>
      <Statusbar
        barStyle={'light-content'}
        translucent={Platform.OS == 'ios' ? true : false}
        backgroundColor={isOpen == 'open' ? '#25231F' : '#171614'}
      />
      <View style={{backgroundColor: '#25231F', paddingHorizontal: 25}}>
        <View style={styles.imgCircle1}>
          <View style={styles.imgCircle2}>
            <ProfileImg
              source={{
                uri: userData?.image,
              }}
              size={80}
              br={50}
              rating={userData?.rating}
            />
          </View>
        </View>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Jost-Medium',
            color: '#FFFFFF',
            marginTop: 10,
          }}>
          {userData?.first_name + ' ' + userData?.last_name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: theme.colors.lightGray,
            fontFamily: 'Jost-Regular',
            marginTop: 4,
          }}>
          {userData?.email}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          {Array(5)
            .fill('')
            .map((v, i) => (
              <Image
                source={require('../assets/icons/using/Star_1.png')}
                style={{
                  height: 13,
                  width: 13,
                  alignSelf: 'center',
                  marginHorizontal: 2,
                  opacity: i + 1 <= userData?.rating ? 1 : 0.5,
                }}
              />
            ))}
          <Text
            style={{
              fontSize: 12,
              color: theme.colors.lightGray,
              marginLeft: 4,
              fontFamily: 'Jost-Regular',
            }}>
            ({userData?.rating || 0})
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('AddCard')}
          style={{
            // position:'absolute',
            marginBottom: -25,
            paddingHorizontal: 15,
            backgroundColor: theme.colors.Black,
            borderRadius: 10,
            // height: 60,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8,
          }}>
          <Image
            style={{
              height: 35,
              width: 35,
              resizeMode: 'contain',
            }}
            source={require('../assets/icons/using/Card_.png')}
          />
          <View style={{flex: 1, marginLeft: 10}}>
            <Text
              numberOfLines={1}
              style={{
                color: 'white',
                fontSize: 17,
                fontFamily: 'Jost-SemiBold',
                width: Dimensions.get('window').width / 3,
                // backgroundColor:'red'
              }}>
              {/* {country + ' ' + userData?.wallet} */}
              {localizationStrings.Add_Card}
            </Text>
          </View>
          <Plus name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{marginTop: 35}}
        contentContainerStyle={{marginHorizontal: 20}}>
        <Tab
          source={require('../assets/icons/location_pin.png')}
          title={localizationStrings.Booking}
          onPress={() => navigation.navigate('Bookings')}
        />
        <Tab
          source={require('../assets/icons/Receipts.png')}
          title={localizationStrings.Receipt}
          onPress={() => navigation.navigate('Receipt')}
        />
        <Tab
          source={require('../assets/icons/Profile_drawer.png')}
          title={localizationStrings.Profile}
          onPress={() => navigation.navigate('Profile')}
        />
        <Tab
          source={require('../assets/icons/Payment_option.png')}
          title={localizationStrings.Payment_Options}
          onPress={() => navigation.navigate('PaymentOptions')}
        />
        <Tab
          source={require('../assets/icons/promo_code.png')}
          title={localizationStrings.Coupan_Code}
          onPress={() => navigation.navigate('PromoCode')}
        />

        <Tab
          source={require('../assets/icons/Payment_option.png')}
          title={localizationStrings.My_Card}
          onPress={() => navigation.navigate('MyWalletPre')}
        />
        <Tab
          source={require('../assets/icons/language.png')}
          title={localizationStrings.language}
          onPress={() => navigation.navigate('Language')}
        />
      
        <Tab
          source={require('../assets/icons/help_support.png')}
          title={localizationStrings.Help_and_Support}
          onPress={() => navigation.navigate('Help')}
        />
        <Tab
          source={require('../assets/icons/log_out.png')}
          title={localizationStrings.Logout}
          onPress={() => showConfirmDialog()}
        />
        <View
          style={{height: 1, backgroundColor: '#32302B', marginVertical: 10}}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 15,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Privacy', {type: 'terms'})}>
            <Text
              style={{
                fontSize: 10,
                color: 'black',
                textDecorationLine: 'underline',
              }}>
              {localizationStrings.Terms_And_Conditions}
            </Text>
          </TouchableOpacity>
          <Text style={{fontSize: 10, color: 'black'}}>
            {localizationStrings.App_version + pkg.version}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const Tab = ({title, source, onPress, disabled, right}) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
      marginVertical: 7,
    }}>
    <Image
      style={{height: 20, width: 20, resizeMode: 'contain'}}
      source={source}
    />

    <Text
      style={{
        fontSize: 18,
        color: '#171614',
        fontFamily: 'Jost-Regular',
        marginLeft: 10,
        flex: 1,
      }}>
      {title}
    </Text>
    {right}
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  textcolor: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    fontSize: 16,
  },
  imgCircle1: {
    height: 100,
    width: 100,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#FFDC0066',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  imgCircle2: {
    height: 90,
    width: 90,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#FFDC0066',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
