import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const GradientLine = ({height, width, flex, colors, marginVertical}) => {
  return (
    <LinearGradient
      colors={colors}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={{height, width, flex, borderRadius: 5, marginVertical}}
    />
  );
};

export default GradientLine;

const styles = StyleSheet.create({});
