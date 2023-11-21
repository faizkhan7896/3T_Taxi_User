import React from 'react';
import {View, Image, Text, TouchableOpacity, Dimensions} from 'react-native';
import {theme} from '../utils/theme';
import TextFormatted from './TextFormated';

export default function SelectLanguage({
  text,
  image,
  selected,
  onPress,
  width,
  marginLeft,
  marginRight,
  source,
}) {
  return (
    <TouchableOpacity
      style={{
        marginTop: 13,
        paddingVertical: 10,
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 15,
        borderRadius: 20,
        // marginHorizontal: 6,
        alignItems: 'center',
        // justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: selected ? theme.colors.Button : theme.colors.primary,
        width: Dimensions.get('window').width / 2.3,
        flexDirection: 'row',
      }}
      onPress={onPress}>
      <Image
        style={{
          height: 20,
          width: 20,
          resizeMode: 'contain',
        }}
        source={source}
        // source={require('../Assets/icons/Photographyactive.png')}
      />
      <View style={{width: 10}} />
      <TextFormatted
        numberOfLine={1}
        style={{
          fontSize: 15,
          color: selected ? theme.colors.OtherText : '#000',
          textAlign: 'left',
        }}>
        {text}
      </TextFormatted>
    </TouchableOpacity>
  );
}
