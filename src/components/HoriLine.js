import {View, Text} from 'react-native';
import React from 'react';

const HoriLine = ({mv, mh}) => {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: '#36342F',
        marginHorizontal: mh || 16,
        marginVertical: mv || 15,
      }}></View>
  );
};

export default HoriLine;
