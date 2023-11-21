import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const TimeText = ({title, date, time,onPress}) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={{flex: 1}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../assets/icons/using/history.png')}
          style={{height: 16, width: 16, resizeMode: 'contain'}}
        />
        <Text
          style={{
            fontFamily: 'Jost-Medium',
            color: '#BAB6AE',
            marginLeft: 10,
          }}>
          {title}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: 'Jost-Regular',
          color: '#BAB6AE',
          marginTop: 5,
        }}>
        {date}
        <Text
          style={{
            fontFamily: 'Jost-SemiBold',
            color: '#BAB6AE',
          }}>
          {time}
        </Text>
      </Text>
    </TouchableOpacity>
  );
};

export default TimeText;

const styles = StyleSheet.create({});
