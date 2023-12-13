import {useNavigation, useRoute} from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useRef, useState} from 'react';
import {Text, View, useWindowDimensions} from 'react-native';
import {useSelector} from 'react-redux';
import CustomButton from '../../components/CustomButton';
import CustomHeader from '../../components/CustomHeader';
import {LOGIN, USERDATA} from '../../redux/ActionTypes';
import store from '../../redux/store';
import {post_api, showError, showSuccess} from '../../utils/Constants';
import {theme} from '../../utils/theme';
import localizationStrings from '../../utils/Localization';

export default function Login() {
  const dimension = useWindowDimensions();
  const [value, setValue] = useState('379130');

  const {userData} = useSelector(state => state.user);
  //console.log(userData);
  const navigation = useNavigation();
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const {params} = useRoute();
  // alert(JSON.stringify(params?.num))

  async function confirmCode() {
    try {
      const verify = await params.confirm.confirm(value);
      //console.log(verify);
      otp();
    } catch (error) {
      //console.log('Invalid code.');
    }
  }

  const otp = () => {
    // if (!value) {
    //   showError('please enter your otp', 'error');
    //   return;
    // }

    const body = new FormData();
    body.append('user_id', userData.id);
    body.append('otp', value);

    setLoading(true);
    post_api('check_otp', body)
      .then(v => {
        setLoading(false);

        //console.log('vvvvvvvvvvvvvvvvvv', v);
        store.dispatch({type: USERDATA, payload: v.result});
        v.result.profile_status == 'unverified'
          ? navigation.navigate('SetProfile')
          : (showSuccess(localizationStrings?.msg_Login_successfully), store.dispatch({type: LOGIN}));
      })
      .catch(v => {
        setLoading(false);
        showError(v.message);
      });
    // apis
    //   .otp({id: userData.id, otp: value, setLoading: setLoading})
    //   .then(data =>
    //     data.verified_status == 'unverified'
    //       ? navigation.navigate('SetProfile')
    //       : store.dispatch({type: LOGIN}),
    //   ); //navigation.navigate('SetupProfile')
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
      <CustomHeader />
      <Text
        style={{
          fontSize: 20,
          color: theme.colors.lightGray,
          marginHorizontal: 20,
          marginVertical: 30,
          fontFamily: 'Jost-SemiBold',
        }}>
        {localizationStrings.Otp_Description}
        {'\n' + params?.num}
      </Text>
      <View style={{alignItems: 'center'}}>
        {/* <KeyboardAvoidingView behavior="height"> */}
        <OTPInputView
          style={{width: '90%', height: 80}}
          pinCount={6}
          autoFocusOnLoad
          code={value}
          onCodeChanged={code => setValue(code)}
          codeInputFieldStyle={{
            paddingHorizontal: 0,
            paddingVertical: 0,
            borderWidth: 0.8,
            borderColor: theme.colors.white,
            color: theme.colors.white,
            fontSize: 20,
            borderRadius: 10,
            height: 45,
            width: 45,
          }}
          codeInputHighlightStyle={{
            borderColor: theme.colors.yellow,
            borderWidth: 1.5,
            fontWeight: '700',
          }}
          onCodeFilled={code => {
            //console.log(`Code is ${code}, you are good to go!`);
          }}
          ref={inputRef}
          onLayout={() => inputRef.current.focus()}
          keyboardAppearance="dark"
          selectionColor={theme.colors.yellow}
        />
        {/* </KeyboardAvoidingView> */}
      </View>
      <CustomButton
        title={localizationStrings.Verify_Code_Button}
        onPress={() => confirmCode()}
        // onPress={() => otp()}
        loading={loading}
        w={dimension.width - 30}
      />
    </View>
  );
}
