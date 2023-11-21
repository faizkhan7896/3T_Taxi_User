import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {baseUrl, ShowToast} from '../utils/constance';
import moment from 'moment';
import {useSelector} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import {post_api, showError} from '../utils/Constants';
import localizationStrings from '../utils/Localization';
// import localizationStrings from '../../utils/Localization';
const CarDeatail = ({
  selected,
  date,
  setSelected,
  setCharge,
  setCharge_vat,
  BookingType,
  setCar_Details,
  Car_I_Press,
}) => {
  const [cars, setCars] = useState([]);
  const {countryId, cityId} = useSelector(state => state?.user);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  //   country_id:4
  // start_time:13:00
  // book_date:2023-02-12

  // alert(JSON.stringify(cityId));

  const current_LAt_Long = async () => {
    Geolocation.getCurrentPosition(async info => {
      // setLatitude(info.coords.latitude);
      // setLongitude(info.coords.longitude);
      get_car(info.coords.latitude, info.coords.longitude);
    }, console.warn);
  };

  const get_car_old = async (latitude, longitude) => {
    try {
      var requestOptions = {
        method: 'POST',
      };
      const city_Id = cityId == undefined ? '' : cityId;

      // const url ='https://3tdrive.com/webservice//car_list?country_id=10&start_time=20:56:40&book_date=2023-10-01&book_status=now&lat=22.7029083&lon=75.8715908&city=Cairo';

      const url =
        baseUrl +
        '/car_list?country_id=' +
        countryId +
        '&start_time=' +
        moment(date).format('HH:MM:ss') +
        '&book_date=' +
        moment(date).format('yyyy-MM-DD') +
        '&book_status=' +
        (BookingType || 'now') +
        '&lat=' +
        latitude +
        '&lon=' +
        longitude +
        '&city=' +
        city_Id;

      console.log(JSON.stringify(url));
      const response = await fetch(url, requestOptions);

      const res = await response.json();
      console.log(res);

      if (res.status == '1') {
        setCars(res.result);

        setCar_Details(res?.result[0]);
        setSelected(res?.result[0]?.id);
        setCharge(res?.result[0]?.charge);
        setCharge_vat(res?.result[0]);
      } else {
        ShowToast(res.message || 'Unknown error', 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const get_car = (latitude, longitude) => {
    const city_Id = cityId == undefined ? '' : cityId;

    const body = new FormData();
    // body.append('user_id', userData.id);
    body.append('country_id', countryId);
    body.append('start_time', moment(date).format('HH:mm:ss'));
    body.append('book_date', moment(date).format('yyyy-MM-DD'));
    body.append('book_status', BookingType || 'now');
    body.append('lat', latitude);
    body.append('lon', longitude);
    body.append('city', city_Id);

    // console.log('bodybodybodybodybody', JSON.stringify(body));
    // alert(JSON.stringify(body));
    // return;
    post_api('car_list', body)
      .then(v => {
        console.log('cvdscdsvcdscgvdscdsg', v);
        if (v?.status == '1') {
          setCars(v?.result);
          setCar_Details(v?.result[0]);
          setSelected(v?.result[0]?.id);
          setCharge(v?.result[0]?.charge);
          setCharge_vat(v?.result[0]);
        } else {
          showError(
            res.message || localizationStrings?.msg_Unknown_error,
            'error',
          );
        }
      })
      .catch(v => {
        showError(v.message);
      });
  };

  useEffect(() => {
    // get_car();
    current_LAt_Long();
  }, []);

  return (
    <View>
      <FlatList
        horizontal
        data={cars}
        contentContainerStyle={{paddingLeft: 16}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setCar_Details(item);
              setSelected(item.id);
              setCharge(item.charge);
              setCharge_vat(item);
            }}
            style={{
              width: 120,
              height: 110,
              backgroundColor: '#25231F',
              borderWidth: selected == item.id ? 1 : 0,
              borderColor: '#FFDC00',
              borderRadius: 10,
              marginRight: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {selected == item.id && (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 5,
                  left: 5,
                  height: 16,
                  width: 16,
                  zIndex: 1,
                }}
                onPress={Car_I_Press}>
                <Image
                  source={require('../assets/icons/using/chat.png')}
                  style={{
                    height: 16,
                    width: 16,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            )}
            {selected == item.id && (
              <Image
                source={require('../assets/icons/using/Tick.png')}
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: 'contain',
                  position: 'absolute',
                  top: 5,
                  right: 5,
                }}
              />
            )}
            <Image
              source={{uri: item.car_image}}
              style={{height: 100, width: 100, resizeMode: 'contain'}}
            />
            {/* <Text
              style={{
                fontSize: 16,
                color: '#fff',
                fontFamily: 'Jost-SemiBold',
              }}>
              {item.charge}
            </Text> */}
            <Text
              style={{
                // fontSize: 12,
                color: '#BAB6AE',
                fontFamily: 'Jost-Regular',
                top: -10,
              }}>
              {item.car_name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#BAB6AE',
                fontFamily: 'Jost-Regular',
              }}>
              {item.no_of_seats}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CarDeatail;

const styles = StyleSheet.create({});
