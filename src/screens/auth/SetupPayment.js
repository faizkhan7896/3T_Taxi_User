import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import Statusbar from '../../components/Statusbar';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {data, theme} from '../../utils/theme';
import SolidButton from '../../components/SolidButton';
import {ScrollView} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {ImageBackground} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {Dimensions} from 'react-native';
import localizationStrings from '../../utils/Localization';

export default function SetupPayment() {
  const dimension = useWindowDimensions();
  const navigation = useNavigation();
  const [selected, setSelected] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const {countryId} = useSelector(state => state.user || 9);

  //console.log(selected);

  const country =
    countryId == '4'
      ? 'INR'
      : countryId == '9'
      ? 'NOK'
      : countryId == '10'
      ? 'EGP'
      : countryId == '11' && 'SAR';

  const ListItem = ({source, text, Check, onPress}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={source}
            style={{
              width: 60,
              height: 38,
              resizeMode: 'contain',
            }}
          />
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              color: theme.colors.white,
              marginVertical: 20,
              marginHorizontal: 20,
              fontFamily: 'Jost-Medium',
            }}>
            {text}
          </Text>
        </View>

        <Image
          source={Check}
          style={{
            width: 22,
            height: 22,
            resizeMode: 'contain',
            // tintColor: '#FFFFFF',
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
        <Statusbar
          barStyle={'light-content'}
          backgroundColor={theme.colors.ButtonText}
        />
        <Header navigation={navigation} />
        <View
          style={{flex: 1, justifyContent: 'space-between', paddingBottom: 50}}>
          <View>
            <Text
              style={{
                fontSize: 20,
                color: theme.colors.lightGray,
                marginHorizontal: 30,
                marginVertical: 20,
                fontFamily: 'Jost-SemiBold',
              }}>
              {localizationStrings.Payment_Method_Description}
            </Text>
            <View style={{marginHorizontal: 30}}>
              {data[country == 'NOK' ? 0 : country == 'EGP' && 1].map(
                (v, i) => (
                  <ListItem
                    key={i}
                    onPress={() =>
                      setSelected(pre =>
                        pre.find(i => i == v.name)
                          ? pre.filter(i => i != v.name)
                          : [...pre, v.name],
                      )
                    }
                    source={v.image}
                    text={v.name}
                    Check={
                      selected.find(i => i == v.name)
                        ? require('../../assets/icons/using/Checked.png')
                        : null
                    }
                  />
                ),
              )}

              {/* <TouchableOpacity
                // onPress={() => navigation.navigate('AddCardAuth')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Image
                  source={require('../../assets/icons/using/Add.png')}
                  style={{
                    width: 35,
                    height: 35,
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 16,
                    color: theme.colors.white,
                    textAlign: 'left',
                    marginVertical: 20,
                    fontWeight: 'bold',
                    // width: 220,
                    marginHorizontal: 20,
                  }}>
                  Add new payment option
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
          <View
            style={
              {
                /* marginTop: 50, marginHorizontal: 25 */
              }
            }>
            {selected ? (
              <SolidButton
                text={localizationStrings.Next}
                onPress={() => navigation.navigate('PromoCode')}
                // onPress={() => {
                //   setIsVisible(!isVisible);
                // }}
              />
            ) : (
              <SolidButton
                text={localizationStrings.Next}
                onPress={() => setModalVisible(!modalVisible)}
                // onPress={() => {
                //   setIsVisible(!isVisible);
                // }}
              />
            )}

            {/* <View style={{height: 30}} /> */}
            <SolidButton
              text={localizationStrings.Skip_For_Now}
              // onPress={() => navigation.navigate('PromoCode')}
              backgroundColor={theme.colors.ButtonText}
              color={theme.colors.yellow}
              borderColor={theme.colors.yellow}
              borderWidth={1}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
        <Popup
          visible={modalVisible}
          setVisible={setModalVisible}
          navigation={navigation}
        />
      </View>
    </ScrollView>
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
      style={{paddingHorizontal: 20, paddingBottom: 15}}
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
        source={require('../../assets/icons/using/restrict.png')}
      />
      <Text
        style={{
          fontSize: 18,
          color: theme.colors.lightGray,
          fontFamily: 'Jost-Medium',
          textAlign: 'center',
          marginHorizontal: 25,
          marginVertical: 10,
        }}>
        {localizationStrings.Request_PAyment_Method}
      </Text>
      <CustomButton
        w={Dimensions.get('window').width - 100}
        title={'Add payment method'}
        vert={10}
        onPress={() => setVisible(false)}
      />
      <CustomButton
        top={1}
        w={Dimensions.get('window').width - 100}
        vert={10}
        title={'Skip for now'}
        bw={1}
        bc={'#FFDC00'}
        bg={'#171614'}
        color={'#FFDC00'}
        mb={30}
        onPress={() => navigation.navigate('PromoCode')}
      />
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
