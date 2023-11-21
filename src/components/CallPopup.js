import {View, Text, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import ProfileImg from './ProfileImg';
import localizationStrings from '../utils/Localization';
export default function CallPopup() {
  const openDialScreen = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = 'telprompt:${1234567890}';
    } else {
      number = 'tel:${1234567890}';
    }
    Linking.openURL(number);
  };
  const whatscall = () => {
    Linking.openURL(`whatsapp://send?phone=${'1234567890'}`);
  };
  const phoneNumber = '12345678';
  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          fontFamily: 'Jost-Medium',
          color: '#BAB6AE',
          textAlign: 'center',
          marginVertical: 15,
          marginHorizontal: 20,
        }}>
        {localizationStrings.Call_Options_Description}
        {/* Want to call Saimon Jhonson? choose options from below. */}
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderTopWidth: 1,
          borderTopColor: '#434039',
        }}>
        <ProfileImg
          source={require('../assets/icons/call_yellow.png')}
          size={20}
        />
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'Jost-Medium',
            color: '#FFFFFF',
            marginLeft: 10,
            textTransform: 'uppercase',
          }}>
          {localizationStrings.Direct_Call}
          {/* Direct Call From 3T */}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => openDialScreen()}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderTopWidth: 1,
          borderTopColor: '#434039',
        }}>
        <ProfileImg
          source={require('../assets/icons/Phone_yellow.png')}
          size={20}
        />
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'Jost-Medium',
            color: '#FFFFFF',
            marginLeft: 10,
            textTransform: 'uppercase',
          }}>
          {localizationStrings.Phone_Call}
          {/* Call from your Phone */}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderTopWidth: 1,
          borderTopColor: '#434039',
        }}>
        <ProfileImg
          source={require('../assets/icons/whatsapp.png')}
          size={20}
        />
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'Jost-Medium',
            color: '#FFFFFF',
            marginLeft: 10,
            textTransform: 'uppercase',
          }}>
          {localizationStrings.Whatsapp_call}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
