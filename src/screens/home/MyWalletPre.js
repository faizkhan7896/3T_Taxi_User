import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {theme, data} from '../../utils/theme';
import CustomHeader from '../../components/CustomHeader';
import CustomButton_2 from '../../components/CustomButton_2';
import {useSelector} from 'react-redux';
import {get_Profile, post_api} from '../../utils/Constants';
import localizationStrings from '../../utils/Localization';
import {ShowToast} from '../../utils/constance';

export default function SetupPayment() {
  const dimension = useWindowDimensions();
  const navigation = useNavigation();
  const [selected, setSelected] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const {userId, userData} = useSelector(state => state.user);

  const [Data, setData] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const {countryId} = useSelector(state => state.user || 9);

  const country =
    countryId == '4'
      ? 'INR'
      : countryId == '9'
      ? 'NOK'
      : countryId == '10'
      ? 'EGP'
      : countryId == '11' && 'SAR';

  // alert(JSON.stringify(Data?.length))

  const get_card = () => {
    console.log('userId in cards -', userId);
    const body = new FormData();
    body.append('user_id', userId);
    post_api('getUsercard', body).then(v => {
      console.log('re response in my wallet card - ', v.message);
      if (v.status == 0) {
        setData([]);
      } else if (v.status == 1) {
        console.log(v);
        setData(v?.result);
        setSelected(v?.result[0]?.card_name);
        setSelectedCard(v?.result[0]);
      }
    });
  };

  const delete_card = cardId => {
    console.log('card_id real- ', cardId);
    console.log('userId in cards -', userId);
    const body = new FormData();
    body.append('user_id', userId);
    body.append('card_id', cardId);
    post_api('delete_user_card', body).then(v => {
      console.log('this is the response status in delete card - ', v.status);
      if (v.status == 1) {
        console.log(v);
        ShowToast('Card Deleted Successfully');
        get_card();
      } else {
        get_card();
      }
    });
  };

  useEffect(() => {
    get_card();
    setTimeout(() => {
      get_card();
    }, 2000);
    const unsubscribe = navigation.addListener('focus', () => {
      get_Profile(userId);
      get_card();

      // do something
    });

    return unsubscribe;
  }, [navigation]);

  const ListItem = ({source, text, text2, onPress, Check, cardId}) => {
    return (
      <TouchableOpacity
        onPress={() => console.log('on Press --- ')}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          backgroundColor: '#696969',
          marginHorizontal: 10,
          marginVertical: 10,
          padding: 10,
          borderRadius: 20,
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

          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 16,
                color: theme.colors.white,
                fontFamily: 'Jost-Medium',
                marginTop: 10,
                marginHorizontal: 20,
                width: dimension.width / 2,
              }}>
              {text}
            </Text>

            <Text
              numberOfLines={1}
              style={{
                fontSize: 16,
                color: theme.colors.white,
                fontFamily: 'Jost-Medium',

                marginHorizontal: 20,
                width: dimension.width / 2,
                marginTop: 10,
                marginBottom: 5,
              }}>
              {text2}
            </Text>

            <Text
              numberOfLines={1}
              style={{
                fontSize: 16,
                color: theme.colors.white,
                fontFamily: 'Jost-Medium',

                marginHorizontal: 20,
                width: 50,
                marginTop: 10,
                marginBottom: 10,
                borderRadius: 4,
                borderWidth: 1,
                justifyContent: 'center',
                textAlign: 'center',
                textAlignVertical: 'center',
                paddingTop: 5,
                borderColor: 'white',
              }}>
              ***
            </Text>
          </View>
        </View>

        <Pressable style={{}} onPress={() => delete_card(cardId)}>
          <Image
            source={require('../../assets/icons/using/Cross.png')}
            style={{
              width: 22,
              height: 22,
              resizeMode: 'contain',
            }}
          />
        </Pressable>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#171614'}}>
      <CustomHeader title={localizationStrings.My_Cards} />
      <ScrollView>
        {/* <Text
          style={{
            fontSize: 14,
            color: '#BAB6AE',
            fontFamily: 'Jost-Regular',
            textAlign: 'center',
            marginTop: 10,
          }}>
          Balance
        </Text>
        <Text
          style={{
            fontSize: 25,
            color: theme.colors.white,
            fontFamily: 'Jost-Bold',
            textAlign: 'center',
            marginTop: 10,
          }}>
          {country + ' ' + userData?.wallet}
        </Text> */}
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 15,
            marginVertical: 20,
          }}>
          <CustomButton_2
            title={'Add Amount'}
            bgColor={'#FFDC004D'}
            color={'#FFDC00'}
            onPress={() => {
              if (Data?.length == 0) {
                navigation.navigate('PaymentOptions');
              }

              if (Data?.length != 0) {
                navigation.navigate('AddAmount', {cardData: selectedCard});
              }
            }}
            flex={1}
            mh={10}
          />
          <CustomButton_2
            title={'Withdraw'}
            bgColor={'#FFDC004D'}
            color={'#FFDC00'}
            onPress={() => navigation.navigate('ChooseAccount')}
            flex={1}
            mh={10}
          />
        </View> */}

        <Text
          style={{
            fontSize: 14,
            color: '#BAB6AE',
            marginHorizontal: 25,
            fontFamily: 'Jost-Regular',
          }}>
          {localizationStrings?.All_Cards}
        </Text>
        <View style={{}}>
          {Data.map((v, i) => (
            <ListItem
              onPress={() => {
                setSelected(v.card_name);
                setSelectedCard(v);
              }}
              key={i}
              source={require('../../assets/icons/using/card.png')}
              text={v.card_name}
              text2={v.card_num}
              cardId={v.id}
              // Check={
              //   selected == v.card_name
              //     ? require('../../assets/icons/using/Checked.png')
              //     : null
              // }
            />
          ))}
        </View>
      </ScrollView>
    </View>
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
