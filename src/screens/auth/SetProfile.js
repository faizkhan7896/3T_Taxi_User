import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  Dimensions,
  Image,
  TextInput as RNTextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {theme} from '../../utils/theme';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import CustomHeader from '../../components/CustomHeader';
import CustomButton from '../../components/CustomButton';
import {useSelector} from 'react-redux';
import {ShowToast, validate} from '../../utils/constance';
import {apis} from '../../utils/apis';
import CustomTextInput from '../../components/CustomTextInput';
import {post_api, showError, showSuccess} from '../../utils/Constants';
import {COUNTRY, ID, LOGIN, USERDATA} from '../../redux/ActionTypes';
import RNPickerSelect from 'react-native-picker-select';
import store from '../../redux/store';
import localizationStrings from '../../utils/Localization';

export default function SetProfile() {
  const {countryId, cityId} = useSelector(state => state?.user);

  const dimension = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [country, setCountry] = useState({});
  const [AllCountrys, setAllCountrys] = useState([]);
  const [Number, setNumber] = useState('');
  // alert(JSON.stringify(country))

  const GetCountry = async id => {
    const body = new FormData();
    post_api('get_country')
      .then(v => {
        console.log('contineu===>', v);
        setLoading(false);
        if (v.status == 1) {
          setAllCountrys(v?.result);
          v?.result.map((X, i) => X.id == countryId && setCountry(X));
          // showSuccess('Ride continue successfully');
          return;
        }
        // showError(v.message);
      })
      .catch(e => {
        setLoading(false);
        showError(e);
      });
  };

  useEffect(() => {
    GetCountry();
  }, []);

  const signup = () => {
    if (!fName || !lName || !email || !Number) {
      showError(localizationStrings?.msg_fill_all_field);
      return;
    }
    if (!validate(email)) {
      showSuccess(localizationStrings?.msg_valid_email);
      return;
    }
    const body = new FormData();
    // body.append('user_id', userData.id);
    body.append('first_name', fName);
    body.append('last_name', lName);
    body.append('email', email);
    body.append('user_name', fName + ' ' + lName);
    body.append('country', country?.id);
    body.append('mobile', country?.phone_code + '' + Number);
    setLoading(true);
    console.log(body);
    // return;
    post_api('userSignUp', body)
      .then(v => {
        setLoading(false);
        if (v.status == '1') {
          // alert(JSON.stringify(v?.result))
          store.dispatch({type: ID, payload: v?.result[0]?.id});
          store.dispatch({type: USERDATA, payload: v?.result[0]});
          store.dispatch({type: LOGIN});
          navigation.navigate('SetupPayment');
          setLoading(false);
        } else {
          showError(v.message);
        }
      })
      .catch(v => {
        setLoading(false);
        showError(v.message);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
      <CustomHeader />

      <Text style={styles.label}>
        {localizationStrings.Your_First_Name_CAPITAL}
        {/* YOUR FIRST  */}
      </Text>
      <CustomTextInput
        value={fName}
        lHeight={2}
        fontSize={16}
        fontFamily={'Jost-Medium'}
        mh={30}
        top={15}
        placeholder={localizationStrings?.First_name_placeholder}
        onChangeText={setFName}
      />
      <Text style={styles.label}>
        {' '}
        {localizationStrings.Your_LAST_Name_CAPITAL}
      </Text>
      <CustomTextInput
        value={lName}
        lHeight={2}
        fontSize={16}
        fontFamily={'Jost-Medium'}
        mh={30}
        top={15}
        placeholder={localizationStrings?.Last_name_placeholder}
        onChangeText={setLName}
      />

      <Text style={styles.label}>{localizationStrings.Your_Email_CAPITAL}</Text>
      <CustomTextInput
        value={email}
        lHeight={2}
        fontSize={16}
        fontFamily={'Jost-Medium'}
        mh={30}
        top={15}
        placeholder={localizationStrings?.Email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={{alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: theme.colors.ButtonText,
            // borderRadius: 5,
            marginTop: 10,
            width: Dimensions.get('window').width - 60,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            paddingHorizontal: 7,
            borderColor: theme.colors.white,
          }}>
          <View style={{flex: 0.5}}>
            <RNPickerSelect
              placeholder={{label: ''}}
              onValueChange={value => setCountry(value)}
              value={country}
              useNativeAndroidPickerStyle={false}
              style={{
                placeholder: {
                  color: '#fff',
                  fontWeight: '600',
                  paddingVertical: 15,
                  paddingTop: 8,
                  paddingBottom: 8,
                  fontSize: 10,
                  // backgroundColor: 'red',
                },
                inputIOS: {
                  color: '#fff',
                  fontWeight: '600',
                  paddingVertical: 15,
                  paddingTop: 8,
                  paddingBottom: 8,
                  fontSize: 10,
                },
                inputAndroid: {
                  fontSize: 14,
                  color: '#fff',
                  fontWeight: '600',
                  paddingVertical: 15,
                  paddingTop: 8,
                  paddingBottom: 8,
                },
              }}
              items={
                AllCountrys?.map?.(v => ({
                  label: '+ ' + v?.phone_code + ' (' + v?.sortname + ')',
                  value: v,
                })) || []
              }
            />
          </View>
          <Image
            style={{
              height: 10,
              width: 10,
              resizeMode: 'contain',
            }}
            source={require('./../../assets/icons/picker.png')}
          />
          <RNTextInput
            maxLength={country?.id == '9' ? 8 : 11}
            value={Number}
            onChangeText={setNumber}
            placeholder={localizationStrings?.Phone_number_placeholder}
            placeholderTextColor={theme.colors.white}
            keyboardType="number-pad"
            style={{
              backgroundColor: theme.colors.ButtonText,
              flex: 1,
              paddingHorizontal: 15,
              color: theme.colors.white,
              fontWeight: '600',
            }}
          />
        </View>
      </View>
      <CustomButton
        title={localizationStrings.Next}
        onPress={() => signup()}
        mt={35}
        loading={loading}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    color: theme.colors.lightGray,
    marginTop: 25,
    fontFamily: 'Jost-SemiBold',
    marginHorizontal: 30,
  },
  inputText: {
    backgroundColor: theme.colors.ButtonText,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Jost-Medium',
    height: 50,
  },
});
