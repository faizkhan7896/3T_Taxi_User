import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {theme, data} from '../../utils/theme';
import {ScrollView} from 'react-native-gesture-handler';
import CustomHeader from '../../components/CustomHeader';
import {ImagePath} from '../../utils/ImagePath';
import {useSelector} from 'react-redux';
import {get_Profile, post_api} from '../../utils/Constants';
import localizationStrings from '../../utils/Localization';

export default function SetupPayment() {
  const {userId, userData} = useSelector(state => state.user);
  const dimension = useWindowDimensions();
  const navigation = useNavigation();
  const [selected, setSelected] = useState(userData?.payment_option);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {countryId} = useSelector(state => state.user || 9);

  // alert(JSON.stringify(userData?.payment_option))

  const get_card = () => {
    const body = new FormData();
    body.append('user_id', userId);

    setLoading(true);
    post_api('getUsercard', body).then(v => {
      if (v.status == 1) {
        //console.log(v);
      }
      setLoading(false);
    });
  };

  const Update_Payment = option => {
    const body = new FormData();
    body.append('user_id', userId);
    body.append('payment_option', option);
    //console.log(body);

    setLoading(true);
    post_api('add_payment_option', body).then(v => {
      if (v.status == 1) {
        //console.log(v);
        get_Profile(userId);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    get_card();
  }, []);

  const ListItem = ({source, text, onPress, Check}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          // backgroundColor: 'red',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={source}
            style={{
              width: 60,
              height: 38,
              resizeMode: 'contain',
              borderRadius: 3,
            }}
          />
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              color: theme.colors.white,
              fontFamily: 'Jost-Medium',
              marginVertical: 20,
              marginHorizontal: 20,
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

  const country =
    countryId == '4'
      ? 'INR'
      : countryId == '9'
      ? 'NOK'
      : countryId == '10'
      ? 'EGP'
      : countryId == '11' && 'SAR';

  return (
    <View style={{flex: 1, backgroundColor: '#171614'}}>
      <CustomHeader title={localizationStrings?.Payment_Options} />
      <ScrollView>
        <Text
          style={{
            fontSize: 20,
            color: theme.colors.lightGray,
            textAlign: 'left',
            fontFamily: 'Jost-SemiBold',
            marginHorizontal: 30,
            marginVertical: 10,
          }}>
          {localizationStrings?.Payment_Method_Description}
        </Text>
        <View style={{marginHorizontal: 30}}>
          {data[country == 'EGP' ? 1 : 0].map((v, i) => (
            <ListItem
              onPress={() => {
                setSelected(v.name);
                Update_Payment(v.id);
              }}
              key={i}
              source={v.image}
              text={v.name}
              Check={
                selected == v.name
                  ? require('../../assets/icons/using/Checked.png')
                  : null
              }
            />
          ))}

          {selected == 'Card' && (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddCard')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Image
                source={ImagePath.add_circle}
                style={{width: 35, height: 35, resizeMode: 'contain'}}
              />
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 20,
                  color: theme.colors.white,
                  marginVertical: 20,
                  fontFamily: 'Jost-Regular',
                  marginHorizontal: 20,
                }}>
                {localizationStrings?.Add_New_Card}
              </Text>
            </TouchableOpacity>
          )}
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
