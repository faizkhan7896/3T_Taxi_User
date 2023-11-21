import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

function TextFormatted({children, style, ...props}) {
  return (
    <Text
      {...props}
      style={[
        style,
        {
          fontWeight: style?.fontFamily ? style?.fontWeight : null,
          fontFamily: style?.fontFamily
            ? style?.fontFamily
            : 'Jost' +
              getFontWeightName(style?.fontWeight) +
              (style?.fontStyle == 'italic' ? 'Italic' : ''),
        },
      ]}>
      {children}
    </Text>
  );
}

export default TextFormatted;

const getFontWeightName = weight => {
  if (weight == 'bold') {
    weight = '700';
  }
  if (weight == 'normal') {
    weight = '400';
  }
  var numWeight = parseInt(weight);
  if (!numWeight) {
    return '-Regular';
  }

  return {
    100: '-ExtraLight',
    200: '-ExtraLight',
    300: '-Light',
    400: '-Regular',
    500: '-Medium',
    600: '-SemiBold',
    700: '-Bold',
    800: '-ExtraBold',
    900: '-ExtraBold',
  }[numWeight];
};
