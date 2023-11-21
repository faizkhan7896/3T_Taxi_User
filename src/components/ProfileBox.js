import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  View,
  Modal,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useRef} from 'react';
import SolidButton from './SolidButton';
import {theme} from '../utils/theme';
import {Divider} from 'react-native-paper';
import Profile from './Profile';
import {useNavigation} from '@react-navigation/native';
import localizationStrings from '../../utils/Localization';

export default function CustomModal({
  title,
  onPress,
  onBottomPress,
  TwoCar,
  closewala,
  onPresss,
  modalVisible,
  close,
  image,
  show = false,
  cancel,
  Heading,
  logoOne,
  logoThree,
  onPressTwo,
  used,
  picshow,
  driver,
  Headingdriver,
  hidemodal,
  sheetopen,
}) {
  // added property declarations
  const dimension = useWindowDimensions();
  const navigation = useNavigation();
  const refRBSheet = useRef();
  return (
    <TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        onPress={onPresss}
        visible={show}
        onRequestClose={close}
        dismiss={close}>
        <View style={styles.centeredView}>
          <TouchableOpacity
            onPress={hidemodal}
            activeOpacity={1}
            style={{height: dimension.height, justifyContent: 'center'}}>
            <View style={styles.modalView}>
              {!!picshow && (
                <View style={{width: dimension.width / 2}}>
                  <Text
                    style={{color: 'white', fontSize: 11, fontWeight: 'bold'}}>
                    {Headingdriver}
                  </Text>
                  <Profile
                    placeholder="Saimon Jhonson"
                    placeholderTwo="KIA Sonate"
                    placeholderTextColor="white"
                    placeholderThree="PLA 02 TE 1235"
                    value={require('../assets/icons/using/profile.png')}
                    visible
                    flexDirection="column"
                    backgroundColor="Black"
                    Heading="ddd"
                  />
                </View>
              )}
              {!!driver && (
                <View>
                  <View style={styles.img}>
                    <Image
                      source={image}
                      style={{
                        width: 55,
                        marginTop: 10,

                        height: 55,
                        resizeMode: 'contain',
                        borderRadius: 100,
                      }}
                    />
                  </View>
                  <Text style={styles.modalText}>{Heading}</Text>
                </View>
              )}

              {!TwoCar && (
                <View style={{}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: dimension.width - 80,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: 20,
                    }}>
                    <TouchableOpacity onPress={close}>
                      <Image
                        source={require('../assets/icons/using/scar.png')}
                      />
                    </TouchableOpacity>

                    <Image
                      source={require('../assets/icons/using/redline.png')}
                      style={{width: dimension.width / 2}}
                    />

                    <Divider style={{backgroundColor: 'yellow', height: 20}} />

                    <TouchableOpacity onPress={onPresss}>
                      <Image
                        source={require('../assets/icons/using/scar.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      marginVertical: 5,
                      width: 250,
                      height: 45,
                      alignSelf: 'center',
                    }}>
                    <SolidButton
                      text="Cancel My Ride"
                      logo={require('../assets/icons/using/Cross.png')}
                      onPress={onPress}
                      borderRadius={50}
                      backgroundColor="rgba(240, 29, 80, 0.3)"
                      color="#F01D50"
                      elevation={1}
                      marginHorizontal={10}
                      fontSize={16}
                    />
                  </View>
                </View>
              )}

              {!!used && (
                <View
                  style={{
                    flexDirection: 'row',
                    margin: -10,
                    justifyContent: 'space-between',
                    width: dimension.width - 80,
                  }}>
                  <View style={{width: dimension.width / 2.5}}>
                    <SolidButton
                      text={localizationStrings.Cancel}
                      logo={require('../assets/icons/using/Cross.png')}
                      // onPress={onBottomPress}
                      onPress={sheetopen}
                      borderRadius={50}
                      backgroundColor="rgba(240, 29, 80, 0.3)"
                      color="#F01D50"
                      elevation={1}
                    />
                  </View>
                  <View style={{width: dimension.width / 2.5}}>
                    <SolidButton
                      text="Continue"
                      logo={require('../assets/icons/using/Checked.png')}
                      onPress={onPresss}
                      borderRadius={50}
                      backgroundColor=" rgba(116, 193, 44, 0.3)"
                      color="#74C12C"
                      elevation={1}
                    />
                  </View>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'Black',
  },
  modalView: {
    margin: 40,
    backgroundColor: '#36342F',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: theme.colors.white,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 16,
  },
  img: {
    // backgroundColor: theme.colors.ButtonText,
    width: 70,
    height: 70,
    marginLeft: 90,
    borderRadius: 100,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
