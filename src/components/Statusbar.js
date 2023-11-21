import React from 'react';
import {View, Text, SafeAreaView, StatusBar} from 'react-native';

export default function Statusbar({
  backgroundColor,
  props,
  barStyle,
  hidden,
  translucent = false,
}) {
  return (
    <View style={[{backgroundColor, barStyle}]}>
      <SafeAreaView>
        <StatusBar
          translucent={translucent}
          backgroundColor={backgroundColor}
          barStyle={barStyle}
          hidden={hidden}
          {...props}
        />
      </SafeAreaView>
    </View>
  );
}
