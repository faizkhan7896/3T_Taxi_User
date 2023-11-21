import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomButton_2 from './CustomButton_2';
import Modal from 'react-native-modal';
import {theme} from '../utils/theme';
import CustomTextInput from './CustomTextInput';
import {useSelector} from 'react-redux';
import localizationStrings from '../utils/Localization';
const AskNow = ({isOpen, setIsOpen, onPress}) => {
  const [freeTrip, setFreeTrip] = useState(false);
  const {userData, countryId} = useSelector(state => state.user||9);

  const country =
    countryId == '4'
      ? 'INR'
      : countryId == '9'
      ? 'NOK'
      : countryId == '10'
      ? 'EGP'
      : countryId == '11' && 'SAR';
  return (
    <Modal
      isVisible={isOpen}
      style={{margin: 0, padding: 0}}
      onBackdropPress={() => setIsOpen(false)}
      onBackButtonPress={() => setIsOpen(false)}>
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#25231F',
          bottom: 0,
          width: '100%',
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          borderWidth: 1,
          borderColor: '#36342F',
        }}>
        <Text
          style={{
            fontSize: 20,
            color: '#FFFFFF',
            fontFamily: 'Jost-Regular',
            marginHorizontal: 16,
            marginTop: 15,
          }}>
          {localizationStrings.Asking_Price}
          {/* Asking a Price */}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: '#BAB6AE',
            fontFamily: 'Jost-Regular',
            lineHeight: 16,
            marginTop: 6,
            marginHorizontal: 16,
          }}>
          {localizationStrings.Price_Description}
        </Text>
        <View style={{height: 1, backgroundColor: '#36342F', marginTop: 10}} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 16,
          }}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setFreeTrip(false)}>
            <View style={styles.circle}>
              {!freeTrip && <View style={styles.innerCircle} />}
            </View>
            <Text style={styles.btnText}>Ask a Price</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setFreeTrip(true)}>
            <View style={styles.circle}>
              {freeTrip && <View style={styles.innerCircle} />}
            </View>
            <Text style={styles.btnText}>
              {localizationStrings.Ask_for_free}
            </Text>
          </TouchableOpacity>
        </View>

        <CustomTextInput
          placeholder={''}
          value={country + ' 250'}
          label={'Enter your price below'}
          lSize={14}
          top={5}
          labelBottom={10}
        />
        <CustomButton_2
          bgColor={'#FFDC004D'}
          color="#FFDC00"
          title={localizationStrings.Ask_now}
          flex={1}
          mh={10}
          mv={20}
          // onPress={() => navigation.navigate('StartTrip')}
        />
      </View>
    </Modal>
  );
};

export default AskNow;

const styles = StyleSheet.create({
  circle: {
    height: 16,
    width: 16,
    borderWidth: 1,
    borderColor: '#BAB6AE',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    height: 6,
    width: 6,
    borderRadius: 10,
    backgroundColor: '#BAB6AE',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 5,
    marginVertical: 5,
  },
  btnText: {
    fontSize: 16,
    color: '#BAB6AE',
    fontFamily: 'Jost-Medium',
    marginLeft: 7,
  },
});
