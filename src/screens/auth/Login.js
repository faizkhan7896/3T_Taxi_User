import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { LoginManager } from 'react-native-fbsdk-next';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import Statusbar from '../../components/Statusbar';
import { ID, LOGIN, USERDATA } from '../../redux/ActionTypes';
import store from '../../redux/store';
import { showError, showSuccess } from '../../utils/Constants';
import localizationStrings from '../../utils/Localization';
import { theme } from '../../utils/theme';

export default function Login() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [Number, setNumber] = useState('12345678900');
  const [password, setPassword] = useState('12345');
  const dimension = useWindowDimensions();
  const phoneInput = useRef();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  // alert(JSON.stringify(Country?.phone_code));

  const Facebook = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        // if (result.isCancelled) {
        //   console.log('Login cancelled');
        // } else {
        //   console.log(
        //     'Login success with permissions: ' +
        //       result.grantedPermissions.toString(),
        //   );
        // }
      },
      function (error) {
        // console.log('Login fail with error: ' + error);
      },
    );
  };

  const get_Country = async () => {
    try {
      var requestOptions = {
        method: 'GET',
      };

      const response = await fetch(
        'https://www.iplocate.io/api/lookup',
        requestOptions,
      );
      const res = await response.json();
      // console.log(res);

      if (res.country_code != undefined) {
        // alert(JSON.stringify(res?.country_code));
        // setCountry(res);
      } else {
        // ShowToast(result.message || 'Unknown error', 'error');
      }
    } catch (error) {}
  };

  useEffect(() => {
    GoogleSignin.configure();
    get_Country();
  }, []);

  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // console.log('2', googleCredential);
    const {idToken} = await GoogleSignin.signIn();
    // console.log('3', idToken);
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // console.log('googleCredential', googleCredential);
    return auth().signInWithCredential(googleCredential);
  }

  const signin = async () => {
    try {
      setLoading(true);

      const token = await firebase.messaging().getToken();
      // console.log(token);
      // return;

      const body = new FormData();
      body.append('mobile', `${Number}`);
      body.append('password', `${password}`);
      body.append('register_id', `${token}`);
      body.append('type', "USER");


      // console.log(body);
      var requestOptions = {
        method: 'POST',
        body: body,
        headers: {'content-type': 'multipart/form-data'},
      };
      const res = await fetch(
        'https://3tdrive.com/webservice/user_login',
        requestOptions,
      );

      const result = await res.json();
      // console.log('user_login', result);

      if (result.status == '1') {
        // alert(JSON.stringify(result?.result?.id));
        showSuccess(localizationStrings?.msg_Login_successfully),
          store.dispatch({type: ID, payload: result?.result?.id});
        store.dispatch({type: USERDATA, payload: result?.result});
        store.dispatch({type: LOGIN});
        setLoading(false);
      } else {
        showError(result.message);
        setLoading(false);
      }
    } catch (error) {
      // console.log('' + error, 'error');
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
      <Statusbar
        barStyle={'light-content'}
        backgroundColor={theme.colors.ButtonText}
      />
      <Text style={styles.heading}>
        {localizationStrings?.Your_phone_number}
      </Text>

      <CustomTextInput
        value={Number}
        lHeight={2}
        fontSize={16}
        fontFamily={'Jost-Medium'}
        mh={30}
        top={5}
        placeholder={localizationStrings?.Your_phone_number}
        onChangeText={setNumber}
        keyboardType={'number-pad'}
      />
      <Text style={styles.heading}>{localizationStrings?.Your_Password}</Text>
      <CustomTextInput
        value={password}
        lHeight={2}
        fontSize={16}
        fontFamily={'Jost-Medium'}
        mh={30}
        top={5}
        placeholder={localizationStrings?.Your_Password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <View
        style={{marginHorizontal: 30, marginTop: 15, alignItems: 'flex-end'}}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text
            style={{
              fontSize: 12,
              color: theme.colors.yellow,
              fontWeight: '500',
            }}>
            {localizationStrings?.forgot_Password}
          </Text>
        </TouchableOpacity>
      </View>

      <CustomButton
        title={'Login'}
        mt={25}
        onPress={() => {
          // return verify();
          signin();
          // confirmCode()
        }}
        loading={loading}
      />

      <View
        style={{alignSelf: 'center', flexDirection: 'row', marginBottom: 25}}>
        <Text
          style={{
            fontSize: 12,
            color: theme.colors.white,
            fontFamily: 'Jost-Regular',
          }}>
          {localizationStrings?.dont_have_Acc + ' '}
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('SetProfile')}>
          <Text
            style={{
              fontSize: 12,
              color: theme.colors.yellow,
              fontWeight: '500',
            }}>
            {localizationStrings?.Register_Now}
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontSize: 12,
          color: theme.colors.lightGray,
          marginHorizontal: 30,
          fontFamily: 'Jost-Regular',
        }}>
        {localizationStrings.PhoneNumber_Description}
      </Text>
      {value.length < 1 && (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 30,
              marginVertical: 20,
            }}>
            <LinearGradient
              colors={['#FFDC0000', '#FFDC00']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={{height: 1, flex: 1, borderRadius: 5}}
            />
            <Text style={styles.or}>OR</Text>
            <LinearGradient
              colors={['#FFDC00', '#FFDC0000']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={{height: 1, flex: 1, borderRadius: 5}}
            />
          </View>
          <View style={styles.social_view}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                onGoogleButtonPress().then(data =>
                  console.log('Signed in with Google!', data),
                )
              }>
              <Image
                source={require('../../assets/icons/Google.png')}
                style={styles.socialIcon}
              />
              <Text style={styles.btnText}>{localizationStrings.Google}</Text>
            </TouchableOpacity>
            <View style={{width: 25}} />
            <TouchableOpacity style={styles.btn} onPress={() => Facebook()}>
              <Image
                source={require('../../assets/icons/Facebook.png')}
                style={styles.socialIcon}
              />
              <Text style={styles.btnText}>{localizationStrings.Facebook}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  btn: {
    flex: 1,
    backgroundColor: '#43413D',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
  },
  btnText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Jost-Regular',
    marginLeft: 10,
  },
  heading: {
    fontSize: 12,
    color: theme.colors.lightGray,
    marginHorizontal: 30,
    // marginBottom: 30,
    marginTop: 50,
    fontFamily: 'Jost-Regular',
  },
  or: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    marginHorizontal: 10,
  },
  socialIcon: {width: 38, height: 38, resizeMode: 'contain'},
  social_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginTop: 20,
  },
});
