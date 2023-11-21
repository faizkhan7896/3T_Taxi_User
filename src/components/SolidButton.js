import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import React from 'react';
import TextFormated from './TextFormated';
import {theme} from '../utils/theme';

export default function SolidButton({
  onPress,
  borderRadius,
  backgroundColor,
  text,
  loading,
  marginHorizontal,
  source,
  color,
  borderWidth,
  borderColor,
  fontSize,
  logo,
  elevation,
  imgheight,
  imgwidth,
  width,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        flexDirection: 'row',
        borderRadius: borderRadius || 6,
        backgroundColor: backgroundColor || theme.colors.yellow,
        // flex: 1,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: elevation || 5,
        marginHorizontal: marginHorizontal || 30,
        borderWidth: borderWidth,
        borderColor: borderColor,
        marginTop: 25,
        width: width,
      }}>
      {text ? (
        loading ? (
          <ActivityIndicator size={'small'} style={{margin: 2}} color="#fff" />
        ) : (
          <View
            style={{
              flexDirection: 'row',
            }}>
            {logo && (
              <Image
                style={{
                  height: imgheight || 15,
                  width: imgwidth || 15,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
                source={logo}
              />
            )}
            <Text
              style={{
                // fontWeight: '100',
                color: color || theme.colors.ButtonText,
                fontSize: fontSize || 14,
                paddingHorizontal: 5,
                fontFamily: 'Jost-Medium',
                // fontWeight: '500',
              }}>
              {text}
            </Text>
          </View>
        )
      ) : (
        <Image
          style={{
            height: 12,
            width: 12,
            resizeMode: 'contain',
          }}
          source={source}
        />
      )}
      {/* )} */}
    </TouchableOpacity>
  );
}
