import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomButton_2 from './CustomButton_2';
import {useNavigation} from '@react-navigation/native';
import localizationStrings from '../utils/Localization';
// import localizationStrings from '../../utils/Localization';
// import LocalizedStrings from 'react-native-localization';

export default function CancelBookingPopup({onPress, onCancelPress}) {
  const navigation = useNavigation();
  return (
    <View>
      <Text
        style={{
          fontSize: 25,
          fontFamily: 'Jost-Medium',
          color: '#F01D50',
          textAlign: 'center',
          marginTop: 15,
        }}>
        {localizationStrings.CANCEL}
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontFamily: 'Jost-Regular',
          color: '#BAB6AE',
          textAlign: 'center',
          marginTop: 8,
          marginHorizontal: 25,
        }}>
        {/* Are you sure you want to cancel your booking? */}
        {localizationStrings.Cancel_Description}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 10,
        }}>
        <Text
          style={{
            color: '#BAB6AE',
            fontSize: 14,
            fontFamily: 'Jost-Regular',
          }}>
          View our
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
          <Text
            style={{
              color: '#FFDC00',
              fontSize: 14,
              fontFamily: 'Jost-Medium',
            }}>
            {' '}
            {localizationStrings.Terms_And_Conditions}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: '#BAB6AE',
            fontSize: 14,
            fontFamily: 'Jost-Regular',
          }}>
          once for Cancelation
        </Text>
      </View>
      <CustomButton_2
        onPress={onCancelPress}
        title={localizationStrings.Cancel_Booking}
        source={require('../assets/icons/cancel.png')}
        color={'#F01D50'}
        bgColor={'#F01D504D'}
        mh={16}
        mt={15}
      />
      <CustomButton_2
        onPress={onPress}
        title={localizationStrings.Keep_Book}
        source={require('../assets/icons/Keep_Booking.png')}
        color={'#FFDC00'}
        bgColor={'#FFDC004D'}
        mh={16}
        mv={15}
      />
    </View>
  );
}
