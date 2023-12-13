import {View, Text, useWindowDimensions, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton_2 from './CustomButton_2';
import Modal from 'react-native-modal';
import {theme} from '../utils/theme';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {post_api, showError} from '../utils/Constants';
import localizationStrings from '../utils/Localization';

export const data = [
  [
    {
      name: localizationStrings.Opay,
      id: 'OPay',
      image: require('../assets/icons/using/Opay.jpeg'),
    },
    {
      name: localizationStrings?.Fawry,
      id: 'Fawry',
      image: require('../assets/icons/using/Fawry.png'),
    },
    {
      name: localizationStrings?.Cash,
      id: 'Cash',
      image: require('../assets/icons/using/CashMachine.png'),
    },
  ],

  [
    {
      name: localizationStrings?.PayInCar,
      id: 'Pay_in_Car',
      image: require('../assets/icons/using/CardMachine_EG.png'),
    },
    {
      name: localizationStrings?.Card,
      id: 'Card',
      image: require('../assets/icons/using/Card_.png'),
    },
    // {
    //   name: localizationStrings.Opay,
    //   id: 'OPay',
    //   image: require('../assets/icons/using/Opay.jpeg'),
    // },
    // {
    //   name: localizationStrings?.Google_Pay,
    //   id: 'Google Pay',
    //   image: require('../assets/icons/using/GooglePay.png'),
    // },
  ],
];

export default function PaymentOptions({
  isOpen,
  setIsOpen,
  setSelected,
  selected,
  price,
  setCardDetails,
  customBut,
  CustomOnPress,
}) {
  const navigation = useNavigation();
  const {userId, userData} = useSelector(state => state.user);
  const {countryId} = useSelector(state => state.user || 9);
  const [Data, setData] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const dimension = useWindowDimensions();
  const [reload, setReload] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);

    setReload({});
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Replace 1000 with the actual time it takes to fetch new data.
  };

  // alert(JSON.stringify(selected))

  const country =
    countryId == '4'
      ? 'INR'
      : countryId == '9'
      ? 'NOK'
      : countryId == '10'
      ? 'EGP'
      : countryId == '11' && 'SAR';

  // alert(JSON.stringify(country))

  const get_card = () => {
    const body = new FormData();
    body.append('user_id', userId);

    // setLoading(true);
    post_api('getUsercard', body).then(v => {
      if (v.status == 1) {
        //console.log(v);
        setData(v?.result);
        setSelectedCard(v?.result[0]);
        setCardDetails(v?.result[0]);

        // alert(v?.result[0]?.card_name)
      }
      // setLoading(false);
    });
  };

  useEffect(() => {
    handleRefresh();
    get_card();
    const unsubscribe = navigation.addListener('focus', () => {
      get_card();
    });
    return unsubscribe;
  }, [localizationStrings?.getLanguage()]);

  const ListItem = ({source, text, onPress, Check}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#171614',
          marginHorizontal: 20,
          paddingHorizontal: 15,
          borderRadius: 5,
          paddingVertical: 10,
          marginTop: 5,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={source}
            style={{
              width: 45,
              height: 30,
              resizeMode: 'contain',
              marginRight: 15,
            }}
          />
          <Text
            numberOfLines={1}
            style={{
              fontSize: 13,
              color: theme.colors.white,
              fontFamily: 'Jost-Medium',
              // marginVertical: 15,
              // marginHorizontal: 20,
              width: dimension.width / 2,
            }}>
            {text}
          </Text>
        </View>

        <Image
          // source={require('../../assets/icons/using/Cross.png')}
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

  //console.log('..............................................---- ', selected);
  return (
    <Modal
      isVisible={isOpen}
      style={{margin: 0, padding: 0}}
      onBackdropPress={() => setIsOpen(false)}
      onBackButtonPress={() => setIsOpen(false)}>
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#36342F',
          bottom: 0,
          width: '100%',
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          paddingBottom: 50,
        }}>
        <Text
          style={{
            fontSize: 17,
            color: '#BAB6AE',
            marginVertical: 15,
            marginHorizontal: 20,
            fontFamily: 'Jost-Regular',
            // textAlign:'left'
          }}>
          {localizationStrings.howToPay + ' '}
          <Text
            style={{
              color: theme.colors.white,
              fontFamily: 'Jost-SemiBold',
              textDecorationLine: 'underline',
              textDecorationColor: '#BAB6AE',
            }}>
            {price + ' ' + (country || '')}
          </Text>
        </Text>

        <FlatList
          // data={data[country == 'NOK' ? 1 : 0]}
          data={data[1]}
          renderItem={(item, index) => (
            <Card
              item={item}
              onPress={() => setSelected(item?.item)}
              selected={selected}
            />
          )}
          keyExtractor={item => item.key}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />

        {selected?.id == 'Card' && (
          <View style={{marginVertical: 20}}>
            <Text
              style={{
                fontSize: 18,
                color: '#fff',
                fontWeight: '600',
                marginHorizontal: 20,
                marginBottom: 10,
              }}>
              Select Card
            </Text>
            {Data.map((v, i) => (
              <ListItem
                onPress={() => {
                  setSelectedCard(v);
                  setCardDetails(v);
                }}
                key={i}
                source={require('../assets/icons/using/card.png')}
                text={v.card_name}
                Check={
                  selectedCard == v
                    ? require('../assets/icons/using/Checked.png')
                    : null
                }
              />
            ))}
          </View>
        )}

        {selected?.id == 'Card' && Data?.length == 0 && (
          <CustomButton_2
            bgColor={'#FFDC004D'}
            color="#FFDC00"
            title={'Add Card'}
            flex={1}
            mh={10}
            // mv={20}
            onPress={() => navigation.navigate('AddCard')}
          />
        )}
        {/* <View style={{flexDirection: 'row', marginVertical: 10}}> */}
        {customBut == true ? (
          <CustomButton_2
            bgColor={'#FFDC004D'}
            color="#FFDC00"
            title={
              localizationStrings?.Continue +
              ' ' +
              (selected?.id == 'Google Pay'
                ? localizationStrings?.Google_Pay
                : selected?.id == 'Card'
                ? localizationStrings?.Card
                : selected?.id == 'OPay'
                ? localizationStrings?.Opay
                : selected?.id == 'Cash'
                ? localizationStrings?.Cash
                : selected?.id == 'Fawry'
                ? localizationStrings?.Fawry
                : selected?.id == 'Pay_in_Car' && localizationStrings?.PayInCar)

              // : selected?.id == 'Pay_in_Car' && localizationStrings?.PayInCar)
              // (selected == 'Google Pay'
              //   ? localizationStrings?.Google_Pay
              //   : selected == 'Card'
              //   ? localizationStrings?.Card
              //   : selected == 'OPay'
              //   ? localizationStrings?.Opay
              //   : selected == 'Cash' && localizationStrings?.Cash)
            }
            flex={1}
            mh={10}
            mv={20}
            onPress={CustomOnPress}
          />
        ) : (
          <CustomButton_2
            bgColor={'#FFDC004D'}
            color="#FFDC00"
            title={
              localizationStrings?.Continue +
              ' ' +
              (selected?.id == 'Google Pay'
                ? localizationStrings?.Google_Pay
                : selected?.id == 'Card'
                ? localizationStrings?.Card
                : selected?.id == 'OPay'
                ? localizationStrings?.Opay
                : selected?.id == 'Cash'
                ? localizationStrings?.Cash
                : selected?.id == 'Fawry'
                ? localizationStrings?.Fawry
                : selected?.id == 'Pay_in_Car' && localizationStrings?.PayInCar)
            }
            flex={1}
            mh={10}
            mv={20}
            onPress={() => {
              setIsOpen(false);
            }}
          />
        )}
        {/* </View> */}
      </View>
    </Modal>
  );
}

