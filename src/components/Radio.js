import {View, Text, useWindowDimensions, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../utils/theme';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';

import {Divider} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
import SwipeButton from 'rn-swipe-button';
import {RadioButton} from 'react-native-paper';
import SolidButton from './SolidButton';
import localizationStrings from '../../utils/Localization';
// import MapView from 'react-native-maps';

export default function Radio({
  placeholder,
  marginBottom,
  placeholderTwo,
  Heading,
  editdeparture,
  value,
  nulll,
  height,
  Hide,
  OnPressFour,
  search,
  width,
  placeholderFour,
  placeholderTextColor,
  isdivide,
  scar,
  heightTwo,
  margin,
  marginHorizontal,
  borderRadius,
  Viewheight,
  notes,
  textinput,
  dividerTop,
  placeholdertext,
  onPress,
}) {
  const dimension = useWindowDimensions();
  const navigation = useNavigation();
  const [checked, setChecked] = useState('first');
  const [checkedd, setCheckedd] = useState('');
  const Car = () => {
    return (
      <Image
        source={require('../assets/icons/using/scar.png')}
        style={{height: 40, width: 40, resizeMode: 'contain', padding: 0}}
      />
    );
  };
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#36342F',
        margin: margin || 20,
        height: Viewheight || dimension.height / 7,
        borderRadius: borderRadius || 10,
        backgroundColor: '#36342F',
        marginHorizontal: marginHorizontal || 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 10,
          justifyContent: 'space-between',
        }}>
        <View style={{}}>
          <Text style={{color: 'white', fontSize: 16}}> {placeholder}</Text>

          <Text
            style={{
              color: 'rgba(255, 255, 255, 0.3)',
              marginVertical: 5,
              fontSize: 11,
            }}>
            {' '}
            {placeholdertext}
          </Text>
        </View>

        <TouchableOpacity onPress={editdeparture}>
          <Image
            source={search}
            style={{
              // marginLeft: 90,
              height: height || 20,
              width: width || 20,
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
        {!isdivide && (
          <Divider
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              marginTop: 20,
            }}
          />
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 15,
            marginVertical: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <RadioButton
              value="first"
              color="#BAB6AE"
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('first')}
            />
            <Text style={{color: 'white', fontSize: 12, alignSelf: 'center'}}>
              {' '}
              Ask a Price
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <RadioButton
              value="second"
              color="#BAB6AE"
              status={checked === 'second' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('second')}
            />
            <Text style={{color: 'white', fontSize: 12, alignSelf: 'center'}}>
              {' '}
              {placeholder}
            </Text>
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{marginHorizontal: 10}}>
          <Text style={{color: 'white', fontSize: 12, alignSelf: 'center'}}>
            {' '}
            Enter your price below
          </Text>
          <TextInput
            placeholder={placeholderTwo}
            style={{
              backgroundColor: '#36342F',
              color: theme.colors.white,
              height: heightTwo || 40,
            }}
            selectionColor="#36342F"
            activeUnderlineColor="null"
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

        <Image
          source={Hide}
          style={{
            marginTop: 15,
            resizeMode: 'contain',
            marginLeft: 100,
          }}
        />
        <TouchableOpacity onPress={OnPressFour}>
          <Text style={{color: 'yellow', marginVertical: 5}}>
            {' '}
            {placeholderFour}
          </Text>
        </TouchableOpacity>
      </View>
      <Divider
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          marginVertical: 18,
        }}
      />
      <View style={{width: dimension.width, marginVertical: 10}}>
        <SolidButton
          text={localizationStrings.Ask_now}
          backgroundColor="rgba(255, 220, 0, 0.3)"
          color={theme.colors.yellow}
          borderColor={theme.colors.yellow}
          borderWidth={1}
          borderRadius={30}
          onPress={onPress}
          // onPress={() => setOpen(true)}
        />
      </View>
    </View>
  );
}
