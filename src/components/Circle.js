import {View} from 'react-native';
import React from 'react';

const Circle = ({bg}) => (
  <View
    style={{
      height: 12,
      width: 12,
      backgroundColor: bg,
      borderRadius: 50,
    }}
  />
);
export default Circle;
