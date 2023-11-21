import {View, Text, useWindowDimensions, StyleSheet, Image} from 'react-native';
import React from 'react';
import {theme} from '../utils/theme';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';

import {Divider} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';

export default function SeupProfile({
  placeholder,
  marginBottom,
  placeholderTwo,
  Heading,
  editdeparture,
  value,
  nulll,

  Hide,
  OnPressFour,
  search,
  placeholderFour,
  placeholderTextColor,
}) {
  const dimension = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#25231F',
        margin: 20,
        height: dimension.height / 6,
        borderRadius: 10,
        backgroundColor: '#36342F',
        marginHorizontal: 10,
      }}>
      <View style={{flexDirection: 'row', marginTop: 20, marginHorizontal: 10}}>
        <Image
          source={value}
          style={{
            marginRight: 10,
            resizeMode: 'contain',
          }}></Image>
        <Text style={{color: 'rgba(255, 255, 255, 0.3)'}}> {placeholder}</Text>
        <TouchableOpacity onPress={editdeparture}>
          <Image
            source={search}
            style={{
              marginLeft: 30,
              height: 50,
              width: 90,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Image
          source={Heading}
          style={{
            marginHorizontal: 15,
            resizeMode: 'contain',
            marginBottom: marginBottom,
          }}></Image>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', marginHorizontal: 10}}>
          <Image
            source={nulll}
            style={{
              marginTop: 20,
              marginRight: 10,
              resizeMode: 'contain',
            }}></Image>

          <TextInput
            placeholder={placeholderTwo}
            style={{
              backgroundColor: '#36342F',
              color: theme.colors.white,
              height: 40,
            }}
            selectionColor="#36342F"
            activeUnderlineColor={theme.colors.yellow}
            theme={{
              colors: {
                text: 'white',
              },
            }}
            underlineColor="#36342F"
            placeholderTextColor={placeholderTextColor}
            autoCapitalize="characters"
            keyboardAppearance="dark"
            // backgroundColor={theme.colors.ButtonText}
          />
        </View>
        <Divider
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            marginLeft: 24,
            marginVertical: 10,
          }}
        />
        <Image
          source={Hide}
          style={{
            marginTop: 25,
            resizeMode: 'contain',
          }}
        />
        <TouchableOpacity onPress={OnPressFour}>
          <Text style={{color: 'yellow'}}> {placeholderFour}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
