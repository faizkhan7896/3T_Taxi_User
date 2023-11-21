import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Statusbar from '../../components/Statusbar';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../../utils/theme';
import SolidButton from '../../components/SolidButton';
import {TextInput} from 'react-native-paper';
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

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
      <Statusbar
        barStyle={'light-content'}
        backgroundColor={theme.colors.ButtonText}
      />
      <Header navigation={navigation} />
      <View style={{flex: 1, paddingBottom: 50}}>
        <View style={{marginHorizontal: 30}}>
          <Text
            style={{
              fontSize: 20,
              color: theme.colors.lightGray,
              textAlign: 'left',
              marginVertical: 20,
              fontWeight: 'bold',
            }}>
            Do you have a Promo code?
          </Text>
          <TextInput
            placeholder="ENTER PROMO CODE"
            autoFocus
            style={{
              backgroundColor: theme.colors.ButtonText,
              color: theme.colors.white,
            }}
            selectionColor={theme.colors.yellow}
            activeUnderlineColor={theme.colors.yellow}
            theme={{
              colors: {
                text: 'white',
              },
            }}
            underlineColor={theme.colors.white}
            placeholderTextColor={theme.colors.lightGray}
            autoCapitalize="characters"
            keyboardAppearance="dark"
            // value={'SAIMON'}
          />
        </View>
        <View style={{marginTop: 50, marginHorizontal: 15}}>
          <SolidButton
            text={localizationStrings.Confirm}
            // onPress={() => navigation.navigate('VerifyCode')}
          />
          <View style={{height: 30}} />
          <SolidButton
            text={localizationStrings.Skip_Now}
            // onPress={() => navigation.navigate('VerifyCode')}
            backgroundColor={theme.colors.ButtonText}
            color={theme.colors.yellow}
            borderColor={theme.colors.yellow}
            borderWidth={1}
          />
        </View>
      </View>
    </View>
  );
}
