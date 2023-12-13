import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {LoginManager} from 'react-native-fbsdk-next';
import LinearGradient from 'react-native-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import {useDispatch} from 'react-redux';
import CustomButton from '../../components/CustomButton';
import Statusbar from '../../components/Statusbar';
import {COUNTRY, ID, LOGIN, USERDATA} from '../../redux/ActionTypes';
import store from '../../redux/store';
import {post_api, showError, showSuccess} from '../../utils/Constants';
import {theme} from '../../utils/theme';
import CustomTextInput from '../../components/CustomTextInput';
import {baseUrl} from '../../utils/constance';
import {firebase} from '@react-native-firebase/messaging';
import localizationStrings from '../../utils/Localization';

export default function Login() {
  const navigation = useNavigation();
  const [Number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const signin = async () => {
    if (!Number) {
      showError(localizationStrings?.msg_email_address);
    }
    try {
      setLoading(true);

      const body = new FormData();
      body.append('forgot_password', `${Number}`);

      //console.log(body);

      var requestOptions = {
        method: 'GET',
      };

      const res = await fetch(
        baseUrl + 'forgot_password?email=' + `${Number}`,
        requestOptions,
      );

      const result = await res.json();
      //console.log('forgot_password', result);

      if (result.status == '1') {
        showSuccess(result?.message);
        navigation.goBack();
        setLoading(false);
      } else {
        showError(result.message);
        setLoading(false);
      }
    } catch (error) {
      //console.log('' + error, 'error');
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
      <Statusbar
        barStyle={'light-content'}
        backgroundColor={theme.colors.ButtonText}
      />
      <Text style={styles.heading}>{localizationStrings?.Registerd_Email}</Text>

      <CustomTextInput
        value={Number}
        lHeight={2}
        fontSize={16}
        fontFamily={'Jost-Medium'}
        mh={30}
        top={5}
        placeholder={localizationStrings?.Email}
        onChangeText={setNumber}
      />

      <CustomButton
        title={'Next'}
        mt={35}
        onPress={() => {
          // return verify();
          signin();
          // confirmCode()
        }}
        loading={loading}
      />

      <Text
        style={{
          fontSize: 12,
          color: theme.colors.lightGray,
          marginHorizontal: 30,
          fontFamily: 'Jost-Regular',
        }}>
        {localizationStrings?.Forgot_Text}
      </Text>
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
