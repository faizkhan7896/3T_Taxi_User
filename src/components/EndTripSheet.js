import React, {useState, useCallback, useEffect, useMemo, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import ProfileImg from './ProfileImg';
import {useSelector} from 'react-redux';
import {theme} from '../utils/theme';
import {ShowToast, baseUrl} from '../utils/constance';

import CustomButton from './CustomButton';
import CustomButton_2 from './CustomButton_2';
import localizationStrings from '../utils/Localization';
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
import store from '../redux/store';
import {apis} from '../utils/apis';
import PaymentOptions from './PaymentOptions';
import {post_api, showError, showSuccess} from '../utils/Constants';
import {useRoute} from '@react-navigation/native';
import {ScrollView, FlatList} from 'react-native-gesture-handler';

const DATA = [
  {
    id: '0',
    image: require('../assets/icons/chat.png'),
    title: 'Great Conversation',
  },
  {
    id: '1',
    image: require('../assets/icons/driver.png'),
    title: 'Professional Driver',
  },
  {
    id: '2',
    image: require('../assets/icons/clean.png'),
    title: 'Car Cleaned',
  },
  {
    id: '3',
    image: require('../assets/icons/map.png'),
    title: 'GPS Smarter',
  },
  {
    id: '4',
    image: require('../assets/icons/time.png'),
    title: 'Great Timing',
  },
];
const TIP_DATA = [
  {
    id: '10',
    val: '10',
  },
  {
    id: '20',
    val: '20',
  },
  {
    id: '50',
    val: '50',
  },
];

const App = ({navigation, setReviewSended}) => {
  const bottomSheetModalRef = useRef();
  const snapPoints = useMemo(() => ['32%', '87%'], []);
  const {userId, userData, tripData, booking_id, country, countryId} =
    useSelector(state => state?.user);
  const scrollView = useRef();
  const [badges, setBadges] = useState();
  const [rating, setRating] = useState(0);
  const [Comment, setComment] = useState('');
  const [badge, setBadge] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tip, setTip] = useState(0);

  const [payment, setPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(userData?.payment_option);
  const [CardDetails, setCardDetails] = useState({}); // const [TollData, setTollData] = useState({});
  const [topToBottom, setTopToBottom] = useState(0);

  // alert(JSON.stringify(CardDetails?.card_num));
  console.log('badgesbadgesbadgesbadgesbadges', userData?.payment_option);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const get_badges = async () => {
    try {
      const response = await fetch(
        baseUrl +
          'getDriverBadges?language=' +
          localizationStrings?.getLanguage(),
        {
          method: 'GET',
        },
      );
      const res = await response.json();
      if (res.status == '1') {
        // setLoading(false);
        setBadges(res.result);
        console.log(res);
      } else {
        ShowToast(res.message || 'Unknown error', 'error');
        // setLoading(false);
      }
    } catch (error) {
      console.log('post njbn', error);
    }
  };

  const CardPayment = async () => {
    if (CardDetails?.card_num == undefined) {
      showError(localizationStrings?.msg_select_card);
      return;
    }

    const body = new FormData();
    body.append('user_id', userId);
    body.append('card_number', CardDetails?.card_num);
    body.append('expiry_month', CardDetails?.card_exp?.split('/')[0]);
    body.append('expiry_year', CardDetails?.card_exp?.split('/')[1]);
    body.append('cvc_code', CardDetails?.card_cvv);
    // body.append('amount', 25);
    body.append('amount', tip?.toString());
    body.append('currency', country || 'NOK');

    console.log('paymentByCard', body);

    post_api('paymentByCard', body)
      .then(v => {
        // console.log('___paymentByCard', v);
        if (v.status == '1') {
          // alert(JSON.stringify(v?.transaction_id));
          AddReview();
          return;
        } else {
          showError(v?.message);
        }
      })
      .catch(e => {
        showError(e);
        console.log('paymentByCardpaymentByCardpaymentByCard', e);
      });
  };

  const AddReview = () => {
    if (badge?.length == 0) {
      showError('Please Select Any Badge');
      return;
    }
    // setLoading(true);
    const body2 = new FormData();
    body2.append('user_id', userId);
    body2.append('driver_id', tripData?.driver_id);
    body2.append('request_id', tripData?.id);
    body2.append('rating', rating);
    body2.append('review', Comment);
    body2.append('badge_id', badge.join(','));
    body2.append('type', 'USER');
    body2.append('payment_type', paymentMethod?.id);
    body2.append('tip_amount', tip);

    console.log('addEndTripRattingBadge', body2);
    // return

    apis.post_api('addEndTripRattingBadge', body2).then(v => {
      console.log('addEndTripRattingBadgeaddEndTripRattingBadge', v);
      // alert(JSON.stringify(v.status));
      if (v.status == 1) {
        setReviewSended(true);
        showSuccess(localizationStrings?.Rating_Submitted_Successfully);
        store.dispatch({type: BOOKING_STATUS, booking_status: 'FINISH'});
        store.dispatch({type: B_ID, booking_id: ''});
        store.dispatch({type: START, startTrip: false});
        store.dispatch({type: END, startTrip: false});
        store.dispatch({type: TRIP_DATA, tripData: {}});
        store.dispatch({type: CONTINUE_TRUE, continue_trip: false});
        store.dispatch({type: START_TRUE, start_trip: false});
        store.dispatch({type: CONTINUE_FALSE, continue_trip: false});
        setTimeout(() => {
          navigation.goBack();
          // navigation.navigate('HomeMap');
        }, 100);
        setLoading(false);
      } else {
        store.dispatch({type: BOOKING_STATUS, booking_status: 'FINISH'});
        store.dispatch({type: B_ID, booking_id: ''});
        store.dispatch({type: START, startTrip: false});
        store.dispatch({type: END, startTrip: false});
        store.dispatch({type: TRIP_DATA, tripData: {}});
        store.dispatch({type: CONTINUE_TRUE, continue_trip: false});
        store.dispatch({type: START_TRUE, start_trip: false});
        store.dispatch({type: CONTINUE_FALSE, continue_trip: false});
        setTimeout(() => {
          navigation.goBack();
          // navigation.navigate('HomeMap');
        }, 100);
        setLoading(false);
        ShowToast(v.message, 'error');
      }
    });
  };

  function generateRandomSixDigitInteger() {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const payWith_OPay = async () => {
    // navigation.navigate('PaymentWebview', {
    //   url: 'https://sandboxcashier.opaycheckout.com/bankInfo?payToken=eyJhbGciOiJIUzUxMiJ9.eyJjb3VudHJ5IjoiRUciLCJwYXlObyI6IjIzMDkyNTUwODE4MTA5OTA2MjkyMyIsInN1YiI6IjI4MTgyMzA5MTM2MDAzNyIsIm9yZGVyTm8iOiIyMzA5MjUxNDgxODEwOTkwNjA3MDkiLCJvcmRlckN1cnJlbmN5IjoiRUdQIiwicGF5TWV0aG9kIjoiQmFua0NhcmQiLCJzZXNzaW9uSWQiOiIyMzA5MjUxNDgxODEwOTkwNjA3MDkiLCJzaWxlbmNlIjoiWSIsImV4cCI6MTY5NTYyNjMzMH0.Z3i3aiq_hDAee_FabIvDBIsC1yA0PQH_mJ86NT8EJLEj4SxjvxRgulhAC8GXTrO1vieSe3MST7ruT9GmmYEa8g&session=230925148181099060709',
    // });
    // return;
    try {
      // setLoading(true);
      const url =
        'https://api.opaycheckout.com/api/v1/international/cashier/create';

      const body = {
        amount: {
          currency: 'EGP',
          total: parseFloat(tip + '00'),
        },

        callbackUrl: 'https://3tdrive.com/',
        country: 'EG',
        product: {
          description: 'description',
          name: 'name',
        },
        reference: generateRandomSixDigitInteger().toString(),
        payMethod: 'BankCard',
        returnUrl: 'https://3tdrive.com/',
      };

      console.log(body);
      const res = await fetch(url, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          MerchantId: '281823091304127',
          Authorization: 'Bearer OPAYPUB16946278056470.016889235515118783',
        },
        body: JSON.stringify(body),
      });
      // console.log(res);
      const rslt = await res.json();
      console.log(rslt);
      // alert(JSON.stringify(rslt?.message));
      // return;

      if (rslt.message == 'SUCCESSFUL') {
        // Linking.openURL(rslt?.data?.cashierUrl);
        navigation.navigate('PaymentWebview', {
          url: rslt?.data?.cashierUrl,
        });
      } else {
        ShowToast(rslt.message || 'Unknown error', 'error');
      }
      // setLoading(false);
    } catch (e) {
      // setLoading(false);
      // alert(JSON.stringify(e));
      ShowToast(localizationStrings?.msg_Unknown_error, 'error');
      console.log(e);
    }
  };

  // renders
  useEffect(() => {
    // setLoading(false);
    handlePresentModalPress();
    get_badges();
  }, []);

  const country_currency =
    countryId == '4'
      ? 'Rs'
      : countryId == '9'
      ? 'KR'
      : countryId == '10'
      ? 'EGP'
      : countryId == '11' && 'SAR';

  return (
    <View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        // enableOverDrag={true}
        containerStyle={{}}
        handleIndicatorStyle={{height: 0}}
        enablePanDownToClose={false}
        handleStyle={{
          backgroundColor: '#25231F',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        backgroundStyle={{backgroundColor: '#25231F'}}>
        <ScrollView
          scroll
          nestedScrollEnabled
          style={styles.contentContainer}
          ref={scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <Text
            style={{fontSize: 16, fontFamily: 'Jost-Medium', color: '#fff'}}>
            {localizationStrings.Thanks_Message + userData?.first_name}
          </Text>

          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Jost-Medium',
              color: '#807B73',
            }}>
            {localizationStrings?.hopeEjoy_msg}
          </Text>

          <View
            style={{
              backgroundColor: '#25231F',
              borderWidth: 1,
              borderColor: '#36342F',
              // marginHorizontal: 20,
              marginTop: 20,
              paddingVertical: 10,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Jost-Medium',
                color: '#fff',
                marginBottom: 15,
                textAlign: 'center',
              }}>
              {localizationStrings?.How_was_your_trip + ' '}
              {tripData?.driver_name || tripData?.driver_details?.user_name}?
            </Text>

            <ProfileImg
              br={60}
              size={80}
              source={{
                uri: tripData?.driver_image || tripData?.driver_details?.image,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                marginBottom: 10,
              }}>
              {Array(5)
                .fill('')
                .map((v, i) => (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setRating(i + 1)}>
                    <Image
                      source={require('../assets/icons/Star.png')}
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

          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Jost-Medium',
              color: '#807B73',
              marginTop: 10,
            }}>
            {localizationStrings.Comments}
          </Text>

          <TextInput
            multiline={true}
            placeholder={localizationStrings?.Type_comment}
            placeholderTextColor={'#FFFFFF50'}
            value={Comment}
            onChangeText={setComment}
            style={{
              height: 100,
              paddingVertical: 10,
              paddingHorizontal: 15,
              backgroundColor: '#171614',
              borderRadius: 10,
              marginVertical: 10,
              textAlignVertical: 'top',
              fontFamily: 'Jost-Medium',
              fontSize: 14,
              color: '#FFFFFF',
              borderWidth: 1,
              borderColor: '#36342F',
            }}
          />

          <View>
            <Text
              style={{
                fontFamily: 'Jost-Medium',
                color: '#fff',
                marginTop: 5,
                alignSelf: 'center',
                textAlign: 'center',
              }}>
              {localizationStrings.Dadges_for_this_driver}
            </Text>

            <FlatList
              data={badges}
              horizontal={true}
              scrollEnabled={true}
              nestedScrollEnabled
              style={{marginTop: 15}}
              renderItem={({item, i}) => (
                <TouchableOpacity
                  onPress={() => {
                    if (badge[i] != item?.id) {
                      setBadge(v => [...v, item.id]);
                      console.log(badge);
                    } else {
                      setBadge(v => [...v.slice(0, i), ...v.slice(i + 1)]);
                    }
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <Image
                    source={{uri: item?.image}}
                    resizeMode="contain"
                    style={{
                      height: 40,
                      width: 40,
                      // tintColor: '#FFDC00',
                      borderWidth: badge.find(v => v == item?.id) ? 1 : 0,
                      borderColor: '#FFDC00',
                      borderRadius: 100,
                      backgroundColor: '#807B73',
                    }}
                  />
                  <Text
                    numberOfLines={2}
                    style={{
                      fontFamily: 'Jost-Medium',
                      color: '#fff',
                      marginTop: 5,
                      alignSelf: 'center',
                      textAlign: 'center',
                      width: 60,
                      fontSize: 11,
                    }}>
                    {item?.cname}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <View>
              <Text
                style={{
                  fontFamily: 'Jost-Medium',
                  color: '#fff',
                  marginTop: 20,
                  alignSelf: 'center',
                  textAlign: 'center',
                  fontSize: 20,
                }}>
                {/* Add a tip for Saimon */}
                {localizationStrings.Add_A_Tip}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 20,
                  marginBottom: 10,
                  marginHorizontal: 50,
                }}>
                {TIP_DATA.map((item, i) => (
                  <TouchableOpacity
                    onPress={() => {
                      setTip(item?.val);
                    }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      height: 45,
                      width: 45,
                      borderColor:
                        tip == item?.val
                          ? theme.colors.yellow
                          : theme.colors.lightGray,
                      borderRadius: 100,
                    }}>
                    <Text
                      numberOfLines={2}
                      style={{
                        fontFamily: 'Jost-Medium',
                        color:
                          tip == item?.val
                            ? theme.colors.yellow
                            : theme.colors.lightGray,
                        alignSelf: 'center',
                        textAlign: 'center',
                        fontSize: 18,
                      }}>
                      {item?.id}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <CustomButton_2
              title={'SUBMIT REVIEW'}
              bgColor={'#FFDC004D'}
              color="#FFDC00"
              mh={16}
              mt={35}
              mb={20}
              onPress={() => {
                if (tip == 0) {
                  AddReview();
                }
                if (tip != 0) {
                  // CardPayment();
                  setPayment(true);
                }
              }}
              loading={loading}
              // loading={loading}
            />

            <CustomButton
              top={1}
              w={Dimensions.get('window').width - 60}
              vert={10}
              title={'Skip for now'}
              bw={1}
              bc={'gray'}
              bg={'#171614'}
              color={'gray'}
              mb={30}
              onPress={() => {
                store.dispatch({
                  type: BOOKING_STATUS,
                  booking_status: 'FINISH',
                });
                store.dispatch({type: B_ID, booking_id: ''});
                store.dispatch({type: START, startTrip: false});
                store.dispatch({type: END, startTrip: false});
                store.dispatch({type: TRIP_DATA, tripData: {}});
                store.dispatch({type: CONTINUE_TRUE, continue_trip: false});
                store.dispatch({type: START_TRUE, start_trip: false});
                store.dispatch({type: CONTINUE_FALSE, continue_trip: false});
                setTimeout(() => {
                  navigation.goBack();
                  // navigation.navigate('HomeMap');
                }, 100);
              }}
            />
            {/* <View style={{height: 30}} /> */}
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={() => {
            if (topToBottom == 1) {
              setTopToBottom(0);
              scrollView.current.scrollTo({
                x: 0, // Required
                y: 0, // Required
                animated: true,
              });
            } else {
              setTopToBottom(1);
              scrollView.current.scrollTo({
                x: 1000, // Required
                y: 1000, // Required
                animated: true,
              });
            }
          }}
          style={{
            // borderRadius: 120,

            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            overflow: 'hidden',
            // height: 65,
            // width: 65,
            alignItems: 'center',
            justifyContent: 'center',
            // borderWidth:1
            position: 'absolute',
            top: 0,
            right: 20,
          }}>
          <Image
            style={{
              height: 28,
              width: 28,
              resizeMode: 'contain',
              transform: [{rotate: topToBottom == 1 ? '0deg' : '180deg'}],
            }}
            source={require('../assets/icons/Uparrow.png')}
          />
        </TouchableOpacity>
      </BottomSheetModal>

      <PaymentOptions
        isOpen={payment}
        setIsOpen={setPayment}
        setSelected={setPaymentMethod}
        selected={paymentMethod}
        setCardDetails={setCardDetails}
        price={tip}
        customBut={true}
        CustomOnPress={() => {
          if (paymentMethod?.id == 'OPay') {
            // CardPayment();
            payWith_OPay();
          }
          if (paymentMethod?.id == 'Card') {
            CardPayment();
          }
          if (paymentMethod?.id == 'Cash') {
            AddReview();
          }
          if (paymentMethod?.id == 'Pay_in_Car') {
            AddReview();
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    backgroundColor: '#25231F',
    borderColor: '#36342F',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    flex: 1,
    height: '100%',
  },
});

export default App;
