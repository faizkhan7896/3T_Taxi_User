import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {theme} from '../utils/theme';
import {useNavigation} from '@react-navigation/native';
import Statusbar from './Statusbar';

const CustomHeader = ({
  source2,
  onPress2,
  onPress1,
  title,
  size,
  source,
  imgSource,
  size2,
  right,
  left,
  statusBg,
  bg,
}) => {
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: bg || '#171614'}}>
      <Statusbar
        barStyle={'light-content'}
        backgroundColor={statusBg || theme.colors.ButtonText}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          marginTop: 20,
          marginBottom: 15,
        }}>
        {left ? (
          left
        ) : (
          <TouchableOpacity
            onPress={() => onPress1 || navigation.goBack()}
            style={{
              height: 30,
              width: 30,
              //   backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={source || require('../assets/icons/using/Back.png')}
              style={{
                height: size || 28,
                width: size || 28,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        )}
        {imgSource ? (
          <Image
            source={imgSource}
            style={{
              height: 40,
              width: 60,
              resizeMode: 'contain',
            }}
          />
        ) : (
          <Text
            style={{
              fontSize: 20,
              // fontWeight: '600',
              fontFamily: 'Jost-Medium',
              color: theme.colors.white,
              // textTransform: 'uppercase',
              // flex: 1,
              marginHorizontal: 15,
            }}>
            {title}
          </Text>
        )}
        {right}
        {
          <TouchableOpacity
            onPress={onPress2}
            style={{
              height: 30,
              width: 30,
              //   backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={source2}
              style={{
                height: size2 || 28,
                width: size2 || 28,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        }
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});
