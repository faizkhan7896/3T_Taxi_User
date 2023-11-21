import {View, Text, Image} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';

export default function AlertPopup({visible, setVisible, source, children}) {
  return (
    <Modal
      isVisible={visible}
      // statusBarTranslucent={true}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}>
      <View>
        <Image
          style={{
            height: 40,
            width: 150,
            alignSelf: 'center',
            // backgroundColor: 'red',
          }}
          resizeMode="contain"
          source={require('../assets/icons/popupbg_top_1.png')}></Image>
        <Image
          // source={require('../assets/icons/call_now.png')}
          source={source}
          style={{
            alignSelf: 'center',
            marginTop: 10,
            position: 'absolute',
            zIndex: 1,
            height: 60,
            width: 60,
            resizeMode: 'contain',
          }}
        />
        <View
          style={{
            backgroundColor: '#25231F',
            borderRadius: 15,
            paddingTop: 25,
          }}>
          {children}
        </View>
      </View>
    </Modal>
  );
}
