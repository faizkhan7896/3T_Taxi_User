import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {theme} from '../utils/theme';

const CustomButton = ({
  title,
  onPress,
  vert,
  top,
  mt,
  bc,
  bw,
  bg,
  color,
  flex,
  w,
  mb,
  loading,
}) => {
  const {width} = useWindowDimensions();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginTop: top || 20,
        marginVertical: vert || 20,
        // marginHorizontal: hor || 30,
        width: w || width - 60,
        alignSelf: 'center',
        height: 40,
        backgroundColor: bg || theme.colors.yellow,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: mt,
        borderWidth: bw,
        borderColor: bc,
        flex: flex,
        marginBottom: mb,
      }}>
      {loading ? (
        <ActivityIndicator size={'small'} />
      ) : (
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'Jost-Medium',
            color: color || '#171614',
          }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
