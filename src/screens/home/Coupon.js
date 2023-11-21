import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {theme} from '../../utils/theme';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader';
import {ScrollView} from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomButton_2 from '../../components/CustomButton_2';
import {baseUrl} from '../../utils/constance';
import Clipboard from '@react-native-clipboard/clipboard';
import {useSelector} from 'react-redux';
import localizationStrings from '../../utils/Localization';

export default function SeupProfile(props) {
  const dimension = useWindowDimensions();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {userData, userId} = useSelector(state => state.user);
  // alert(JSON.stringify(userData?.promo_code_detail));

  // alert(JSON.stringify(userData?.promo_code_detail?.discount_percent))

  const get_Codes = async () => {
    try {
      setLoading(true);
      const response = await fetch(baseUrl + 'get_coupon_codes');
      const res = await response.json();
      console.log(res);
      if (res.status == '1') {
        setData(res.result);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      ShowToast(error);
    }
  };
  useEffect(() => {
    get_Codes();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
      <CustomHeader title={localizationStrings.Promo_Code} />
      <ScrollView>
        {userData?.promo_code_detail?.discount_percent != undefined && (
          <ImageBackground
            source={require('../../assets/icons/promo_bg.png')}
            resizeMode="stretch"
            style={{
              marginHorizontal: 26,
              paddingHorizontal: 27,
              marginBottom: 20,
            }}>
            <Text
              style={{
                marginTop: 30,
                textAlign: 'center',
                fontSize: 30,
                color: '#FFFFFF',
                fontFamily: 'Jost-Medium',
              }}>
              {userData?.promo_code_detail?.discount_percent} % Off
            </Text>
            <Line />

            <Text
              style={{
                fontSize: 16,
                color: '#FFFFFF',
                fontFamily: 'Jost-Medium',
                // marginHorizontal: 27,
                marginTop: 3,
                marginBottom: 9,
              }}>
              {userData?.promo_code_detail?.title}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#948E82',
                fontFamily: 'Jost-Regular',
                // marginHorizontal: 27,
              }}>
              {userData?.promo_code_detail?.description}
            </Text>
            {/* <Text
              style={{
                fontSize: 12,
                color: '#948E82',
                fontFamily: 'Jost-Regular',
                // marginHorizontal: 27,
                marginTop: 20,
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra
              mauris, velit cursus vitae, eget massa arcu porta metus. Nibh
              praesent posuere sem.
            </Text> */}
            <Line />
            <Text
              style={{
                fontSize: 10,
                color: '#BAB6AE',
                fontFamily: 'Jost-Regular',
                textAlign: 'center',
              }}>
              COUPON CODE
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: '#FFFFFF',
                fontFamily: 'Jost-SemiBold',
                marginTop: 12,
                textAlign: 'center',
                letterSpacing: 7,
              }}>
              {userData?.promo_code_detail?.coupon_code}
            </Text>
            <CustomButton
              // onPress={() => Clipboard.setString(userData?.promo_code_detail?.coupon_code)}
              w={dimension.width - 110}
              title={'Redeem'}
            />
          </ImageBackground>
        )}

        {data?.map((v, i) => (
          <ImageBackground
            source={require('../../assets/icons/promo_bg.png')}
            resizeMode="stretch"
            style={{
              marginHorizontal: 26,
              paddingHorizontal: 27,
              marginBottom: 20,
            }}>
            <Text
              style={{
                marginTop: 30,
                textAlign: 'center',
                fontSize: 30,
                color: '#FFFFFF',
                fontFamily: 'Jost-Medium',
              }}>
              {v?.discount_percent} % Off
            </Text>
            <Line />

            <Text
              style={{
                fontSize: 16,
                color: '#FFFFFF',
                fontFamily: 'Jost-Medium',
                // marginHorizontal: 27,
                marginTop: 3,
                marginBottom: 9,
              }}>
              {v?.title}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#948E82',
                fontFamily: 'Jost-Regular',
                // marginHorizontal: 27,
              }}>
              {v?.description}
            </Text>
            {/* <Text
              style={{
                fontSize: 12,
                color: '#948E82',
                fontFamily: 'Jost-Regular',
                // marginHorizontal: 27,
                marginTop: 20,
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra
              mauris, velit cursus vitae, eget massa arcu porta metus. Nibh
              praesent posuere sem.
            </Text> */}
            <Line />
            <Text
              style={{
                fontSize: 10,
                color: '#BAB6AE',
                fontFamily: 'Jost-Regular',
                textAlign: 'center',
              }}>
              COUPON CODE
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: '#FFFFFF',
                fontFamily: 'Jost-SemiBold',
                marginTop: 12,
                textAlign: 'center',
                letterSpacing: 7,
              }}>
              {v?.coupon_code}
            </Text>
            <CustomButton
              // onPress={() => Clipboard.setString(v?.coupon_code)}
              w={dimension.width - 110}
              title={'Redeem'}
            />
          </ImageBackground>
        ))}

        {/* <View style={{marginTop: 20}}>
          <Text
            style={{
              color: '#948E82',
              fontSize: 12,
              textAlign: 'center',
              fontFamily: 'Jost-Regular',
              marginHorizontal: 26,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra
            mauris, velit cursus vitae, eget massa arcu porta metus. Nibh
            praesent posuere sem enim, proin pellentesque lectus non nisl.
            Venenatis.
          </Text>

          <CustomButton_2
            title={'Share and Earn Reward'}
            color="#FFDC00"
            bgColor={'#FFDC004D'}
            mh={26}
            mv={15}
          />
        </View> */}
      </ScrollView>
    </View>
  );
}
const Line = () => (
  <View style={{height: 1, backgroundColor: '#535048', marginVertical: 25}} />
);
const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: 26,
    alignSelf: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
});