const Card = ({title, item, source, id, onPress, selected}) => {
  // alert(JSON.stringify(item))
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor:
          selected?.id == item?.item?.id ? '#FFDC001A' : '#171614',
        borderWidth: 1,
        borderColor: selected?.id == item?.item?.id ? '#FFDC00' : '#36342F',
        flexDirection: 'row',
        borderRadius: 6,
        height: 40,
        width: (Dimensions.get('window').width - 55) / 2,
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        marginLeft: 20,
      }}>
      <Image
        source={item?.item?.image}
        style={{height: 22, width: 35, resizeMode: 'contain', borderWidth: 1}}
      />
      <Text
        style={{
          fontSize: 14,
          color: theme.colors.white,
          fontFamily: 'Jost-Medium',
          marginHorizontal: 10,
          marginTop: -2,
        }}>
        {item?.item?.id == 'Google Pay'
          ? localizationStrings?.Google_Pay
          : item?.item?.id == 'Card'
          ? localizationStrings?.Card
          : item?.item?.id == 'OPay'
          ? localizationStrings?.Opay
          : item?.item?.id == 'Pay_in_Car'
          ? localizationStrings?.PayInCar
          : item?.item?.id == 'Fawry'
          ? localizationStrings?.Fawry
          : item?.item?.id == 'Cash' && localizationStrings?.Cash}
      </Text>
    </TouchableOpacity>
  );
};
