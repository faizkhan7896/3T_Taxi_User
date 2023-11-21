import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Image} from 'react-native';
import {theme} from '../utils/theme';
import GradientLine from './GradientLine';

const BookOption = () => {
  return (
    <RBSheet
      animationType="slide"
      customStyles={{container: {backgroundColor: 'red'}}}>
      <View
        style={{
          backgroundColor: '#25231F',
          borderWidth: 1,
          borderColor: '#36342F',
          margin: 16,
          padding: 15,
          borderRadius: 10,
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/icons/using/Pin.png')}
            style={{
              height: 16,
              width: 16,
              resizeMode: 'contain',
              tintColor: theme.colors.lightGray,
            }}
          />
          <GradientLine
            colors={['#FFDC0000', '#FFDC00']}
            height={15}
            width={1}
            marginVertical={3}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 20,
                backgroundColor: theme.colors.yellow,
                marginLeft: 8,
              }}
            />
            <Image
              source={require('../assets/icons/using/next_arrow.png')}
              style={{height: 8, width: 8, resizeMode: 'contain'}}
            />
          </View>
        </View>
      </View>
    </RBSheet>
  );
};

export default BookOption;

const styles = StyleSheet.create({});
