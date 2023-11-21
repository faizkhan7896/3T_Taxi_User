import {StyleSheet, Text, Image, ImageBackground, View} from 'react-native';
import React from 'react';

export default function ProfileImg({
  size,
  profile,
  br,
  source,
  imgStyle,
  rating,
}) {
  return (
    <ImageBackground
      source={source}
      resizeMode="cover"
      imageStyle={{
        borderRadius: br,
        height: size,
        width: size,
        overflow: 'hidden',
        backgroundColor: '#36342F',
      }}
      style={[
        imgStyle,
        {
          height: size,
          width: size,
          alignItems: 'center',
          overflow: 'hidden',
          justifyContent: 'flex-end',
        },
      ]}>
      <View
        style={{
          paddingVertical: 3,
          paddingHorizontal: 5,
          // backgroundColor: '#00000088',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          borderBottomRightRadius: 100,
        }}>
        {profile == false ? (
          <Image
            source={require('../assets/icons/Star.png')}
            resizeMode="contain"
            style={{
              height: 10,
              width: 10,
              tintColor: '#FFDC00',
              marginRight: 5,
            }}
          />
        ) : null}
        {profile == false ? (
          <Text style={{fontSize: 12, color: '#FFDC00'}}>{rating}</Text>
        ) : null}
      </View>
    </ImageBackground>
  );
}
