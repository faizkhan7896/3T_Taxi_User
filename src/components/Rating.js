import moment from 'moment';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import Circle from '../components/Circle';
import CustomButton from '../components/CustomButton';
import {theme} from '../utils/theme';
import {
  EMPTY_REQ,
  RIDE_STARTED,
  REQ_ACC,
  RIDE_COMPLETE,
} from '../redux/ActionTypes';

const EndTripRating = ({navigation}) => {
  const {request, userId, requestData, requestAccepted, userData, rideStarted} =
    useSelector(state => state?.user);
  const [rating, setRating] = useState(0);
  // alert(JSON.stringify(requestData?.result?.users_details?.image));

  const PaymentRecieved = () => {
    const body2 = new FormData();
    body2.append('user_id', requestData?.result?.users_details?.id);
    body2.append('driver_id', requestData?.result?.driver_details?.id);
    body2.append('rating', rating);
    body2.append('review', 'dsc');
    // alert(JSON.stringify(body2))

    apis.post_api('add_user_review', body2).then(v => {
      // alert(JSON.stringify(v.status))
      if (v.status === '1') {
        store.dispatch({type: EMPTY_REQ});
        store.dispatch({type: RIDE_STARTED, payload: false});
        store.dispatch({type: REQ_ACC, payload: false});
        store.dispatch({type: RIDE_COMPLETE, payload: true});
        navigation.navigate('Drawer');
        // alert();
      } else {
        ShowToast(v.message, 'error');
      }
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
          marginTop: 30,
          marginBottom: 20,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{
            height: 30,
            width: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/icons/using/Back.png')}
            style={{height: 28, width: 28, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <Text
          style={{fontSize: 20, fontWeight: '600', color: theme.colors.white}}>
          s
        </Text>
        <View style={{width: 30}} />
      </View>
      <ScrollView>
        <View
          style={{
            marginHorizontal: 16,
            backgroundColor: '#36342F',
            borderRadius: 20,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#535048',
          }}>
          <Image
            source={require('../assets/icons/using/map_detail.png')}
            style={{
              height: 200,
              width: '100%',
              resizeMode: 'cover',
              borderRadius: 20,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 15,
            }}>
            <Text style={{fontSize: 14, color: theme.colors.white}}>
              {/* 15th Sep @10:20 AM */}
              {moment(requestData?.result?.start_time).format('Do MMM @LT')}
            </Text>
            <Text style={{fontSize: 14, color: theme.colors.white}}>
              {/* 8.51 km | 30 min */}
              {parseFloat(requestData?.result?.distance).toFixed(2) +
                ' km | ' +
                parseFloat(requestData?.result?.distance_time).toFixed(2) +
                ' min'}
            </Text>
          </View>
        </View>
        <View style={{marginVertical: 25, marginHorizontal: 20}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Circle bg="#74C12C" />
            <Text
              style={{
                fontSize: 14,
                color: theme.colors.lightGray,
                marginLeft: 10,
              }}>
              From Location
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <LinearGradient
              colors={['#FFDC0000', '#FFDC00']}
              start={{x: 0, y: 0}}
              style={{width: 1, marginHorizontal: 5, marginVertical: 4}}
            />
            <View style={{flex: 1}}>
              <Text style={styles.text2}>
                {requestData?.result?.picuplocation}
              </Text>
              <Text style={[styles.text2, {marginBottom: 10}]}>10:45 AM</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Circle bg="#FFDC00" />
            <Text
              style={{
                fontSize: 14,
                color: theme.colors.lightGray,
                marginLeft: 10,
              }}>
              To Location
            </Text>
          </View>
          <Text style={[styles.text2, {marginLeft: 23}]}>
            {requestData?.result?.dropofflocation}
          </Text>
          <Text style={[styles.text2, {marginLeft: 23}]}>10:45 AM</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text12}>
            How was your trip with{' '}
            {requestData?.result?.users_details?.first_name}?
          </Text>
          <Image
            source={{
              uri: requestData?.result?.users_details?.image,
            }}
            style={{
              height: 100,
              width: 100,
              resizeMode: 'cover',
              borderRadius: 80,
              alignSelf: 'center',
              marginVertical: 20,
              backgroundColor: '#807B73',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            {Array(5)
              .fill('')
              .map((v, i) => (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setRating(i + 1)}>
                  <Image
                    source={require('../assets/icons/using/Star_1.png')}
                    style={{
                      height: 31,
                      width: 31,
                      resizeMode: 'contain',
                      tintColor:
                        rating >= i + 1 ? theme.colors.yellow : '#807B73',
                      marginHorizontal: 4,
                    }}
                  />
                </TouchableOpacity>
              ))}
          </View>
        </View>
        <CustomButton
          title={'SUBMIT REVIEW'}
          onPress={() => PaymentRecieved()}
        />
        <View style={{height: 30}} />
      </ScrollView>
    </View>
  );
};

export default EndTripRating;

const styles = StyleSheet.create({
  text2: {
    marginLeft: 10,
    marginTop: 5,
    fontSize: 12,
    color: '#807B73',
  },
  text12: {
    fontSize: 16,
    color: theme.colors.white,
    textAlign: 'center',
  },
  box: {
    marginHorizontal: 16,
    backgroundColor: '#17161433',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#535048',
    paddingTop: 10,
    marginBottom: 30,
    paddingBottom: 30,
  },
});
