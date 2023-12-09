import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import CustomButton_2 from './CustomButton_2';
import {theme} from '../utils/theme';
import {useSelector} from 'react-redux';
import {post_api, showError, showSuccess} from '../utils/Constants';
import {useNavigation} from '@react-navigation/native';
import Loader from './Loader';
import moment from 'moment';
import store from '../redux/store';
import {
  BOOKING_STATUS,
  B_ID,
  CONTINUE_FALSE,
  CONTINUE_TRUE,
  END,
  START,
  START_TRUE,
  TRIP_DATA,
} from '../redux/ActionTypes';
import localizationStrings from '../utils/Localization';

const CancelRide = ({isOpen, setIsOpen, setBook, setcancel_popup}) => {
  const navigation = useNavigation();
  const {userId, booking_id} = useSelector(state => state.user);
  const [reason, setReason] = useState('');
  const [selected, setSelected] = useState('My reason is not Listed');
  const [loading, setLoading] = useState(false);
  const data = [
    localizationStrings?.Book_another_ride,
    localizationStrings?.Unable_connect_driver,
    localizationStrings?.My_reason,
  ];
  const cancel_trip_reason = () => {
    setLoading(true);
    const body = new FormData();
    body.append('user_id', userId);
    body.append('request_id', booking_id);
    body.append('other_reason', reason);
    body.append('cancel_time', moment(new Date()).format('YYYY-MM-DD hh:mm:ss'));
    body.append('cancel_reaison', selected);
    body.append('type', 'USER');
    console.log('body', body);
    post_api('cancelBookingRequest', body)
      .then(v => {
        setLoading(false);
        console.log('--------------------', v);
        if (v.status == 1) {
          store.dispatch({type: BOOKING_STATUS, booking_id: 'FINISH'});
          store.dispatch({type: B_ID, booking_id: ''});
          store.dispatch({type: START, startTrip: false});
          store.dispatch({type: END, startTrip: false});
          store.dispatch({type: TRIP_DATA, tripData: {}});
          store.dispatch({type: CONTINUE_TRUE, continue_trip: false});
          store.dispatch({type: START_TRUE, start_trip: false});
          store.dispatch({type: CONTINUE_FALSE, continue_trip: false});
          navigation.goBack();
          setBook(0);
          // navigation.navigate('HomeMap');
          showSuccess(localizationStrings?.msg_Ride_canceled);
          return;
        }
        showError(v.message);
      })
      .catch(e => {
        setLoading(false);
        showError(e);
      });
  };
  return (
    <View>
      {loading && <Loader />}
      <Modal
        isVisible={isOpen}
        style={{margin: 0, padding: 0}}
        // animationIn="fadeInUp"
        // statusBarTranslucent={true}
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
          }}>
          <Text
            style={{
              fontSize: 18,
              color: theme.colors.white,
              marginTop: 15,
              fontFamily: 'Jost-Medium',
              marginHorizontal: 20,
            }}>
            {localizationStrings.Driver_Destination}
            {/* Driver is less than 25 min away */}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: theme.colors.lightGray,
              fontFamily: 'Jost-Regular',
              marginHorizontal: 20,
              paddingBottom: 15,
            }}>
            {localizationStrings.Are_you_sur_to_cancel}
            {/* Are you sure you want to cancel? */}
          </Text>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => setSelected(item)}
                style={{
                  marginHorizontal: 20,
                  paddingVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: 16,
                    width: 16,
                    borderWidth: 0.8,
                    borderColor: theme.colors.lightGray,
                    borderRadius: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {selected == item && (
                    <View
                      style={{
                        height: 7,
                        width: 7,
                        backgroundColor: theme.colors.lightGray,
                        borderRadius: 40,
                      }}
                    />
                  )}
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Jost-Regular',
                    color: theme.colors.lightGray,
                    marginLeft: 10,
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
          <Text
            style={{
              fontSize: 14,
              color: theme.colors.lightGray,
              fontFamily: 'Jost-Regular',
              marginTop: 15,
              marginHorizontal: 20,
            }}>
            {localizationStrings.Enter_Reason}
            {/* Enter your reason below */}
          </Text>
          {/* <KeyboardAvoidingView behavior="height"> */}

          <TextInput
            placeholder={localizationStrings?.Type_Your}
            placeholderTextColor={'#FFFFFF50'}
            value={reason}
            onChangeText={setReason}
            style={{
              height: 100,
              paddingVertical: 10,
              paddingHorizontal: 15,
              backgroundColor: '#171614',
              marginHorizontal: 20,
              borderRadius: 10,
              marginVertical: 10,
              textAlignVertical: 'top',
              fontFamily: 'Jost-Medium',
              fontSize: 14,
              color: '#FFFFFF',
            }}
          />
          {/* </KeyboardAvoidingView> */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginBottom: 20,
              marginHorizontal: 10,
            }}>
            <CustomButton_2
              onPress={() => setIsOpen(false)}
              source={require('../assets/icons/right.png')}
              color="#74C12C"
              bgColor={'#74C12C4D'}
              title={localizationStrings.Keep_Book}
              flex={1}
              mh={10}
            />
            <CustomButton_2
              bgColor={'#F01D504D'}
              color="#F01D50"
              title={localizationStrings.Cancel}
              source={require('../assets/icons/cancel.png')}
              flex={1}
              mh={10}
              onPress={() => cancel_trip_reason()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CancelRide;
