import {View, Text, useWindowDimensions, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton_2 from './CustomButton_2';
import Modal from 'react-native-modal';
import {data, theme} from '../utils/theme';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {post_api} from '../utils/Constants';
import {ShowToast, baseUrl} from '../utils/constance';
import localizationStrings from '../utils/Localization';

export default function PaymentOptions({
  isOpen,
  setIsOpen,
  setSelected,
  selected,
  price,
  setCardDetails,
}) {
  const navigation = useNavigation();
  const {userId, userData} = useSelector(state => state.user);
  const {countryId} = useSelector(state => state.user || 9);
  const [Data, setData] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const dimension = useWindowDimensions();
  // alert(JSON.stringify(userId))
  //   alert(JSON.stringify(userData?.promo_code_detail));

  const country =
    countryId == '4'
      ? 'INR'
      : countryId == '9'
      ? 'NOK'
      : countryId == '10'
      ? 'EGP'
      : countryId == '11' && 'SAR';

  // alert(JSON.stringify(userData?.payment_option))

  const get_Codes = async () => {
    try {
      const url = baseUrl + 'get_coupon_codes?user_id=' + userId;
      console.log(url);
      const response = await fetch(url);
      const res = await response.json();
      console.log(res);
      if (res.status == '1') {
        // console.log(v);
        setData(res?.result);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_Codes();
  }, []);

  const ListItem = ({source, text, onPress, description, Check}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: '#171614',
          marginHorizontal: 20,
          paddingHorizontal: 15,
          borderRadius: 5,
          paddingVertical: 10,
          marginTop: 15,
          borderBottomWidth: 1,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={source}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
              marginRight: 15,
              tintColor: theme.colors.yellow,
            }}
          />
          <View style={{width: dimension.width / 1.6}}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 13,
                color: theme.colors.white,
                fontFamily: 'Jost-Medium',
              }}>
              {text}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 11,
                color: theme.colors.white,
                fontFamily: 'Jost-Medium',

                color: '#948E82',
              }}>
              {description}
            </Text>
          </View>
        </View>

        <Image
          // source={require('../../assets/icons/using/Cross.png')}
          source={Check}
          style={{
            width: 22,
            height: 22,
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      isVisible={isOpen}
      style={{margin: 0, padding: 0}}
      onBackdropPress={() => setIsOpen(false)}
      onBackButtonPress={() => setIsOpen(false)}>
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#36342F',
          bottom: 0,
          width: '100%',
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          //   paddingBottom: 50,
          maxHeight: dimension.height / 1.8,
        }}>
        <Text
          style={{
            color: theme.colors.white,
            fontFamily: 'Jost-SemiBold',
            textDecorationLine: 'underline',
            textDecorationColor: '#fff',
            fontSize: 17,
            color: '#fff',
            marginVertical: 15,
            marginHorizontal: 20,
          }}>
          {localizationStrings?.Apply_Coupan_Code}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}></View>

        {/* {selected == 'Card' && ( */}
        <ScrollView style={{}}>
          {Data.map((v, i) => (
            <ListItem
              onPress={() => {
                setSelectedCard(v);
                setCardDetails(v);
              }}
              key={i}
              source={require('../assets/icons/using/Promo.png')}
              text={v.coupon_code}
              description={v.description}
              Check={
                selectedCard == v
                  ? require('../assets/icons/using/Checked.png')
                  : null
              }
            />
          ))}
        </ScrollView>
        {/* // // )} */}
        {/* <View style={{flexDirection: 'row', marginVertical: 10}}> */}
        <CustomButton_2
          bgColor={'#FFDC004D'}
          color="#FFDC00"
          title={localizationStrings?.Apply}
          flex={1}
          mh={10}
          mv={20}
          onPress={() => setIsOpen(false)}
        />
        {/* </View> */}
      </View>
    </Modal>
  );
}

const Card = ({title, source, onPress, selected}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: selected == title ? '#FFDC001A' : '#171614',
        borderWidth: 1,
        borderColor: selected == title ? '#FFDC00' : '#36342F',
        flexDirection: 'row',
        borderRadius: 6,
        height: 40,
        width: (Dimensions.get('window').width - 55) / 2,
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
      }}>
      <Image
        source={source}
        style={{height: 30, width: 30, resizeMode: 'contain'}}
      />
      <Text
        style={{
          fontSize: 14,
          color: theme.colors.white,
          fontFamily: 'Jost-Medium',
          marginHorizontal: 10,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
