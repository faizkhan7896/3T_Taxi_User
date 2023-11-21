import {View, Text, Linking} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import CustomButton_2 from './CustomButton_2';
import localizationStrings from '../utils/Localization';
import {useSelector} from 'react-redux';
export default function EmergencyPopup({visible, setVisible}) {
  const {countryId} = useSelector(state => state?.user);

  // alert(JSON.stringify(countryId))
  return (
    <Modal
      isVisible={visible}
      style={{margin: 0, padding: 0}}
      // animationIn="fadeInUp"
      // statusBarTranslucent={true}
      onBackdropPress={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}>
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#25231F',
          borderWidth: 1,
          borderColor: '#36342F',
          bottom: 0,
          width: '100%',
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: '#FFFFFF',
            fontFamily: 'Jost-Regular',
            textAlign: 'center',
            marginVertical: 15,
          }}>
          {localizationStrings.Need_Help_Description}
        </Text>
        <CustomButton_2
          title={
            countryId == '9'
              ? '4748900800'
              : countryId == '10'
              ? '01000914240'
              : '01000914240'
          }
          source={require('../assets/icons/call_yellow.png')}
          tintColor={'#F01D50'}
          color={'#F01D50'}
          bgColor={'#F01D5033'}
          mh={16}
          onPress={() => {
            Linking.openURL(
              countryId == '9'
                ? 'tel:4748900800'
                : countryId == '10'
                ? 'tel:01000914240'
                : 'tel:01000914240',
            );
          }}
        />
        <CustomButton_2
          title={localizationStrings.Police}
          source={require('../assets/icons/emergency.png')}
          tintColor={'#F01D50'}
          color={'#F01D50'}
          bgColor={'#F01D5033'}
          mh={16}
          mt={15}
          mb={20}
          onPress={() => {
            Linking.openURL('tel:112');
          }}
        />
      </View>
    </Modal>
  );
}
