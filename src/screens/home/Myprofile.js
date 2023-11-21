import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import React from 'react';
import {theme} from '../../utils/theme';
import Statusbar from '../../components/Statusbar';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import ProfileImg from '../../components/ProfileImg';
import CustomHeader from '../../components/CustomHeader';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {SIGNOUT} from '../../redux/ActionTypes';
import localizationStrings from '../../utils/Localization';
import store from '../../redux/store';

export default function MyProfile() {
  const dimension = useWindowDimensions();
  const navigation = useNavigation();
  const {userData} = useSelector(state => state.user);

  async function signout() {
    const out = await GoogleSignin.signOut();
    console.log('signout', out);
    store.dispatch({
      type: SIGNOUT,
      payload: {id: 1},
    });
  }

  const showConfirmDialog = () => {
    return Alert.alert('Are your sure?', 'Are you sure you want to Logout?', [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: () => {
          signout()
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: 'No',
      },
    ]);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#171614',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: 440,
          width: '100%',
          backgroundColor: '#36342F',
          borderColor: '#535048',
          borderWidth: 1,
          borderTopWidth: 0,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}>
        <ImageBackground
          source={{uri: userData.image}}
          style={{
            height: 355,
            width: '100%',
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            overflow: 'hidden',
          }}
          resizeMode="cover">
          <View
            style={{
              flex: 1,
              backgroundColor: '#171614E5',
            }}>
            <CustomHeader
              source={require('../../assets/icons/using/backw.png')}
              size={15}
              title={'Profile'}
              statusBg={'#171614E5'}
              bg={'transparent'}
            />
            <View style={styles.imgCircle}>
              <ProfileImg source={{uri: userData.image}} size={85} br={50} />
            </View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Jost-Medium',
                color: '#FFFFFF',
                textAlign: 'center',
                marginTop: 10,
              }}>
              {userData.first_name + ' ' + userData.last_name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: theme.colors.lightGray,
                marginVertical: 5,
                textAlign: 'center',
                fontFamily: 'Jost-Regular',
              }}>
              {userData.mobile}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: theme.colors.lightGray,
                textAlign: 'center',
                fontFamily: 'Jost-Regular',
              }}>
              {userData.email}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                marginVertical: 10,
              }}>
              {Array(5)
                .fill('')
                .map((v, i) => (
                  <Image
                    source={require('../../assets/icons/using/Star_1.png')}
                    style={{
                      height: 13,
                      width: 13,
                      alignSelf: 'center',
                      marginHorizontal: 2,
                      opacity: i + 1 <= userData.rating ? 1 : 0.5,
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
                ({userData.rating || 0})
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.row}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.num}>{userData.total_rides || 0}</Text>
            <Text style={styles.title}>{localizationStrings.Total_Trips}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.num}>{userData.request_rides || 0}</Text>
            <Text style={styles.title}>
              {localizationStrings.Requested_Trips}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.num}>{userData.cancel_rides || 0}</Text>
            <Text style={styles.title}>
              {localizationStrings.Cancled_Trips}
            </Text>
          </View>
        </View>
      </View>
      <Input
        source={require('../../assets/icons/using/account.png')}
        onPress={() => navigation.navigate('MyAccount')}
        title={localizationStrings.My_Account}
        tintColor={theme.colors.yellow}
      />

      <Input
        source={require('../../assets/icons/using/location.png')}
        onPress={() => navigation.navigate('SavePalace')}
        title={localizationStrings.Save_Locations}
      />

      {/* <Input
        source2={require('../../assets/icons/using/google_icon.png')}
        title="Google"
      />

      <Input
        source2={require('../../assets/icons/using/fb_icon.png')}
        title="Add facebook Account"
      /> */}

      <Input
        source={require('../../assets/icons/using/logout.png')}
        // onPress={()=>navigation.navigate()}
        title={localizationStrings.Logout}
        onPress={() => showConfirmDialog()}
        tintColor={theme.colors.yellow}
      />
      <View style={{height: 30}} />
    </ScrollView>
  );
}
const Input = ({title, onPress, source, source2, tintColor}) => {
  const dimension = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#25231F',
        paddingHorizontal: 15,
        marginHorizontal: 16,
        height: 50,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#36342F',
        borderRadius: 8,
      }}>
      <View style={{flexDirection: 'row'}}>
        {source ? (
          <Image
            style={{
              height: 18,
              width: 18,
              resizeMode: 'contain',
              marginHorizontal: 6,
              tintColor: tintColor,
            }}
            source={source}
          />
        ) : (
          <View
            style={{
              height: 38,
              width: 38,
              backgroundColor: '#0000004D',
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{height: 18, width: 18, resizeMode: 'contain'}}
              source={source2}
            />
          </View>
        )}

        <Text
          style={{
            color: '#BAB6AE',
            fontSize: 16,
            fontFamily: 'Jost-Regular',
            marginHorizontal: 10,
            flex: 1,
            textAlignVertical: 'center',
          }}>
          {title}
        </Text>
      </View>

      <Image
        style={{
          height: 14,
          width: 14,
          resizeMode: 'contain',
        }}
        source={require('../../assets/icons/using/Next.png')}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  textcolor: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    fontSize: 16,
  },
  imgCircle: {
    height: 100,
    width: 100,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#FFDC0066',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  num: {
    fontSize: 18,
    color: theme.colors.white,
    fontFamily: 'Jost-Medium',
  },
  title: {
    fontSize: 12,
    color: theme.colors.white,
    fontFamily: 'Jost-Regular',
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 15,
  },
});
