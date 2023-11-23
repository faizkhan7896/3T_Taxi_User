import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

export default function Splash() {
  return (
    <View style={{justifyContent: 'center', flex: 1}}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor="transparent"
      />

      <Image
        source={require('../../assets/icons/using/ic_launcher.png')}
        style={{
          width: 150,
          height: 150,
          resizeMode: 'contain',
          marginTop: 10,
          alignSelf: 'center',
        }}
      />
    </View>
  );
}
