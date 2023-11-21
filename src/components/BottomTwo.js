import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
// import Radio from './Radio';
import {useNavigation} from '@react-navigation/native';
import Modalss from './Modalss';
import {TextInput} from 'react-native-paper';
import {theme} from '../utils/theme';
import ProfileBox from './ProfileBox';
import {Divider} from 'react-native-elements';

import {RadioButton} from 'react-native-paper';
import SolidButton from './SolidButton';
import localizationStrings from '../utils/Localization';
export default function BottomSheet({
  logoOne,
  logoTwo,

  placeholder,
  marginBottom,
  placeholderTwo,
  Heading,
  editdeparture,
  Textheight,
  height,
  Hide,
  OnPressFour,
  search,
  width,
  placeholderFour,
  placeholderTextColor,
  isdivide,

  heightTwo,
  margin,
  marginHorizontal,
  borderRadius,
  Viewheight,
  text,
  textTwo,
  placeholdertext,
  onPress,
  refRBSheet,
  Bottomopen,
}) {
  const dimension = useWindowDimensions();
  const navigation = useNavigation();
  const [checked, setChecked] = useState('first');
  const [checkedd, setCheckedd] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisiblee, setModalVisiblee] = useState(false);
  const [driver, setDriver] = useState(false);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <RBSheet
        ref={refRBSheet}
        height={dimension.height / 1.5}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#36342F',
            width: '100%',
            height: dimension.height / 1.6,
          },
          // wrapper: {
          //   backgroundColor: "transparent"
          // },
          // draggableIcon: {
          //   backgroundColor: "#36342F"
          // }
        }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#36342F',
            margin: margin || 20,
            height: Viewheight || dimension.height / 7,
            borderRadius: borderRadius || 10,
            backgroundColor: '#36342F',
            marginHorizontal: marginHorizontal || 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              justifyContent: 'space-between',
            }}>
            <View style={{}}>
              <Text style={{color: 'white', fontSize: 16}}> {placeholder}</Text>

              <Text
                style={{
                  color: 'rgba(255, 255, 255, 0.3)',
                  marginVertical: 5,
                  fontSize: 11,
                }}>
                {' '}
                {placeholdertext}
              </Text>
            </View>

            <TouchableOpacity onPress={editdeparture}>
              <Image
                source={search}
                style={{
                  // marginLeft: 90,
                  height: Textheight || 20,
                  width: width || 20,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Image
              source={Heading}
              style={{
                marginHorizontal: 15,
                resizeMode: 'contain',
                marginBottom: marginBottom,
              }}></Image>

            <View
              style={{
                justifyContent: 'space-between',
                marginHorizontal: 15,
                marginVertical: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <RadioButton
                  value="first"
                  color="#BAB6AE"
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('first')}
                />
                <Text
                  style={{color: 'white', fontSize: 12, alignSelf: 'center'}}>
                  {localizationStrings.Book_another}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <RadioButton
                  value="second"
                  color="#BAB6AE"
                  status={checked === 'second' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('second')}
                />
                <Text
                  style={{color: 'white', fontSize: 12, alignSelf: 'center'}}>
                  {localizationStrings.Book_another}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <RadioButton
                  value="second"
                  color="#BAB6AE"
                  status={checked === 'second' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('second')}
                />
                <Text
                  style={{color: 'white', fontSize: 12, alignSelf: 'center'}}>
                  {' '}
                  {localizationStrings.Unable_driver}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <RadioButton
                  value="second"
                  color="#BAB6AE"
                  status={checked === 'second' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('second')}
                />
                <Text
                  style={{color: 'white', fontSize: 12, alignSelf: 'center'}}>
                  {' '}
                  {localizationStrings.Reason_List}
                </Text>
              </View>
            </View>
          </View>

          <Text style={{color: 'white', fontSize: 12}}>
            {' '}
            {/* Enter your reason below */}
            {localizationStrings.Enter_Reason}
          </Text>
          <View style={{width: dimension.width - 10, backgroundColor: 'Black'}}>
            <TextInput
              maxLength={140}
              multiline
              numberOfLines={4}
              placeholder={placeholderTwo}
              backgroundColor="gray"
              placeholderTextColor="black"
              borderRadius={10}
              activeUnderlineColor="null"
              style={{borderRadius: 10, margin: 5}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: dimension.width - 80,
              marginVertical: 5,
            }}>
            <View style={{width: dimension.width / 2}}>
              <SolidButton
                text={text}
                logo={logoOne}
                onPress={onPress}
                borderRadius={50}
                backgroundColor=" rgba(116, 193, 44, 0.3)"
                color="#74C12C"
                elevation={1}
              />
            </View>
            <View style={{width: dimension.width / 2}}>
              <SolidButton
                text={textTwo}
                logo={logoTwo}
                // onPress={onBottomPress}

                onPress={OnPressFour}
                borderRadius={50}
                backgroundColor="rgba(240, 29, 80, 0.4)"
                elevation={1}
                color="#F01D50"
              />
            </View>
          </View>
        </View>
      </RBSheet>
    </View>
  );
}
