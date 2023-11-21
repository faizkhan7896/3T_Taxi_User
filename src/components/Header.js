import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {theme} from '../utils/theme';
import TextFormatted from './TextFormated';
import {useNavigation} from '@react-navigation/native';

export default function Header({
  backimage,
  onPress,
  Headertext,
  sourcetwo,
  onPressTwo,
  backgroundColor,
  sourcethree: sourceforge,
  skippress,
  color,
  // navigation,
  backonPress,
  opacity,
  centreimage,
  marginHorizontal,
  headerimg,
}) {
  // const  backonPress ={navigation.openDrawer()};
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        backgroundColor: backgroundColor,
        // paddingVertical: 13,
        marginBottom: 10,
        marginTop: 30,
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={{
            height: 20,
            width: 20,
            resizeMode: 'contain',
            // opacity: opacity,
          }}
          source={backimage || require('../assets/icons/using/backw.png')}
          // source={backimage}
        />
      </TouchableOpacity>

      {/* <TextFormatted
        style={{
          color: color || theme.colors.Black,
          fontSize: 19,
          fontWeight: '700',
          marginHorizontal:marginHorizontal,
          
        }}>
        {Headertext}
      </TextFormatted> */}
      {!!headerimg && (
        <View
          style={{
            height: 50,
            width: 150,

            resizeMode: 'contain',
            opacity: opacity,
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            marginLeft: 30,
          }}>
          <Image
            style={{
              height: 50,
              width: 50,
              resizeMode: 'contain',
              opacity: opacity,
              // justifyContent:'center',
              // alignContent:'center',
            }}
            source={centreimage}
            // source={backimage}
          />
        </View>
      )}
      <View
        style={{
          resizeMode: 'contain',
        }}>
        <Text
          style={{
            color: color || theme.colors.white,
            fontSize: 18,
            // fontWeight: '700',
            fontFamily: 'Jost-Bold',
            // marginHorizontal:marginHorizontal,
          }}>
          {Headertext}
        </Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Inbox')}>
        <Image
          style={{height: 20, width: 20, resizeMode: 'contain'}}
          source={sourcetwo}
        />
      </TouchableOpacity>
      {!!sourceforge && (
        <TouchableOpacity onPress={skippress}>
          <Image
            style={{height: 80, width: 80, resizeMode: 'contain'}}
            source={sourceforge}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
