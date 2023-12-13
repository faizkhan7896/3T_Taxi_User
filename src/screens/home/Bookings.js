import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {theme} from '../../utils/theme';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomHeader from '../../components/CustomHeader';
import ProfileImg from '../../components/ProfileImg';
import {FlatList} from 'react-native';
import GradientLine from '../../components/GradientLine';
import Circle from '../../components/Circle';
import CustomButton_2 from '../../components/CustomButton_2';
import AlertPopup from '../../components/AlertPopup';
import CancelBookingPopup from '../../components/CancelBookingPopup';
import {apis} from '../../utils/apis';
import {baseUrl, ShowToast} from '../../utils/constance';
import {useSelector} from 'react-redux';
import {ImagePath} from '../../utils/ImagePath';
import moment from 'moment';
import localizationStrings from '../../utils/Localization';

export default function Bookings() {
  const dimension = useWindowDimensions();
  const {userId} = useSelector(state => state.user);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(0);
  const [cancelBooking, setCancelBooking] = useState(false);
  const [booking_data, setBooking_data] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteBokingData, setDeleteBokingData] = useState({});
  const {countryId} = useSelector(state => state.user||9);

  const country =
    countryId == '4'
      ? 'INR'
      : countryId == '9'
      ? 'NOK'
      : countryId == '10'
      ? 'EGP'
      : countryId == '11' && 'SAR';

  // alert(JSON.stringify(deleteBokingData?.id))
  const get_data = async () => {
    setLoading(true);
    var requestOptions = {
      method: 'POST',
      headers: {'content-type': 'multipart/form-data'},
    };

    fetch(baseUrl + `/get_User_all_booking?user_id=${userId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setLoading(false);
        //console.log(result);
        if (result.status == 1) {
          setBooking_data(result.result);
        } else {
          setBooking_data([]);
        }
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    get_data();
  }, []);

  const cancel_booking = async () => {
    try {
      setLoading(true);
      const url = baseUrl + 'cancelBookingByUser';
      //console.log(url);
      const body = new FormData();
      body.append('user_id', userId);
      body.append('booking_id', deleteBokingData?.id);
      //console.log(body);
      const res = await fetch(url, {
        method: 'POST',
        body: body,
        headers: {'content-type': 'multipart/form-data'},
      });
      const result = await res.json();
      //console.log(result);
      if (result.status == '1') {
        setLoading(false);
        get_data();
        setCancelBooking(false);
        setDeleteBokingData({});
      } else {
        ShowToast(result.message || 'Unknown error', 'error');
        setLoading(false);
      }
    } catch (error) {
      //console.log(error);
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
      <CustomHeader title={localizationStrings.Booking} />
      {booking_data.length == 0 ? (
        <View style={{flex: 1}}>
          <Image
            source={ImagePath.no_bookings}
            style={{
              height: 250,
              width: dimension.width - 60,
              alignSelf: 'center',
              resizeMode: 'contain',
            }}
          />
          <Text
            style={{
              color: '#BAB6AE',
              fontSize: 20,
              fontFamily: 'Jost-Medium',
              textAlign: 'center',
              marginVertical: 40,
            }}>
            {localizationStrings.Any_bookings}
          </Text>
          <CustomButton_2
            onPress={() => navigation.navigate('HomeMap')}
            title={localizationStrings.Book_Now}
            color={'#171614'}
            bgColor="#FFDC00"
            containerStyle={{width: 200, alignSelf: 'center'}}
          />
        </View>
      ) : (
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <ProfileImg
                size={26}
                source={require('../../assets/icons/black_back.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                fontFamily: 'Jost-Medium',
                marginHorizontal: 25,
              }}>
              {moment(new Date()).format('Do, MMMM')}
            </Text>
            <TouchableOpacity>
              <ProfileImg
                size={26}
                source={require('../../assets/icons/black_next.png')}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            contentContainerStyle={{justifyContent: 'center'}}
            horizontal
            pagingEnabled
            data={booking_data}
            renderItem={({item, index}) => (
              <View
                style={{
                  width: dimension.width - 50,
                  marginHorizontal: 20,
                  backgroundColor: '#25231F',
                  borderWidth: 1,
                  borderColor: '#36342F',
                  borderRadius: 10,
                  overflow: 'hidden',
                  marginTop: 10,
                }}>
                <Image
                  source={require('../../assets/icons/map_with_pin.png')}
                  style={{
                    height: dimension.width / 2.5,
                    width: '100%',
                    resizeMode: 'cover',
                  }}
                />
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: 16,
                      marginTop: 10,
                    }}>
                    <View style={{alignItems: 'center'}}>
                      <Image
                        source={require('../../assets/icons/location_pin.png')}
                        style={{
                          height: 16,
                          width: 16,
                          resizeMode: 'contain',
                          tintColor: '#74C12C',
                        }}
                      />
                      <GradientLine
                        colors={['#FFDC0000', '#FFDC00']}
                        height={19}
                        width={1}
                        marginVertical={5}
                      />
                      <Circle bg={'#FFDC00'} />
                    </View>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        marginLeft: 10,
                        flex: 1,
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          numberOfLines={1}
                          style={{
                            fontSize: 14,
                            color: '#BAB6AE',
                            fontFamily: 'Jost-Regular',
                            flex: 1,
                          }}>
                          {item.picuplocation}
                        </Text>
                        <Image
                          source={require('../../assets/icons/sticky_note.png')}
                          style={{
                            height: 16,
                            width: 16,
                            resizeMode: 'contain',
                          }}
                        />
                      </View>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 14,
                          color: '#BAB6AE',
                          fontFamily: 'Jost-Regular',
                        }}>
                        {item.dropofflocation}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: '#36342F',
                      marginTop: 10,
                    }}
                  />
                  <TextComp
                    img
                    t1={localizationStrings.Departure}
                    t2={localizationStrings.Estimated_arrival}
                    s1={item.start_time}
                    s2={item.end_time}
                  />
                  <TextComp
                    t1={'Booking ID'}
                    t2={'Product'}
                    s1={item.id}
                    s2={item.product}
                  />
                  <TextComp
                    t1={'Maximum Price'}
                    t2={'Payment Method'}
                    s1={item.amount + ' ' + country}
                    s2={item.payment_type}
                  />
                  <CustomButton_2
                    onPress={() => {
                      setDeleteBokingData(item);
                      setCancelBooking(true);
                    }}
                    title={localizationStrings.Cancel_Booking}
                    source={require('../../assets/icons/cancel.png')}
                    color={'#F01D50'}
                    bgColor={'#F01D504D'}
                    mh={16}
                    mv={15}
                  />
                </View>
              </View>
            )}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                color: '#BAB6AE',
                fontSize: 14,
                fontFamily: 'Jost-Regular',
              }}>
              View our
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
              <Text
                style={{
                  color: theme.colors.yellow,
                  fontSize: 14,
                  fontFamily: 'Jost-Medium',
                }}>
                {' '}
                Terms & Conditions{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              marginBottom: 20,
              color: '#BAB6AE',
              fontSize: 14,
              fontFamily: 'Jost-Regular',
              textAlign: 'center',
            }}>
            once for Cancelation
          </Text>
        </ScrollView>
      )}
      <AlertPopup
        source={require('../../assets/icons/alert.png')}
        children={
          <CancelBookingPopup
            onCancelPress={() => cancel_booking()}
            onPress={() => {
              setCancelBooking(false);
              setDeleteBokingData({});
            }}
          />
        }
        visible={cancelBooking}
        setVisible={setCancelBooking}
      />
    </View>
  );
}
const VertLine = () => <View style={{width: 1, backgroundColor: '#656055'}} />;
const TextComp = ({t1, t2, s1, s2, color, img}) => (
  <View
    style={{
      flexDirection: 'row',
      borderBottomColor: '#656055',
      borderBottomWidth: 1,
    }}>
    <View style={{flex: 1, paddingHorizontal: 15, paddingVertical: 9}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {img && (
          <Image
            source={require('../../assets/icons/clock.png')}
            style={{
              height: 16,
              width: 16,
              resizeMode: 'contain',
              marginRight: 7,
            }}
          />
        )}
        <Text style={{fontSize: 14, color: theme.colors.lightGray}}>{t1}</Text>
      </View>
      <Text
        style={{
          fontSize: 14,
          color: color || theme.colors.white,
          fontWeight: '500',
          marginTop: 5,
        }}>
        {s1}
      </Text>
    </View>
    <VertLine />
    <View style={{flex: 1, paddingHorizontal: 15, paddingVertical: 9}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {img && (
          <Image
            source={require('../../assets/icons/clock.png')}
            style={{
              height: 16,
              width: 16,
              resizeMode: 'contain',
              marginRight: 7,
            }}
          />
        )}
        <Text style={{fontSize: 14, color: theme.colors.lightGray}}>{t2}</Text>
      </View>
      <Text
        style={{
          fontSize: 14,
          color: theme.colors.white,
          fontWeight: '500',
          marginTop: 5,
        }}>
        {s2}
      </Text>
    </View>
  </View>
);
