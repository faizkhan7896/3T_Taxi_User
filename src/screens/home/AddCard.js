import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../utils/theme';
import {useNavigation} from '@react-navigation/native';
import {Checkbox} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import CustomHeader from '../../components/CustomHeader';
import {TextInputMask} from 'react-native-masked-text';
import CustomButton_2 from '../../components/CustomButton_2';
import {post_api, showError} from '../../utils/Constants';
import {useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import {ImagePath} from '../../utils/ImagePath';
import CardScanner from 'rn-card-scanner';
import localizationStrings from '../../utils/Localization';

export default function AddCard(props) {
  const navigation = useNavigation();
  const dimension = useWindowDimensions();

  const [CardData, setCardData] = useState({});
  const {userId} = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const [checked, setChecked] = useState();
  const [cardNumber, setCardNumber] = useState('');
  const [cardHoldername, setCardHoldername] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const [scan, setScan] = useState(false);
  // alert(cardNumber)

  const [uri, setUri] = React.useState(props.source?.uri || undefined);

  const add_card = () => {
    if (!cardHoldername || !cardNumber || !expiryDate || !cvv) {
      showError(localizationStrings?.msg_fill_all_field);
      return;
    }
    const body = new FormData();
    body.append('user_id', userId);
    body.append('card_name', cardHoldername);
    body.append('card_num', cardNumber);
    body.append('card_exp', expiryDate);
    body.append('card_cvv', cvv);
    body.append('image', '');
    setLoading(true);
    post_api('add_card', body).then(v => {
      if (v.status == 1) {
        navigation.goBack();
      }
      setLoading(false);
    });
  };

  const picker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      // cropping: true
    }).then(image => {
      setUri(image.path);
      props.onChange?.(image);
    });
  };
  let source = {uri: 'data:image/jpeg;base64,' + image};
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
      <CustomHeader title={localizationStrings.Add_card} />
      {loading && <Loader />}

      <ScrollView>
        <View
          style={{
            width: dimension.width - 32,
            alignSelf: 'center',
            height: 230,
            backgroundColor: '#25231F',
            borderRadius: 10,
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {scan == false ? (
            <TouchableOpacity style={{}} onPress={() => setScan(true)}>
              <ImageBackground
                resizeMode="contain"
                source={require('../../assets/icons/using/scannerframe.png')}
                style={{
                  height: 210,
                  width: dimension.width - 50,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../assets/icons/using/scan.png')}
                  style={{
                    width: 70,
                    height: 70,
                    alignSelf: 'center',
                    resizeMode: 'cover',
                    borderRadius: 5,
                  }}
                />

                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    fontFamily: 'Jost-Medium',
                    marginTop: 20,
                  }}>
                  {localizationStrings.Scan_Card}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          ) : (
            <CardScanner
              style={{flex: 1}}
              didCardScan={response => {
                console.log('Card info: ', response);
                setTimeout(() => {
                  setCardNumber(response?.cardNumber.toString());
                  setCardHoldername(response?.holderName.toString());
                  setExpiryDate(
                    response?.expiryMonth.toString() +
                      response?.expiryYear.toString(),
                  );
                  setScan(false);
                }, 1500);
              }}
              frameColor={theme.colors.yellow}
            />
          )}
        </View>

        <Text style={styles.head}>{localizationStrings.Your_Name}</Text>
        <TextInput
          placeholder={localizationStrings.Enter_cardholder_name}
          style={styles.inputBox}
          value={cardHoldername}
          onChangeText={setCardHoldername}
          placeholderTextColor={'#FFFFFF66'}
        />

        <Text style={styles.head}>{localizationStrings.Card_Number}</Text>
        <TextInputMask
          placeholder={localizationStrings.Enter_card_number}
          placeholderTextColor={'#FFFFFF66'}
          type={'credit-card'}
          style={styles.inputBox}
          options={{
            obfuscated: false,
            issuer: 'visa-or-mastercard',
          }}
          value={cardNumber}
          onChangeText={setCardNumber}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flex: 1}}>
            <Text style={styles.head}>{localizationStrings.Expiry_Date}</Text>
            <TextInputMask
              placeholder={localizationStrings.Enter_expired_date}
              placeholderTextColor={'#FFFFFF66'}
              type={'datetime'}
              options={{format: 'MM/YY'}}
              value={expiryDate}
              onChangeText={setExpiryDate}
              style={[styles.inputBox]}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.head}>{localizationStrings.C_V_V}</Text>
            <TextInput
              placeholder={localizationStrings.Enter_CVV}
              style={[styles.inputBox]}
              value={cvv}
              onChangeText={setCvv}
              maxLength={3}
              keyboardType="number-pad"
              secureTextEntry
              placeholderTextColor={'#FFFFFF66'}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', margin: 16, alignItems: 'center'}}>
          <TouchableOpacity 
          // onPress={() => setChecked(!checked)}
          >
            <Image
              source={ImagePath.check}
              style={{height: 20, width: 20, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              color: theme.colors.white,
              fontFamily: 'Jost-Regular',
              marginLeft: 5,
            }}>
            {localizationStrings.Save_Card_Details}
          </Text>
        </View>
        <CustomButton_2
          title={localizationStrings.Add_Card}
          bgColor={'#FFDC00'}
          color={'#02254B'}
          mh={16}
          mt={10}
          mb={20}
          onPress={() => add_card()}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    fontSize: 14,
    color: theme.colors.lightGray,
    fontFamily: 'Jost-Regular',
    marginBottom: 7,
    marginTop: 20,
    marginHorizontal: 16,
  },
  inputBox: {
    height: 50,
    // alignSelf: 'center',
    marginHorizontal: 16,
    backgroundColor: '#25231F',
    borderRadius: 7,
    paddingHorizontal: 15,
    // flex: 1,
    // width: Dimensions.get('window').width - 32,
    paddingVertical: 0,
    fontFamily: 'Jost-Medium',
    color: '#FFFFFF',
  },
});
