import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import {ScrollView} from 'react-native';
import CustomButton_2 from '../../components/CustomButton_2';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {ShowToast} from '../../utils/constance';
import {get_Profile, post_api} from '../../utils/Constants';
import {theme} from '../../utils/theme';
import localizationStrings from '../../utils/Localization';

const AddAmount = ({navigation}) => {
  const {params} = useRoute();
  const [loading, setLoading] = useState(false);
  // alert(JSON.stringify(params?.cardData?.card_cvv))
  const {userId, userData} = useSelector(state => state.user);
  const [amount, setamount] = useState('');
  const dimension = useWindowDimensions();
  const [success, setSuccess] = useState(false);

  const {countryId} = useSelector(state => state.user||9);

  const country =
    countryId == '4'
      ? 'INR'
      : countryId == '9'
      ? 'NOK'
      : countryId == '10'
      ? 'EGP'
      : countryId == '11' && 'SAR';

  const Get_Token = () => {
    const body = new FormData();
    body.append('card_number', params?.cardData?.card_num);
    body.append('expiry_month', params?.cardData?.card_exp?.split('/')[0]);
    body.append('expiry_year', params?.cardData?.card_exp?.split('/')[1]);
    body.append('cvc_code', params?.cardData?.card_cvv);
    console.log(body);

    setLoading(true);
    post_api('get_token', body).then(v => {
      if (v.status == 1) {
        console.log(v);
        AddMoney(v?.result?.id);
      }
      setLoading(false);
    });
  };

  const AddMoney = token => {
    const body = new FormData();
    body.append('user_id', userId);
    body.append('amount', amount);
    body.append('token', token);
    body.append('currency', country);
    console.log(body);
    // return;

    setLoading(true);
    post_api('add_wallet', body).then(v => {
      if (v.status == 1) {
        get_Profile(userId);
        // console.log(v);
        setSuccess(true);
      } else {
        ShowToast(v?.result?.code);
        setLoading(false);
      }
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#171614'}}>
      {success == false ? (
        <View style={{flex: 1, backgroundColor: '#171614'}}>
          <CustomHeader title={'Enter Amount'} />
          <ScrollView
            contentContainerStyle={{flexGrow: 1, paddingHorizontal: 16}}>
            <Text
              style={{
                fontSize: 12,
                color: '#BAB6AE',
                fontFamily: 'Jost-Regular',
                marginTop: 20,
                marginBottom: 10,
              }}>
              Enter Amount Below
            </Text>
            <TextInput
              placeholder="Type your amount here..."
              placeholderTextColor={'#FFFFFF'}
              keyboardType="number-pad"
              autoFocus
              value={amount}
              onChangeText={setamount}
              style={{
                height: 50,
                // alignSelf: 'center',
                backgroundColor: '#25231F',
                borderRadius: 7,
                paddingHorizontal: 15,
                paddingVertical: 0,
                fontFamily: 'Jost-Medium',
                color: '#FFFFFF',
              }}
            />
          </ScrollView>
          <CustomButton_2
            loading={loading}
            title={localizationStrings.Next}
            bgColor={'#FFDC004D'}
            color={'#FFDC00'}
            onPress={() => {
              if (!amount) {
                ShowToast(localizationStrings?.msg_enter_amount);
                return;
              }
              Get_Token();
              // return navigation.navigate('AddAmount');
            }}
            mh={16}
            mb={30}
          />
        </View>
      ) : (
        <View style={{flex: 1, backgroundColor: theme.colors.bg}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../assets/icons/using/Payment.png')}
              style={{
                height: dimension?.width / 2.5,
                width: dimension?.width / 2.5,
                resizeMode: 'contain',
              }}
            />
            <Text
              style={{
                fontSize: 30,
                color: '#74C12C',
                fontWeight: '600',
                marginTop: 30,
              }}>
              {country + ' ' + amount}
            </Text>
          </View>
          <CustomButton_2
            onPress={() => navigation.goBack()}
            title={'Payment Done'}
            bgColor={'#74C12C4D'}
            color={'#74C12C'}
            mb={30}
            mh={18}
          />
        </View>
      )}
    </View>
  );
};

export default AddAmount;

const styles = StyleSheet.create({});
