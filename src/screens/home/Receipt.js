import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  Image,
  route,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {theme} from '../../utils/theme';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomHeader from '../../components/CustomHeader';
import {FlatList} from 'react-native';
import GradientLineWithText from '../../components/GradientLineWithText';
import LinearGradient from 'react-native-linear-gradient';
import {apis} from '../../utils/apis';
import {baseUrl, ShowToast} from '../../utils/constance';
import moment from 'moment';
import Loader from '../../components/Loader';
import {useSelector} from 'react-redux';
import {ImagePath} from '../../utils/ImagePath';
import CustomButton_2 from '../../components/CustomButton_2';
import localizationStrings from '../../utils/Localization';

// const data = [
//   {
//     name: 'Spireaveien 1',
//     nameTwo: 'Enjoveien 20',
//     image: require('../../assets/icons/using/Dot.png'),
//     img: require('../../assets/icons/using/Stroke.png'),
//   },
//   {
//     name: 'Spireaveien 1',
//     nameTwo: 'Enjoveien 20',
//     image: require('../../assets/icons/using/Dot.png'),
//     img: require('../../assets/icons/using/Stroke.png'),
//   },
//   {
//     name: 'Spireaveien 1',
//     nameTwo: 'Enjoveien 20',
//     image: require('../../assets/icons/using/Dot.png'),
//     img: require('../../assets/icons/using/Stroke.png'),
//   },
// ];

export default function Receipts() {
  const dimension = useWindowDimensions();
  const navigation = useNavigation();
  const [receipt_data, setReceipt_data] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(0);
  const {userId} = useSelector(state => state.user);
  // alert(JSON.stringify(receipt_data))
  const {countryId} = useSelector(state => state.user||9);

  const country =
    countryId == '4'
      ? 'INR'
      : countryId == '9'
      ? 'NOK'
      : countryId == '10'
      ? 'EGP'
      : countryId == '11' && 'SAR';

  const get_trip = async () => {
    setLoading(true);
    var requestOptions = {
      method: 'POST',
      headers: {'content-type': 'multipart/form-data'},
    };

    fetch(
      baseUrl + '/get_user_trip_booking_receipt?user_id=' + userId,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log('get_user_trip_booking_receipt', result);

        if (result.status == 1) {
          setReceipt_data(result?.result);
          setLoading(false);
        } else {
          setLoading(false);
          // ShowToast(result.message);
        }
      })
      .catch(error => console.log('error', error));
  };

  React.useEffect(() => {
    get_trip();
    const unsubscribe = navigation.addListener('focus', () => {
      get_trip();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{flex: 1, backgroundColor: '#171614'}}>
      <CustomHeader title={localizationStrings?.Reciepts} />
      {loading && <Loader />}
      <View style={{flex: 1}}>
        {/* /* style={{flex: 1, backgroundColor: theme.colors.bg}} */}
        {/* <GradientLineWithText title={header} /> */}
        <View style={{}}>
          <FlatList
            data={receipt_data}
            scrollEnabled={true}
            inverted
            ListEmptyComponent={
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
                  {localizationStrings?.dont_have_Reciepts}
                </Text>
                <CustomButton_2
                  onPress={() => navigation.navigate('HomeMap')}
                  title={localizationStrings?.Book_Now}
                  color={'#171614'}
                  bgColor="#FFDC00"
                  containerStyle={{width: 200, alignSelf: 'center'}}
                />
              </View>
            }
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('TripDetail', {item})}
                style={{
                  backgroundColor: '#36342F4D',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingTop: 10,
                    // backgroundColor: '#25231F',
                  }}>
                  <View
                    style={{
                      height: 60,
                      width: 60,
                      backgroundColor: '#25231F',
                      borderRadius: 7,
                      paddingHorizontal: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        color: theme.colors.yellow,
                        textAlign: 'center',
                      }}>
                      {moment(item.req_datetime).format('Do')}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        color: theme.colors.yellow,
                        textAlign: 'center',
                      }}>
                      {moment(item.req_datetime).format('MMM')}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: theme.colors.lightGray,
                        marginTop: 3,
                      }}>
                      @ {moment(item.req_datetime).format('h:mm')}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      marginHorizontal: 10,
                      height: 70,
                      // justifyContent:'space-between'
                    }}>
                    <View
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                      <View style={styles.circle} />
                      <LinearGradient
                        colors={['#BAB6AE', '#BAB6AE00']}
                        useAngle={false}
                        start={{x: 1, y: 1}}
                        end={{x: 0, y: 0}}
                        style={{
                          height: 22,
                          width: 1,
                          borderRadius: 5,
                          marginVertical: 5,
                        }}
                      />
                      <View style={styles.circle} />
                    </View>
                    <View
                      style={{marginLeft: 10, justifyContent: 'space-between'}}>
                      <Text
                        numberOfLines={2}
                        style={{
                          fontSize: 11,
                          color: theme.colors.lightGray,
                        }}>
                        {item.picuplocation == ''
                          ? 'Pickup Location'
                          : item.picuplocation}
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={{
                          fontSize: 11,
                          color: theme.colors.lightGray,
                        }}>
                        {item.dropofflocation == ''
                          ? 'Drop Location'
                          : item.dropofflocation}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: theme.colors.white,
                      textAlign: 'right',
                    }}>
                    {item.amount}
                    {'\n'}
                    {country}
                  </Text>
                  <Image
                    source={require('../../assets/icons/using/Next.png')}
                    style={{
                      height: 17,
                      width: 17,
                      resizeMode: 'contain',
                      marginLeft: 10,
                    }}
                  />
                </View>
                <View
                  style={{height: 1, backgroundColor: '#656055', marginTop: 10}}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    height: 12,
    width: 12,
    borderRadius: 30,
    backgroundColor: '#BAB6AE',
  },
});
