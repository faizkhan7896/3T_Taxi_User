import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../utils/theme';

const CustomTextInput = ({
  right,
  label,
  source,
  containerStyle,
  onChangeText,
  value,
  top,
  placeholder,
  multiline,
  height,
  editable,
  veriry,
  lSize,
  labelBottom,
  mh,
  lHeight,
  fontSize,
  fontFamily,
  keyboardType,
  autoCapitalize,
  secureTextEntry
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <View
      style={[
        containerStyle,
        {marginTop: top || 25, marginHorizontal: mh || 16},
      ]}>
      {label && (
        <Text
          style={{
            fontSize: lSize || 12,
            fontFamily: 'Jost-Regular',
            color: '#BAB6AE',
            marginBottom: labelBottom,
          }}>
          {label}
        </Text>
      )}
      <View style={{flexDirection: 'row', marginTop: 3}}>
        <TextInput
          placeholder={placeholder}
          value={value}
          editable={editable}
          onChangeText={onChangeText}
          onFocus={() => setFocus(true)}
          keyboardType={keyboardType}
          multiline={multiline}
          onEndEditing={() => setFocus(false)}
          autoCapitalize={autoCapitalize}
          style={{
            flex: 1,
            paddingVertical: 0,
            paddingHorizontal: 5,
            fontSize: fontSize || 14,
            fontFamily: fontFamily || 'Jost-Regular',
            color: theme.colors.white,
            height: height,
            textAlignVertical: 'top',
          }}
          placeholderTextColor={'#BAB6AE'}
          secureTextEntry={secureTextEntry}
          
        />
        {veriry && (
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Jost-Regular',
              color: '#74C12C',
              marginRight: 10,
            }}>
            Verified
          </Text>
        )}
        {source && (
          <Image
            source={source}
            style={{
              height: 18,
              width: 18,
              resizeMode: 'contain',
            }}
          />
        )}
      </View>
      <View
        style={{
          height: lHeight || 1,
          backgroundColor: focus ? '#FFDC00' : '#535048',
          marginTop: 5,
        }}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({});

{
  /* <TextInput
        style={{
          height: 50,
          //   marginHorizontal: 20,
          //   backgroundColor: 'red',
          paddingHorizontal: 0,
          fontSize: 14,
          //   paddingVertical: 10,
          paddingBottom: 2,
        }}
        // activeOutlineColor="red"
        underlineColor="#BAB6AE"
        value={value}
        onChangeText={onChangeText}
        activeUnderlineColor="#FFDC00"
        placeholderTextColor={'#BAB6AE'}
        label={label}
        theme={{
          fonts: {},
          colors: {
            text: '#f5f5f5',
            accent: '#ffffff',
            primary: '#a3d1ff',
            // placeholder: '#f5f5f5',
            placeholder: '#BAB6AE',
            background: 'transparent',
          },
        }}
        // right={right}
      />*/
}
