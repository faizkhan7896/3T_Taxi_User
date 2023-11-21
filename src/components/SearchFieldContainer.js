import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import GradientLine from './GradientLine';
import {TextInput} from 'react-native';
import {theme} from '../utils/theme';
import {TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import localizationStrings from '../utils/Localization';

const SearchFieldContainer = ({
  title,
  title2,
  search,
  edit,
  tintColor,
  color2,
  other,
  mh,
  mv,
}) => {
  return (
    <View
      style={{
        backgroundColor: '#25231F',
        borderWidth: 1,
        borderColor: '#36342F',
        margin: 16,
        marginHorizontal: mh,
        marginVertical: mv,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        // height: 100,
      }}>
      <View style={{alignItems: 'center', paddingVertical: 6}}>
        <Image
          source={require('../assets/icons/using/Pin.png')}
          style={{
            height: 16,
            width: 16,
            resizeMode: 'contain',
            tintColor: tintColor,
          }}
        />
        {/* <GradientLine
          colors={['#FFDC0000', '#FFDC00']}
          height={19}
          width={1}
          marginVertical={5}
        /> */}
        <LinearGradient
          colors={['#FFDC0000', '#FFDC00']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            /* height:19, */ width: 1,
            flex: 1,
            borderRadius: 5,
            marginVertical: 5,
          }}
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
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          paddingLeft: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {title ? (
            <Text
              style={{
                color: '#BAB6AE',
                fontFamily: 'Jost-Regular',
                marginTop: 2,
                flex: 1,
              }}>
              {title}
            </Text>
          ) : (
            <TextInput
              placeholder={
                localizationStrings.Departure +
                ' ' +
                localizationStrings.Address
              }
              placeholderTextColor={'#FFFFFF4D'}
              // value="Spireaveien 1"
              style={{
                padding: 0,
                // flex: 1,
                fontSize: 14,
                fontFamily: 'Jost-Regular',
                color: theme.colors.white,
              }}
            />
          )}
          {edit && (
            <TouchableOpacity>
              <Image
                source={require('../assets/icons/using/edit.png')}
                style={{height: 16, width: 16, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{height: 1, backgroundColor: '#36342F', marginVertical: 10}}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {title2 ? (
            <Text
              style={{
                color: color2 || '#fff',
                fontFamily: 'Jost-Regular',
                fontSize: 14,
                lineHeight: 16,
                flex: 1,
              }}>
              {title2}
            </Text>
          ) : (
            <TextInput
              placeholder="Enter Destination"
              placeholderTextColor={'#FFFFFF4D'}
              value="Spireaveien 1"
              style={{
                padding: 0,
                flex: 1,
                fontSize: 14,
                fontFamily: 'Jost-Medium',
                color: theme.colors.white,
              }}
            />
          )}
          {search && (
            <TouchableOpacity onPress={() => navigation.navigate('FullMap')}>
              <Image
                source={require('../assets/icons/using/search.png')}
                style={{height: 16, width: 16, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          )}
          {other}
        </View>
      </View>
    </View>
  );
};

export default SearchFieldContainer;

const styles = StyleSheet.create({});
