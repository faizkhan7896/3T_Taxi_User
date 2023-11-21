import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import Modal from 'react-native-modal';
import {TextInput} from 'react-native-paper';
import Header from '../../components/Header';
import SolidButton from '../../components/SolidButton';
import Statusbar from '../../components/Statusbar';
import store from '../../redux/store';
import {theme} from '../../utils/theme';

import {ImageBackground, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {LOGIN, USERDATA} from '../../redux/ActionTypes';
import {post_api, showError, showSuccess} from '../../utils/Constants';
import localizationStrings from '../../utils/Localization';
// import localizationStrings from '../../utils/Localization';

export default function SeupProfile() {
  const dimension = useWindowDimensions();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const {userData} = useSelector(state => state.user);
  const [Code, setCode] = useState('3TRefhcgz21');
  const [loading, setLoading] = useState(false);

  const AddCoupan = () => {
    if (!Code) {
      showError(localizationStrings?.msg_coupan_code, 'error');
      return;
    }
    const body = new FormData();
    body.append('user_id', userData.id);
    body.append('promo_code', Code);
    setLoading(true);
    post_api('add_promo_code', body)
      .then(v => {
        if (v?.status == 1) {
          store.dispatch({type: USERDATA, payload: v.result});
          setModalVisible(true);
        } else {
          showError(v?.result);
        }
        setLoading(false);
      })
      .catch(v => {
        setLoading(false);
        showError(v.message);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
      <Statusbar
        barStyle={'light-content'}
        backgroundColor={theme.colors.ButtonText}
      />
      <Header navigation={navigation} />
      <View style={{marginHorizontal: 30}}>
        <Text
          style={{
            fontSize: 20,
            color: theme.colors.lightGray,
            fontFamily: 'Jost-SemiBold',
            marginTop: 20,
          }}>
          {/* Do you have a Promo code? */}
          {localizationStrings.Promo_Code_Description}
        </Text>
        <TextInput
          placeholder="Enter promo code"
          style={{
            backgroundColor: theme.colors.ButtonText,
            color: theme.colors.white,
          }}
          selectionColor={theme.colors.yellow}
          activeUnderlineColor={theme.colors.yellow}
          theme={{colors: {text: 'white'}}}
          underlineColor={theme.colors.white}
          placeholderTextColor={'#FFFFFF33'}
          autoCapitalize="characters"
          keyboardAppearance="dark"
          value={Code}
          onChangeText={setCode}
        />
      </View>
      <View
        style={
          {
            /* marginTop: 30, marginHorizontal: 15 */
          }
        }>
        <SolidButton
          text={localizationStrings.Confirm}
          onPress={() => AddCoupan()}
          loading={loading}
        />
        {/* <View style={{height: 30}} /> */}
        <SolidButton
          text={localizationStrings.Skip_Now}
          // onPress={() => navigation.navigate('PromoCode')}
          backgroundColor={theme.colors.ButtonText}
          color={theme.colors.yellow}
          borderColor={theme.colors.yellow}
          borderWidth={1}
          onPress={() => setModalVisible(!modalVisible)}
        />
      </View>
      <Popup visible={modalVisible} setVisible={setModalVisible} />
    </View>
  );
}
const Popup = ({visible, setVisible, navigation}) => (
  <Modal
    isVisible={visible}
    style={{margin: 0}}
    onBackdropPress={() => setVisible(false)}
    statusBarTranslucent
    onBackButtonPress={() => setVisible(false)}>
    <ImageBackground
      style={{paddingHorizontal: 20, paddingBottom: 30}}
      resizeMode="stretch"
      source={require('../../assets/icons/using/popupBg.png')}>
      <Image
        style={{
          height: 60,
          width: 60,
          resizeMode: 'contain',
          alignSelf: 'center',
          marginTop: 40,
        }}
        source={require('../../assets/icons/using/location.png')}
      />
      <Text
        style={{
          fontSize: 18,
          color: theme.colors.lightGray,
          fontFamily: 'Jost-Regular',
          textAlign: 'center',
          marginHorizontal: 20,
          marginTop: 10,
        }}>
        Allow{' '}
        <Text
          style={{
            fontFamily: 'Jost-Bold',
          }}>
          3T
        </Text>{' '}
        to access this device’s location?
      </Text>
      <View
        style={{height: 1, backgroundColor: '#434039', marginHorizontal: 18}}
      />
      <TouchableOpacity
        style={{marginVertical: 15}}
        onPress={() => {
          store.dispatch({
            type: LOGIN,
            payload: {id: 1},
          });
        }}>
        <Text
          style={{
            fontSize: 14,
            color: '#FFFFFF',
            fontFamily: 'Jost-Medium',
            textAlign: 'center',
          }}>
          {localizationStrings.Using_app}
        </Text>
      </TouchableOpacity>
      <View
        style={{height: 1, backgroundColor: '#434039', marginHorizontal: 18}}
      />
      <TouchableOpacity
        style={{marginVertical: 15}}
        onPress={() => {
          store.dispatch({
            type: LOGIN,
            payload: {id: 1},
          });
        }}>
        <Text
          style={{
            fontSize: 14,
            color: '#FFFFFF',
            fontFamily: 'Jost-Medium',
            textAlign: 'center',
          }}>
          {localizationStrings.Only_this_time}
        </Text>
      </TouchableOpacity>
      <View
        style={{height: 1, backgroundColor: '#434039', marginHorizontal: 18}}
      />
      <TouchableOpacity
        style={{marginVertical: 15}}
        onPress={() => {
          store.dispatch({
            type: LOGIN,
            payload: {id: 1},
          });
        }}>
        <Text
          style={{
            fontSize: 14,
            color: '#FFFFFF',
            fontFamily: 'Jost-Medium',
            textAlign: 'center',
          }}>
          {localizationStrings.Deny}
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  </Modal>
);
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    margin: 40,
    backgroundColor: theme.colors.ButtonText,
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
    color: theme.colors.lightGray,
    fontFamily: 'Poppins',
    fontSize: 16,
  },
  img: {
    backgroundColor: theme.colors.ButtonText,
    width: 70,
    height: 70,
    marginTop: -50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
