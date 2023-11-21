import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../utils/theme';

const GradientLineWithText = ({title, colors1, colors2, color}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginVertical: 20,
      }}>
      <LinearGradient
        colors={['#D0891F00', '#D0891F'] || colors1}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{height: 1, flex: 1, borderRadius: 5}}
      />
      <Text
        style={{
          fontSize: 14,
          fontWeight: '500',
          color: '#D0891F' || color,
          marginHorizontal: 10,
        }}>
        {title}
      </Text>
      <LinearGradient
        colors={['#D0891F', '#D0891F00'] || colors2}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{height: 1, flex: 1, borderRadius: 5}}
      />
    </View>
  );
};

export default GradientLineWithText;

const styles = StyleSheet.create({});
