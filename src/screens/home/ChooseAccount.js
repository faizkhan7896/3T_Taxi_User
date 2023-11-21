import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../../utils/theme';
import SolidButton from '../../components/SolidButton';
import {ScrollView} from 'react-native-gesture-handler';
import CustomHeader from '../../components/CustomHeader';
import CustomButton_2 from '../../components/CustomButton_2';
import {useSelector} from 'react-redux';
import localizationStrings from '../../utils/Localization';
const data = [
  {
    name: 'Visa Card',
    nameTwo: ' 250',
    image: require('../../assets/icons/using/Visa.png'),
  },
  {
    name: 'Amazon Pay',
    nameTwo: ' 250',
    image: require('../../assets/icons/using/Amazon.png'),
  },
  {
    name: 'PayPal',
    nameTwo: ' 250',
    image: require('../../assets/icons/using/Paypal.png'),
  },
  {
    name: 'Discovery',
    nameTwo: ' 250',
    image: require('../../assets/icons/using/Discovery.png'),
  },
  {
    name: 'Credit/Debit Card',
    nameTwo: ' 250',
    image: require('../../assets/icons/using/card.png'),
  },
  {
    name: 'Cash',
    nameTwo: ' 250',
    image: require('../../assets/icons/using/Cash.png'),
  },
];

export default function SetupPayment() {
  const dimension = useWindowDimensions();
  const navigation = useNavigation();
  const [selected, setSelected] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const {countryId} = useSelector(state => state.user||9);

  const country =
    countryId == '4'
      ? 'INR'
      : countryId == '9'
      ? 'NOK'
      : countryId == '10'
      ? 'EGP'
      : countryId == '11' && 'SAR';

  const ListItem = ({source, text, textTwo, onPress}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',

          marginHorizontal: 16,
          backgroundColor: text == selected ? '#534D40' : 'transparent',
          height: 58,
          borderRadius: 8,
          padding: 10,
        }}>
        {/* <Text >{Check}</Text> */}
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
            marginHorizontal: 20,
            fontFamily: 'Jost-Medium',
            flex: 1,
          }}>
          {text}
        </Text>

        <Text
          numberOfLines={1}
          style={{
            fontSize: 16,
            color: theme.colors.white,
            fontFamily: 'Jost-Medium',
          }}>
          {textTwo}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#171614'}}>
      <CustomHeader title={'Choose An Account'} />
      <ScrollView>
        <View style={{}}>
          {data.map((v, i) => (
            <ListItem
              onPress={() => setSelected(v.name)}
              key={i}
              source={v.image}
              text={v.name}
              textTwo={country + v.nameTwo}
              selected={selected}
            />
          ))}
        </View>
      </ScrollView>
      <CustomButton_2
        title={localizationStrings.Next}
        bgColor={'#FFDC004D'}
        color="#FFDC00"
        mh={16}
        mt={35}
        mb={20}
        onPress={() => navigation.navigate('ConfirmAccount')}
      />
      {/* <View style={{marginVertical: 5}}>
        <SolidButton
          text="Next"
          onPress={() => navigation.navigate('ConfirmAccount')}
          borderRadius={50}
          backgroundColor="rgba(255, 220, 0, 0.3)"
          color={theme.colors.yellow}
        />
      </View> */}
    </View>
  );
}
