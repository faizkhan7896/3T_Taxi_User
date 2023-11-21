import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import Statusbar from '../../components/Statusbar';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../../utils/theme';
import SolidButton from '../../components/SolidButton';
import {ScrollView} from 'react-native-gesture-handler';
import Modalss from '../../components/Modalss';
import localizationStrings from '../../utils/Localization';

const data = [
  {
    name: 'Visa Card',
    image: require('../../assets/icons/using/Visa.png'),
  },
  {
    name: 'Amazon Pay',
    image: require('../../assets/icons/using/Amazon.png'),
  },
  {
    name: 'PayPal',
    image: require('../../assets/icons/using/Paypal.png'),
  },
  {
    name: 'Discovery',
    image: require('../../assets/icons/using/Discovery.png'),
  },
  {
    name: 'Credit or Debit Card',
    image: require('../../assets/icons/using/card.png'),
  },
  {
    name: 'Cash',
    image: require('../../assets/icons/using/Cash.png'),
  },
];

export default function SetupPayment() {
  const dimension = useWindowDimensions();
  const navigation = useNavigation();
  const [selected, setSelected] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

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
              width: 65,
              height: 65,
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
            {text}
          </Text>
        </View>

        <Image
          source={Check}
          style={{
            width: 22,
            height: 22,
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
        <Statusbar
          barStyle={'light-content'}
          backgroundColor={theme.colors.ButtonText}
        />
        <Header
          navigation={navigation}
          Headertext={localizationStrings.Payment_Options}
          color="white"
          marginHorizontal={70}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            paddingBottom: 50,
          }}>
          <View>
            <Text
              style={{
                fontSize: 20,
                color: theme.colors.lightGray,
                textAlign: 'left',
                marginHorizontal: 30,
                marginVertical: 20,
                fontWeight: 'bold',
              }}>
              {localizationStrings.Payment_Method_Description}
            </Text>
            <View style={{marginHorizontal: 30}}>
              {data.map((v, i) => (
                <ListItem
                  onPress={() => setSelected(i + 1)}
                  source={v.image}
                  text={v.name}
                  Check={
                    selected == i + 1
                      ? require('../../assets/icons/using/Cross.png')
                      : null
                  }
                />
              ))}

              <TouchableOpacity
                onPress={() => navigation.navigate('AddCardAuth')}
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
                  {/* Add new payment option */}
                  {localizationStrings.Add_new_payment_option}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

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
