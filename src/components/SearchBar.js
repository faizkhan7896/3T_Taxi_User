import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from '../utils/theme';
import TextFormatted from './TextFormated';

export default function CustomTextInput({
  placeholder,
  Heading,
  onChangeText,
  value,
  nulll,
  editable,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  onSubmitEditing,
  HideOnPress,
  Hide,
  opacitytwo,
  searchbar,
  search,
  multiline,
  height,
  borderRadius,
  marginTop,
  backgroundColor,
}) {
  return (
    <View>
      {!!Heading && (
        <TextFormatted style={styles.heading}>{Heading}</TextFormatted>
      )}

      <View
        style={{
          backgroundColor: backgroundColor || theme.colors.primary,
          paddingLeft: 15,
          borderRadius: 10,
          marginTop: 10,
          opacity: opacitytwo,
          width: Dimensions.get('window').width - 80,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1.5,
          overflow: 'hidden',
          borderColor: theme.colors.Tabbg,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {!!searchbar && (
            <Image
              style={{height: 24, width: 24, resizeMode: 'contain'}}
              source={searchbar}
            />
          )}
          <TextInput
            paddingHorizontal={15}
            editable={editable}
            style={[styles.textInput, {height: height, marginTop: marginTop}]}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.placeholder}
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            multiline={multiline}
          />
          {!!search && (
            <TouchableOpacity onPress={HideOnPress}>
              <Image
                style={{height: 24, width: 24, resizeMode: 'contain'}}
                source={search}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    fontWeight: '500',
    fontSize: 16,
    // paddingVertical: 15,
    color: theme.colors.Black,
    flex: 1,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 14,
    // marginHorizontal: 30,
    marginTop: 20,
    color: theme.colors.placeholder,
    fontWeight: '500',
  },
  error: {
    color: '#900',
    textDecorationLine: 'underline',
    marginHorizontal: 20,
  },
  optional: {
    fontSize: 14,
    // marginHorizontal: 30,
    // marginTop: 20,
    color: theme.colors.placeholder,
    fontWeight: '700',
  },
});
