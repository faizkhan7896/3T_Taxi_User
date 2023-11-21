import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#171614',
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 100,
      }}>
      <Image
        source={require('../assets/icons/using/loader_1.gif')}
        style={{
          height: 70,
          width: 100,
          resizeMode: 'contain',
          borderRadius: 80,
        }}
      />
      <Text
        style={{
          fontSize: 18,
          fontFamily: 'Jost-Medium',
          color: '#FFFFFF',
          lineHeight: 20,
        }}>
        Loading...
      </Text>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
