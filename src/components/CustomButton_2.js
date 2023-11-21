import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const CustomButton_2 = ({
  color,
  source,
  bgColor,
  title,
  onPress,
  flex,
  ph,
  br,
  mh,
  left,
  mv,
  mb,
  size,
  h,
  tintColor,
  fontSize,
  mt,
  bc,
  bw,
  family,
  loading,
  containerStyle,
  disabled
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={[containerStyle,{
      flex: flex,
      backgroundColor: bgColor,
      height: h || 40,
      flexDirection: 'row',
      borderRadius: br || 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: mh,
      paddingHorizontal: ph,
      marginVertical: mv,
      marginBottom: mb,
      marginTop: mt,
      borderWidth: bw,
      borderColor: bc,
    }]}>
    {loading && <ActivityIndicator size={'small'} />}
    {!!source && !loading && (
      <Image
        source={source}
        style={{
          height: size || 16,
          width: size || 16,
          resizeMode: 'contain',
          tintColor: tintColor,
          marginRight: left || 10,
        }}
      />
    )}
    {!loading && (
      <Text
        style={{
          fontSize: fontSize || 12,
          color: color,
          fontFamily: family || 'Jost-Medium',
        }}>
        {title}
      </Text>
    )}
  </TouchableOpacity>
);

export default CustomButton_2;

const styles = StyleSheet.create({});
