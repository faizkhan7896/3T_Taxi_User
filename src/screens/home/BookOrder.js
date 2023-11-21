import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import SearchFieldContainer from '../../components/SearchFieldContainer';
import TimeText from '../../components/TimeText';
import HoriLine from '../../components/HoriLine';
import CarDeatail from '../../components/CarDeatail';
import SwipeButton from 'rn-swipe-button';
import {Dimensions} from 'react-native';
import PaymentOptions from '../../components/PaymentOptions';
import PopUpBox from '../../components/PopUpBox';
import AskNow from '../../components/AskNow';
import {ShowToast} from '../../utils/constance';
import {useSelector} from 'react-redux';
import localizationStrings from '../../utils/Localization';

const BookOrder = ({navigation}) => {
  const [payment, setPayment] = useState(false);
  const [visible, setVisible] = useState(true);
  // alert();

  const {userId, countryId} = useSelector(state => state.user||9);

  const country =
    countryId == '4'
      ? 'INR'
      : countryId == '9'
      ? 'NOK'
      : countryId == '10'
      ? 'EGP'
      : countryId == '11' && 'SAR';

  const [ask, setAsk] = useState(false);
  const CheckoutButton = () => {
    return (
      <View
        style={{
          width: 60,
          height: 35,
          backgroundColor: '#FFDC00',
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/icons/using/car.png')}
          style={{
            height: 18,
            width: 40,
            resizeMode: 'contain',
            tintColor: '#000000',
          }}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#171614'}}>
      <CustomHeader
        imgSource={require('../../assets/icons/using/Logo.png')}
        source2={require('../../assets/icons/using/noti.png')}
        size2={18}
      />
      <ScrollView>
        <ImageBackground
          source={require('../../assets/icons/using/Map.png')}
          style={{
            height: 190,
            width: '100%',
            resizeMode: 'cover',
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../assets/icons/using/pin_4.png')}
              style={{height: '60%', width: '60%', resizeMode: 'contain'}}
            />
          </View>
        </ImageBackground>
        <View
          style={{
            marginTop: -15,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            zIndex: 1,
            backgroundColor: '#171614',
          }}>
          <SearchFieldContainer
            title={
              localizationStrings.Departure + ' ' + localizationStrings.Address
            }
            title2={'Enjoveien 20'}
            edit
            tintColor={'#74C12C'}
          />
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 16,
              //   justifyContent: 'space-between',
            }}>
            <TimeText
              title={localizationStrings.Departure}
              date={'11th Apr'}
              time={'05:30'}
            />
            <TimeText
              title={localizationStrings.Estimated_arrival}
              date={'11th Apr'}
              time={'10:30'}
            />
          </View>
          <HoriLine />
          <CarDeatail />
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 16,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: '#fff',
                fontFamily: 'Jost-Regular',
                flex: 1,
              }}>
              Asking a Price
            </Text>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setAsk(true)}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#FFDC00',
                  fontFamily: 'Jost-Medium',
                  marginRight: 10,
                }}>
                Ask now
              </Text>
              <Image
                source={require('../../assets/icons/using/Next.png')}
                style={{height: 14, width: 14, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View> */}
          <HoriLine />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 1,
            }}>
            <Image
              source={require('../../assets/icons/using/Cash.png')}
              style={{height: 20, width: 35, resizeMode: 'contain'}}
            />
            <Text
              style={{
                fontSize: 14,
                color: '#fff',
                fontFamily: 'Jost-Regular',
                flex: 1,
                marginLeft: 15,
              }}>
              {localizationStrings.Pay_Tyep}
            </Text>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setPayment(true)}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#FFDC00',
                  fontFamily: 'Jost-Medium',
                  marginRight: 10,
                }}>
                {localizationStrings.Change}
              </Text>
              <Image
                source={require('../../assets/icons/using/Next.png')}
                style={{height: 14, width: 14, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
          <HoriLine />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 16,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: '#fff',
                fontFamily: 'Jost-Regular',
                flex: 1,
              }}>
              {localizationStrings.Maximum_price}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#fff',
                fontFamily: 'Jost-Bold',
                marginRight: 10,
              }}>
              25 {country}
            </Text>
          </View>
          <SwipeButton
            containerStyles={{
              marginHorizontal: 16,
              height: 40,
              borderRadius: 30,
            }}
            height={40}
            width={Dimensions.get('window').width - 32}
            // onSwipeFail={() => updateSwipeStatusMessage('Incomplete swipe!')}
            // onSwipeStart={() => updateSwipeStatusMessage('Swipe started!')}
            // onSwipeSuccess={() => navigation.navigate('StartTrip')}
            onSwipeSuccess={() => setVisible(true)}
            railBackgroundColor="#FFDC004D"
            railStyles={{borderRadius: 30, height: 40}}
            thumbIconComponent={CheckoutButton}
            thumbIconStyles={{borderRadius: 30, height: 30}}
            railBorderColor={'transparent'}
            railFillBorderColor={'transparent'}
            railFillBackgroundColor={'transparent'}
            disabledRailBackgroundColor={'transparent'}
            titleColor={'#FFDC00'}
            title={localizationStrings.Swipe_Order}
            thumbIconWidth={60}
            thumbIconBorderColor={'transparent'}
            thumbIconBackgroundColor={'#FFDC00'}
          />
        </View>
        <AskNow isOpen={ask} setIsOpen={setAsk} />
        <PopUpBox visible={visible} setVisible={setVisible} />
        <PaymentOptions
          isOpen={payment}
          setIsOpen={setPayment}
          // onPress={() => setVisible(true)}
        />
      </ScrollView>
    </View>
  );
};

export default BookOrder;

const styles = StyleSheet.create({});
