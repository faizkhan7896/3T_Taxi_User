import * as Fawry from '@fawry_pay/rn-fawry-pay-sdk';
import {useNavigation} from '@react-navigation/native';
import {PlatformPay, usePlatformPay} from '@stripe/stripe-react-native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';
import SwipeButton from 'rn-swipe-button';
import {B_ID} from '../redux/ActionTypes';
import store from '../redux/store';
import {
  add_time,
  get_Profile,
  post_api,
  showError,
  showSuccess,
} from '../utils/Constants';
import {ImagePath} from '../utils/ImagePath';
import localizationStrings from '../utils/Localization';
import {ShowToast, baseUrl, mapsApiKey} from '../utils/constance';
import {theme} from '../utils/theme';
import AddressPickup from './AddressPickup';
import AskNow from './AskNow';
import CarDeatail from './CarDeatail';
import CoupanCode from './CoupanCode';
import CustomButton_2 from './CustomButton_2';
import GradientLine from './GradientLine';
import HoriLine from './HoriLine';
import PaymentOptions from './PaymentOptions';
import {
  default as CarDetails,
  default as PricingDetails,
} from './PricingDetails';
import SearchingDriverPopup from './SearchingDriverPopup';
import TimeText from './TimeText';

const allowedCardNetworks = ['VISA', 'MASTERCARD'];
const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

const ChooseLocation = ({
  getCordinates1,
  getCordinates2,
  onBookNow_press,
  book,
  setBook,
  add1,
  lat1,
  lon1,
  distance,
  time,
  BookingType,
  MarkerDraged,
  setMarkerDraged,
  drop_lat,
  drop_lon,
  Drop_address,
  onBooklater_press,
  TollData,
  updateState,
  displaySearch,
  setDisplaySearch,
}) => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [openPicker, setOpenPicker] = useState(false);
  const [date1, setDate1] = useState(new Date());
  const [state, setState] = useState({
    destinationCords: {},
    destinationAddress: '',
  });

  const {destinationCords, destinationAddress} = state;
  const {
    userId,
    countryId,
    address_,
    cityId,
    booking_Later_Date,
    tripData,
    userData,
  } = useSelector(state => state?.user);
  const dimension = useNavigation();

  const [selected, setSelected] = useState();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [Car_Details, setCar_Details] = useState({}); // const [TollData, setTollData] = useState({});
  const [charge, setCharge] = useState('');
  const [charge_vat, setCharge_vat] = useState('');
  const [payment, setPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState({
    id: userData?.payment_option || 'Cash',
  });
  const [visible, setVisible] = useState(false);
  const [ask, setAsk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [CardDetails, setCardDetails] = useState({}); // const [TollData, setTollData] = useState({});

  const [CoupanVisible, setCoupanVisible] = useState(false);
  const [CoupanData, setCoupanData] = useState(userData?.payment_option);
  const [SelectedCoupan, setSelectedCoupan] = useState(''); // const [TollData, setTollData] = useState({});
  const [LocationPicked, setLocationPicked] = useState(false);
  const {isPlatformPaySupported, confirmPlatformPayPayment} = usePlatformPay();
  const [ShowPricing, setShowPricing] = useState(false);
  const [Show_CardDetails, setShow_CardDetails] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState('');
  const [transaction_id_, setTransaction_id] = useState('');

  // alert(JSON.stringify(CardDetails))
  // alert(JSON.stringify(tripData?.booktype == 'later' ? displaySearch : visible))

  // //console.log('Calculation Formula ============================', {
  //   carges: Car_Details?.charge + ' + ',
  //   distance: distance + ' x ',
  //   per_km: Car_Details?.per_km + ' + ',
  //   Trip_timeTaken: parseFloat(time) + ' x',
  //   ride_time_charge_permin: Car_Details?.ride_time_charge_permin,
  //   toll_tax:
  //     TollData?.tolls != undefined
  //       ? TollData?.tolls[0]?.fares[0]?.convertedPrice?.value
  //       : 0,
  // });

  // alert(JSON.stringify(BookingType));

  // alert(JSON.stringify(userData?.payment_option));
  // //console.log('lat1,lon1, drop_lat, drop_lon', lat1, lon1, drop_lat, drop_lon);

  // OLD ======== distance x charges (per km) + distance x charges (per km) /100 x vat_Tax + toll_price
  // CLIENT FORMULA ========== Start + distance x km price + time x min price + toll + extra - discount
  // CURRENT ========== Car_charges + distance x charges (per km) + Trip_timeTaken x Car_ride_time_charge_permin + Toll - (discount or coupons)
  // CURRENT ========== (15+6.088) * 10 + (9.01*8) + 26.4 = 309

  function parseTimeData(timeData) {
    const regex = /(\d+)\s*(day|hour|minute|days|hours|minutes)?/g;
    let totalMinutes = 0;

    // return alert(JSON.stringify(regex.exec(timeData)));
    let match;
    while ((match = regex.exec(timeData)) !== null) {
      const value = parseInt(match[1]);
      const unit = match[2] || 'minutes';

      switch (unit) {
        case 'minute':
        case 'minutes':
          totalMinutes += value;
          break;
        case 'hour':
        case 'hours':
          totalMinutes += value * 60;
          break;
        case 'day':
        case 'days':
          totalMinutes += value * 60 * 24;
          break;
        default:
          console.error(`Invalid unit: ${unit}`);
      }
    }
    const addTime = moment(BookingType == 'later' ? date : new Date()).add(
      totalMinutes,
      'minutes',
    );
    setEstimatedTime(addTime);

    // return totalMinutes;
  }

  function Get_timeBy_LatLng(
    pickup_latitude,
    pickup_longitude,
    destination_latitude,
    destination_longitude,
  ) {
    const url =
      `https://maps.googleapis.com/maps/api/directions/json?origin=${pickup_latitude},${pickup_longitude}&destination=${destination_latitude},${destination_longitude}&key=` +
      mapsApiKey;

    //console.log('maps.googleapis.com', url);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.routes && data.routes.length > 0) {
          const duration = data.routes[0].legs[0].duration.text;
          // const duration = '1 day 1 hours 10 mins';

          parseTimeData(duration);
          // alert(JSON.stringify());
          // alert(
          //   JSON.stringify(
          //     moment(totalMinutes).format('Do MMM' + ' @' + 'hh:mm a'),
          //   ),
          // );
        }
      })
      .catch(error => console.log('Error fetching directions:', error));
  }

  const finalAmount =
    Math.floor(
      parseFloat(Car_Details?.charge || 0) +
        distance * parseFloat(Car_Details?.per_km || 0),
    ) +
    parseFloat(time)?.toFixed(2) *
      parseFloat(Car_Details?.ride_time_charge_permin || 0) +
    (TollData?.tolls != undefined
      ? TollData?.tolls[0]?.fares[0]?.convertedPrice?.value
      : 0);

  const PaymentAmount = parseFloat(
    (finalAmount?.toFixed(2)?.split('.')[1] || 0) <= 49
      ? finalAmount?.toFixed(2)?.split('.')[0] || 0
      : (finalAmount + 1).toFixed(2)?.split('.')[0] || 0,
  );

  const Discount = parseFloat(
    ((PaymentAmount / 100) * SelectedCoupan?.amount)
      ?.toFixed(2)
      ?.split('.')[1] <= 49
      ? ((PaymentAmount / 100) * SelectedCoupan?.amount)
          ?.toFixed(2)
          ?.split('.')[0]
      : ((PaymentAmount / 100) * SelectedCoupan?.amount + 1)
          .toFixed(2)
          ?.split('.')[0],
  );

  const LastAmountWithCoupan = (PaymentAmount || 0) - (Discount || 0);
  // alert(LastAmountWithCoupan)

  useEffect(() => {
    Get_timeBy_LatLng(lat1, lon1, drop_lat, drop_lon);
    // alert()
  }, [drop_lat, drop_lon, date, BookingType]);

  // FAWRY PAY PAYMENT CODE

  // const cartItems: Fawry.BillItems[] = [
  //   {
  //     itemId: 'item1',
  //     description: 'Item 1 Description',
  //     quantity: '1',
  //     price: '10',
  //   },
  // ];

  // const merchant: Fawry.MerchantInfo = {
  //   merchantCode: '770000016144',
  //   merchantSecretCode: '178a5865-632c-4366-9669-eee601b62a6f',
  //   merchantRefNum: uuid.v4().toString(),
  // };

  // const customer: Fawry.CustomerInfo = {
  //   customerName: userData?.user_name,
  //   customerMobile: userData?.mobile,
  //   customerEmail: userData?.email,
  //   customerProfileId: userData?.id,
  // };

  // const fawryConfig: Fawry.FawryLaunchModel = {
  //   baseUrl: 'https://atfawry.fawrystaging.com/',
  //   lang: Fawry.FawryLanguages.ENGLISH,
  //   signature: '',
  //   allow3DPayment: true,
  //   skipReceipt: false,
  //   skipLogin: true,
  //   payWithCardToken: true,
  //   authCaptureMode: false,
  //   allowVoucher: true,
  //   items: cartItems,
  //   merchantInfo: merchant,
  //   customerInfo: customer,
  // };

  // // Define event listeners for payment and card manager events
  // const eventListeners = [
  //   {
  //     eventName: Fawry.FawryCallbacks.FAWRY_EVENT_PAYMENT_COMPLETED,
  //     listener: (data: any) =>
  //       //console.log(
  //         'Fawry.FawryCallbacks',
  //         Fawry.FawryCallbacks.FAWRY_EVENT_PAYMENT_COMPLETED,
  //         data,
  //       ),
  //   },
  //   {
  //     eventName: Fawry.FawryCallbacks.FAWRY_EVENT_ON_SUCCESS,
  //     listener: (data: any) => {
  //       //console.log(
  //         'Fawry.FawryCallbacks',
  //         Fawry.FawryCallbacks.FAWRY_EVENT_ON_SUCCESS,
  //         data,
  //       );
  //       add_booking();
  //     },
  //   },
  //   {
  //     eventName: Fawry.FawryCallbacks.FAWRY_EVENT_ON_FAIL,
  //     listener: (error: any) =>
  //       //console.log(
  //         'Fawry.FawryCallbacks',
  //         Fawry.FawryCallbacks.FAWRY_EVENT_ON_FAIL,
  //         error,
  //       ),
  //   },
  //   {
  //     eventName: Fawry.FawryCallbacks.FAWRY_EVENT_CardManager_FAIL,
  //     listener: (error: any) =>
  //       //console.log(
  //         'Fawry.FawryCallbacks',
  //         Fawry.FawryCallbacks.FAWRY_EVENT_CardManager_FAIL,
  //         error,
  //       ),
  //   },
  // ];

  // // Attach event listeners
  // const attachEventListeners = () =>
  //   eventListeners.forEach(({eventName, listener}) =>
  //     Fawry.FawryCallbacks.FawryEmitter.addListener(eventName, listener),
  //   );

  // // Detach event listeners when the component unmounts
  // const detachEventListeners = () =>
  //   eventListeners.forEach(({eventName}) =>
  //     Fawry.FawryCallbacks.FawryEmitter.removeAllListeners(eventName),
  //   );

  // useEffect(() => {
  //   attachEventListeners();
  //   return detachEventListeners;
  // }, []);

  function generateRandomString() {
    const length = 10;
    let result = '';
    const characters = '3T079ALF901';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  const randomString = generateRandomString();

  const currency =
    countryId == '4'
      ? 'inr'
      : countryId == '9'
      ? 'nok'
      : countryId == '10'
      ? 'egy'
      : countryId == '11' && 'sar';

  // --->>> PAYMENT BY GOOGLE PAY <<<---

  const requestData = {
    cardPaymentMethod: {
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        // stripe (see Example):
        gateway: 'stripe',
        gatewayMerchantId: 'BCR2DN4TRKYLFSLH',
        stripe: {
          publishableKey:
            'pk_live_51MY68nKcyP8J3Gsb9BcoQzFyD2TZMOQ7irrzgm3IHbwJQ20GmhR5uQpLVXoWZrP2MrTM1ubsbjX5m4XGaMGB9huK00kYoCMp66',
          version: '2018-11-08',
        },
      },
      allowedCardNetworks,
      allowedCardAuthMethods,
    },
    transaction: {
      totalPrice: '1',
      totalPriceStatus: 'FINAL',
      currencyCode: 'nok',
      testEnv: false,
    },
    merchantName: 'Example Merchant',
  };
  useEffect(() => {
    (async function () {
      if (!(await isPlatformPaySupported({googlePay: {testEnv: false}}))) {
        Alert.alert('Google Pay is not supported.');
        return;
      }
    })();
  }, []);

  const payWithGooglePay = option => {
    // alert(JSON.stringify('clientSecret'));

    const body = new FormData();
    body.append('amount', LastAmountWithCoupan * 100);
    body.append('currency', 'nok');
    //console.log(body);

    setLoading(true);
    post_api('generateIntentToken', body).then(v => {
      // alert(JSON.stringify(v?.client_secret));
      if (v.id != undefined) {
        PaymentWithGoogle(v?.client_secret);
      }
      setLoading(false);
    });
  };

  const PaymentWithGoogle = async clientSecret => {
    // alert(JSON.stringify(clientSecret));
    // return;

    const {error} = await confirmPlatformPayPayment(clientSecret, {
      googlePay: {
        testEnv: false,
        merchantName: 'My merchant name',
        merchantCountryCode: 'NO',
        currencyCode: 'nok',
        billingAddressConfig: {
          format: PlatformPay.BillingAddressFormat.Full,
          isPhoneNumberRequired: false,
          isRequired: false,
        },
      },
    });

    if (error) {
      showError(error.code, error.message);
      // Update UI to prompt user to retry payment (and possibly another payment method)
      return;
    }
    showSuccess('Success', localizationStrings?.msg_payment_confirmed);
    add_booking(clientSecret);
  };

  // --->>> PAYMENT BY CARD <<<---
  async function get_token() {
    try {
      setLoading(true);
      const url = baseUrl + 'get_token';

      //console.log(url);

      const body = new FormData();
      body.append('card_number', CardDetails?.card_num);
      body.append('expiry_month', CardDetails?.card_exp?.split('/')[0]);
      body.append('expiry_year', CardDetails?.card_exp?.split('/')[1]);
      body.append('cvc_code', CardDetails?.card_cvv);
      // alert(JSON.stringify(body));
      //console.log('Toke____Data', body);
      // return;
      const res = await fetch(url, {
        method: 'POST',
        body: body,
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      // //console.log(res);
      const rslt = await res.json();
      //console.log(rslt);

      if (rslt.status == '1') {
        return rslt.result;
      } else {
        ShowToast(rslt.result || rslt.message || 'Unknown error', 'error');
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      // ShowToast('An error occured.');
      ShowToast('An error occured.', 'error');

      //console.log(e);
    }
  }

  async function Payment_access(token) {
    // setLoading(true);
    const url = baseUrl + 'stripe_payment';
    //console.log(url);

    const body = new FormData();
    body.append('user_id', userData?.id);
    body.append('payment_method', 'Card');
    body.append('amount', LastAmountWithCoupan);
    body.append('currency', currency == 'inr' ? 'nok' : currency);
    body.append('token', token);

    //console.log(body);
    // return;
    const res = await fetch(url, {
      method: 'POST',
      body: body,
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    // //console.log(res);
    const rslt = await res.json();
    // //console.log("===============",rslt);

    if (rslt.status == '1') {
      return rslt;
    } else {
      ShowToast(rslt.result || rslt.message || 'Unknown error', 'error');
      return rslt;
    }
    setLoading(false);
  }

  const payment_through_Card = async item => {
    try {
      setLoading(true);
      const token = await get_token();
      if (!token) {
        ShowToast('invalid card details', 'error');
        setLoading(false);
        return;
      }
      // alert(JSON.stringify(token))
      // return
      const data = await Payment_access(token);
      setLoading(false);
      // alert(JSON.stringify(data.transaction_id));
      if (data.status == '1') {
        showSuccess('Payment successfully.');
        add_booking(data.transaction_id);
        setTransaction_id(data.transaction_id);
      }
    } catch (error) {
      setLoading(false);
      // //console.log('===============',error);
      // alert(error.message.toString(), 'error');
    }
  };
  // --->>> PAYMENT BY CARD REUND <<<---
  async function Refund_Payment_access() {
    // setLoading(true);
    const url = baseUrl + 'get_refund_stripe_payment';
    //console.log(url);

    const body = new FormData();
    body.append('transaction_id', transaction_id_);
    body.append('amount', LastAmountWithCoupan);

    // alert(JSON.stringify(body));
    // return;
    const res = await fetch(url, {
      method: 'POST',
      body: body,
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    // //console.log(res);
    const rslt = await res.json();
    // //console.log("===============",rslt);

    if (rslt.status == '1') {
      return rslt;
    } else {
      ShowToast(rslt.result || rslt.message || 'Unknown error', 'error');
      return rslt;
    }
    setLoading(false);
  }

  // --->>> PAYMENT BY OPAY <<<---
  const payWith_OPay = async () => {
    // navigation.navigate('PaymentWebview', {
    //   url: 'https://sandboxcashier.opaycheckout.com/bankInfo?payToken=eyJhbGciOiJIUzUxMiJ9.eyJjb3VudHJ5IjoiRUciLCJwYXlObyI6IjIzMDkyNTUwODE4MTA5OTA2MjkyMyIsInN1YiI6IjI4MTgyMzA5MTM2MDAzNyIsIm9yZGVyTm8iOiIyMzA5MjUxNDgxODEwOTkwNjA3MDkiLCJvcmRlckN1cnJlbmN5IjoiRUdQIiwicGF5TWV0aG9kIjoiQmFua0NhcmQiLCJzZXNzaW9uSWQiOiIyMzA5MjUxNDgxODEwOTkwNjA3MDkiLCJzaWxlbmNlIjoiWSIsImV4cCI6MTY5NTYyNjMzMH0.Z3i3aiq_hDAee_FabIvDBIsC1yA0PQH_mJ86NT8EJLEj4SxjvxRgulhAC8GXTrO1vieSe3MST7ruT9GmmYEa8g&session=230925148181099060709',
    //   visible_: setVisible,
    //   user_id: userId,
    //   picuplocation: add1,
    //   picuplat: lat1,
    //   pickuplon: lon1,
    //   dropofflocation: Drop_address,
    //   droplat: drop_lat,
    //   droplon: drop_lon,
    //   car_type_id: selected,
    //   end_time: moment(date1).format('YYYY-MM-DD hh:mm:ss'),
    //   amount: LastAmountWithCoupan,
    //   vat: charge_vat?.vat,
    //   payment_type: paymentMethod,
    //   distance: distance,
    //   distance_time: time,
    //   timezone: 'asia/kolkata',
    //   apply_code:
    //     SelectedCoupan == ''
    //       ? SelectedCoupan
    //       : SelectedCoupan?.coupon_code || '',
    //   promo_id:
    //     SelectedCoupan == SelectedCoupan ? '' : SelectedCoupan?.id || '',
    //   promo_discount_amount: Discount,
    //   transaction_id: rslt?.data?.reference,
    //   start_time: moment(BookingType == 'later' ? date : new Date()).format(
    //     'YYYY-MM-DD hh:mm:ss',
    //   ),
    //   toll_tax:
    //     TollData?.tolls != undefined
    //       ? TollData?.tolls[0]?.fares[0]?.convertedPrice?.value
    //       : 0,
    //   req_datetime: moment(BookingType == 'later' ? date : new Date()).format(
    //     'YYYY-MM-DD hh:mm:ss',
    //   ),
    // });
    // return;
    try {
      // setLoading(true);
      const url =
        'https://api.opaycheckout.com/api/v1/international/cashier/create';

      const body = {
        amount: {
          currency: 'EGP',
          total: parseFloat(LastAmountWithCoupan + '00'),
        },

        callbackUrl: 'https://3tdrive.com/',
        country: 'EG',
        product: {
          description: 'description',
          name: 'name',
        },
        reference: randomString.toString(),
        payMethod: 'BankCard',
        returnUrl: 'https://3tdrive.com/',
      };

      //console.log(body);
      const res = await fetch(url, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          MerchantId: '281823091304127',
          Authorization: 'Bearer OPAYPUB16946278056470.016889235515118783',
        },
        body: JSON.stringify(body),
      });
      // //console.log(res);
      const rslt = await res.json();
      //console.log(rslt);
      // alert(JSON.stringify(rslt?.message));
      // return;

      if (rslt.message == 'SUCCESSFUL') {
        // Linking.openURL(rslt?.data?.cashierUrl);
        navigation.navigate('PaymentWebview', {
          url: rslt?.data?.cashierUrl,
          visible_: setVisible,
          user_id: userId,
          picuplocation: add1,
          picuplat: lat1,
          pickuplon: lon1,
          dropofflocation: Drop_address,
          droplat: drop_lat,
          droplon: drop_lon,
          car_type_id: selected,
          end_time: moment(date1).format('YYYY-MM-DD hh:mm:ss'),
          amount: LastAmountWithCoupan,
          vat: charge_vat?.vat,
          payment_type: paymentMethod,
          distance: distance,
          distance_time: time,
          timezone: 'asia/kolkata',
          BookingType_: BookingType,
          booking_later_time:
            OnlyTime[0] +
            ' ' +
            moment(OnlyTime[1], 'h:mm:ss A').format('HH:mm:ss'),
          apply_code:
            SelectedCoupan == ''
              ? SelectedCoupan
              : SelectedCoupan?.coupon_code || '',
          promo_id:
            SelectedCoupan == SelectedCoupan ? '' : SelectedCoupan?.id || '',
          promo_discount_amount: Discount,
          transaction_id: randomString,
          start_time: moment(BookingType == 'later' ? date : new Date()).format(
            'YYYY-MM-DD hh:mm:ss',
          ),
          toll_tax:
            TollData?.tolls != undefined
              ? TollData?.tolls[0]?.fares[0]?.convertedPrice?.value
              : 0,
          req_datetime: moment(
            BookingType == 'later' ? date : new Date(),
          ).format('YYYY-MM-DD hh:mm:ss'),
        });
      } else {
        ShowToast(rslt.message || 'Unknown error', 'error');
      }
      // setLoading(false);
    } catch (e) {
      // setLoading(false);
      // alert(JSON.stringify(e));
      ShowToast(localizationStrings?.msg_Unknown_error, 'error');
      //console.log(e);
    }
  };

  const GetDriverAvailablity = () => {
    // payWithGooglePay(requestData);
    // return;
    const body = new FormData();
    body.append('picuplat', lat1);
    body.append('pickuplon', lon1);
    body.append('car_type_id', selected);
    //console.log(body);

    post_api('check_available_driver', body).then(v => {
      if (v.status == 1) {
        if (userData?.payment_option == 'OPay') {
          payWith_OPay();
        }
        if (userData?.payment_option == 'Fawry') {
          Fawry.startPayment(fawryConfig);
        }
        if (userData?.payment_option == 'Card') {
          // payWith_Stripe();
          payment_through_Card();
        }
        if (userData?.payment_option == 'Google Pay') {
          payWithGooglePay();
        }
        // add_booking();
      } else {
        showError(localizationStrings?.Driver_not_found);
      }
    });
  };

  useEffect(() => {
    if (address_?.address != undefined) {
      fetchDestinationCords2(
        parseFloat(address_?.lat),
        parseFloat(address_?.lon),
        address_?.address,
      );
    }
  }, [address_]);

  const fetchDestinationCords1 = (lat, lng, address) => {
    getCordinates1({lat, lng, address});
  };

  const fetchDestinationCords2 = (lat, lng, address) => {
    // //console.log('fetchDestinationCords2fetchDestinationCords2fetchDestinationCords2',lat, lng, address);
    // if (destinationAddress) {
    setState({
      ...state,
      destinationAddress: address,
      destinationCords: {
        latitude: lat,
        longitude: lng,
      },
    });
    // }
    getCordinates2({lat, lng, address});
  };

  var now = BookingType == 'later' ? date : new Date();
  var then = moment(now).subtract(2, 'minutes').toDate();
  const OnlyTime = moment(then).format('YYYY-MM-DD- hh:mm:ss A')?.split('- ');

  // alert(moment(then).format('YYYY-MM-DD hh:mm:ss'));
  // alert(moment(then).format('YYYY-MM-DD- hh:mm:ss A')?.split('- ')[1]);
  // alert(OnlyTime[0]+' '+moment(OnlyTime[1], "h:mm:ss A").format("HH:mm:ss"));
  // alert(moment(OnlyTime[1], "h:mm:ss A").format("HH:mm:ss"));

  const Update_Payment = () => {
    // alert();
    const body = new FormData();
    body.append('user_id', userId);
    body.append(
      'payment_option',
      paymentMethod?.id == undefined ? 'Cash' : paymentMethod?.id,
    );
    //console.log(body);

    setLoading(true);
    post_api('add_payment_option', body).then(v => {
      if (v.status == 1) {
        // console.log(
        //   'add_payment_optionadd_payment_optionadd_payment_option',
        //   v,
        // );
        get_Profile(userId);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    // store.dispatch({type: BOOKING_LATER_DATE, payload: ""});

    Update_Payment();
    setVisible(false);
  }, [paymentMethod]);

  const country =
    countryId == '4'
      ? localizationStrings.INR
      : countryId == '9'
      ? localizationStrings.NOK
      : countryId == '10'
      ? localizationStrings.EGP
      : countryId == '11' && localizationStrings.SAR;

  const add_booking = async transaction_id => {
    // setLoading(true);
    const body = new FormData();
    body.append('user_id', userId);
    body.append('picuplocation', add1);
    body.append('picuplat', lat1);
    body.append('pickuplon', lon1);
    body.append('dropofflocation', Drop_address);
    body.append('droplat', drop_lat);
    body.append('droplon', drop_lon);
    body.append('car_type_id', selected);
    body.append('booktype', BookingType);
    body.append(
      'start_time',
      moment(BookingType == 'later' ? date : new Date()).format(
        'YYYY-MM-DD hh:mm:ss',
      ),
    );
    body.append(
      'booking_later_time',
      OnlyTime[0] + ' ' + moment(OnlyTime[1], 'h:mm:ss A').format('HH:mm:ss'),
    );
    body.append('end_time', moment(date1).format('YYYY-MM-DD hh:mm:ss'));
    body.append(
      'current_datetime',
      moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
    );
    body.append('amount', LastAmountWithCoupan);
    body.append('vat', charge_vat?.vat);
    body.append(
      'toll_tax',
      TollData?.tolls != undefined
        ? TollData?.tolls[0]?.fares[0]?.convertedPrice?.value
        : 0,
    );
    body.append('payment_type', userData?.payment_option);
    body.append('distance', distance);
    body.append('distance_time', time);
    body.append('timezone', 'asia/kolkata');
    body.append(
      'apply_code',
      SelectedCoupan == '' ? SelectedCoupan : SelectedCoupan?.coupon_code || '',
    );
    body.append(
      'promo_id',
      SelectedCoupan == SelectedCoupan ? '' : SelectedCoupan?.id || '',
    );
    body.append('promo_discount_amount', Discount || 0);
    body.append('transaction_id', transaction_id);
    body.append('order_id', transaction_id);

    body.append(
      'req_datetime',
      moment(BookingType == 'later' ? date : new Date()).format(
        'YYYY-MM-DD hh:mm:ss',
      ),
    );
    //console.log('_____________________', JSON.stringify(body));
    // return;
    post_api('addBookingRequest', body)
      .then(v => {
        // return;
        setLoading(false);
        if (v.status == 1) {
          if (BookingType == 'now') {
            setVisible(true);
          }
          //console.log('v.result.id', v.result.id);
          store.dispatch({type: B_ID, payload: v.result.id});
          showSuccess(localizationStrings?.msg_Booking_Created);
          return;
        }
        if (v.status == 0) {
          //console.log('v.result.id', v.result.id);
          store.dispatch({type: B_ID, payload: v.result.id});
          showError(localizationStrings?.Driver_not_found);
          return;
        }
        showError(v.message);
      })
      .catch(e => console.log('-------', e));
  };

  const CheckoutButton = () => {
    return (
      <View style={styles.btnView}>
        <Image source={ImagePath.car} style={styles.car} />
      </View>
    );
  };

  useEffect(() => {
    // store.dispatch({
    //   type: ADDRESS,
    //   payload: {},
    // });

    const ShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );
    const HideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );

    return () => {
      HideListener.remove();
      ShowListener.remove();
    };
  }, []);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     setBook('2');
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  const fadeIn = {from: {height: 0}, to: {height: book != '0' ? 580 : 230}};
  const fadeOut = {from: {height: book != '0' ? 580 : 230}, to: {height: 40}};

  return (
    <Animatable.View
      duration={700}
      animation={MarkerDraged == false ? fadeIn : fadeOut}
      style={[styles.container, {bottom: 0}]}>
      {/* <View style={[styles.container, {bottom: MarkerDraged == true ? -190 : 0}]}> */}
      <TouchableOpacity
        style={{paddingBottom: 5}}
        activeOpacity={1}
        onPress={() => setMarkerDraged(!MarkerDraged)}>
        <View
          style={{
            height: 5,
            width: 100,
            backgroundColor: '#36342F',
            alignSelf: 'center',
            marginTop: 15,
            borderRadius: 10,
          }}
        />
      </TouchableOpacity>
      <ScrollView keyboardShouldPersistTaps="handled" style={{flex: 1}}>
        <View style={styles.searchContainer}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image source={ImagePath.pin} style={styles.pin} />
            <GradientLine
              colors={['#FFDC0000', '#FFDC00']}
              height={22}
              width={1}
              marginVertical={7}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.circle} />
              <View style={styles.triangle} />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              paddingLeft: 10,
            }}>
            <AddressPickup
              placheholderText={
                add1 ? add1 : localizationStrings.Departure_Address
              }
              fetchAddress={fetchDestinationCords1}
              editable={book == '0' ? true : false}
            />
            <HoriLine mv={1} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AddressPickup
                // placheholderText={Drop_address}
                placheholderText={
                  Drop_address != undefined
                    ? Drop_address
                    : localizationStrings.Destination_address
                }
                fetchAddress={fetchDestinationCords2}
                editable={book == '0' ? true : false}
              />
            </View>
          </View>
        </View>

        {keyboardVisible == true && (
          <TouchableOpacity
            onPress={() => navigation.navigate('SavePalace')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 20,
              backgroundColor: '#25231F',
              borderColor: '#36342F',
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderRadius: 7,
              marginBottom: 15,
            }}>
            <Image
              source={require('../assets/icons/using/pinstar.png')}
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                tintColor: theme.colors.yellow,
              }}
            />
            <Text style={{color: '#cfcfcf', marginLeft: 10, fontWeight: '600'}}>
              {localizationStrings.Save_Place}
            </Text>
          </TouchableOpacity>
        )}

        {keyboardVisible || book == '2' || book == '1' || (
          <View style={styles.btnContainer}>
            <CustomButton_2
              containerStyle={{zIndex: 0}}
              title={localizationStrings.Book_Later}
              color={theme.colors.yellow}
              bgColor={theme.colors.yellow + '33'}
              flex={1}
              mh={12}
              onPress={onBooklater_press}
            />
            <CustomButton_2
              containerStyle={{zIndex: 0}}
              title={localizationStrings.Book_Now}
              color={theme.colors.ButtonText}
              bgColor={theme.colors.yellow}
              flex={1}
              mh={12}
              onPress={onBookNow_press}
            />
          </View>
        )}

        {book == '1' ? (
          <View style={{paddingHorizontal: 16}}>
            <TimeText
              title={localizationStrings.Departure}
              date={moment(date).format('Do MMM' + ' @' + 'hh:mm a')}
            />
            <DatePicker
              theme="dark"
              style={{backgroundColor: '#171614', alignSelf: 'center'}}
              fadeToColor="#171614"
              minimumDate={new Date()}
              dividerHeight={1}
              date={date}
              // modal
              onDateChange={v => {
                //console.log('v date - ');
                setDate(v);
                setDate1(v);
                // if (booking_Later_Date == '') {
                // store.dispatch({type: BOOKING_LATER_DATE, payload: v});
                // alert();
                // setDate('2023-10-5 17:30:00');
                //   // //console.log(v);
                // }
              }}
              // onConfirm={date => {
              //   setOpenPicker(false);
              //   setDate(date);
              //   setBook('2');
              // }}
            />

            {/* <DatePicker
              open={true}
              theme="dark"
              style={{backgroundColor: '#171614', alignSelf: 'center'}}
              fadeToColor="#171614"
              minimumDate={new Date()}
              dividerHeight={1}
              modal
              date={date}
              onConfirm={date => {
                setOpenPicker(false);
                setDate(date);
                // setBook('2');
              }}
            /> */}
            <CustomButton_2
              onPress={() => {
                setOpenPicker(true);
                setBook('2');
              }}
              title={localizationStrings.Select_date_Time}
              bgColor="#FFDC00"
              color={'#000'}
              fontSize={16}
              mv={15}
            />
          </View>
        ) : (
          <View />
        )}

        {book == '2' && (
          <View>
            <View style={{flexDirection: 'row', marginHorizontal: 16}}>
              <TimeText
                title={localizationStrings.Departure}
                date={moment(BookingType == 'later' ? date : new Date()).format(
                  'Do MMM' + ' @' + 'hh:mm a',
                )}
              />
              <TimeText
                onPress={() =>
                  Get_timeBy_LatLng(lat1, lon1, drop_lat, drop_lon)
                }
                title={localizationStrings.Estimated_arrival}
                date={moment(estimatedTime).format('Do MMM' + ' @' + 'hh:mm a')}
              />
            </View>

            <HoriLine />
            <CarDeatail
              selected={selected}
              setSelected={setSelected}
              setCar_Details={setCar_Details}
              setCharge={setCharge}
              setCharge_vat={setCharge_vat}
              date={BookingType == 'later' ? date : new Date()}
              BookingType={BookingType}
              Car_I_Press={() => setShow_CardDetails(true)}
            />
            <View style={[styles.rowContainer, {marginTop: 30}]}>
              <Image
                source={require('../assets/icons/using/Promo.png')}
                style={{
                  height: 25,
                  width: 35,
                  resizeMode: 'contain',
                  tintColor: theme.colors.yellow,
                }}
              />
              <Text
                style={[styles.text14, {marginLeft: 10, textAlign: 'left'}]}>
                {SelectedCoupan != ''
                  ? SelectedCoupan?.coupon_code
                  : localizationStrings.Coupan_Code}
              </Text>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => setCoupanVisible(true)}>
                <Text style={styles.text14500}>
                  {SelectedCoupan != '' ? 'Change' : localizationStrings.Apply}
                </Text>
                <Image source={ImagePath.next} style={styles.next} />
              </TouchableOpacity>
            </View>

            <View style={[styles.rowContainer, {marginTop: 30}]}>
              <Image
                source={
                  userData?.payment_option == 'OPay'
                    ? require('../assets/icons/using/Opay.jpeg')
                    : userData?.payment_option == 'Card'
                    ? require('../assets/icons/using/card.png')
                    : userData?.payment_option == 'Apple Pay'
                    ? require('../assets/icons/using/apple_white.png')
                    : userData?.payment_option == 'Google Pay'
                    ? require('../assets/icons/using/GooglePay.png')
                    : userData?.payment_option == 'Pay_in_Car'
                    ? require('../assets/icons/using/CardMachine_EG.png')
                    : userData?.payment_option == 'Fawry'
                    ? require('../assets/icons/using/Fawry.png')
                    : require('../assets/icons/using/CashMachine.png')
                }
                style={{
                  height: 20,
                  width: 35,
                  resizeMode: 'contain',
                  borderWidth: 1,
                }}
              />
              <Text style={[styles.text14, {marginLeft: 10}]}>
                {localizationStrings?.Pay_Tyep + ' '}
                {userData?.payment_option == 'OPay'
                  ? localizationStrings?.Opay
                  : userData?.payment_option == 'Card'
                  ? localizationStrings?.Visa_Card
                  : userData?.payment_option == 'Apple Pay'
                  ? 'Apple Pay'
                  : userData?.payment_option == 'Google Pay'
                  ? localizationStrings.Google_Pay
                  : userData?.payment_option == 'Pay_in_Car'
                  ? localizationStrings.PayInCar
                  : userData?.payment_option == 'Fawry'
                  ? localizationStrings.Fawry
                  : userData?.payment_option == 'Cash' &&
                    localizationStrings?.Cash}
              </Text>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => setPayment(true)}>
                <Text style={styles.text14500}>
                  {localizationStrings.Change}
                </Text>
                <Image source={ImagePath.next} style={styles.next} />
              </TouchableOpacity>
            </View>
            <HoriLine />

            <TouchableOpacity
              onPress={() => setShowPricing(true)}
              style={styles.rowContainer}>
              <Text style={styles.text14}>
                {localizationStrings.Route_Price}
              </Text>
              {
                <Text style={styles.text14700}>
                  {PaymentAmount + ' ' + country}
                </Text>
              }
            </TouchableOpacity>

            <View style={{height: 5}} />
            {SelectedCoupan != '' && (
              <View style={styles.rowContainer}>
                <Text style={styles.text14}>
                  {localizationStrings.Coupan_Discount}
                </Text>
                {
                  <Text style={styles.text14700}>
                    {Discount + ' ' + country}
                  </Text>
                }
              </View>
            )}

            <View style={{height: 5}} />

            {SelectedCoupan != '' && (
              <View style={styles.rowContainer}>
                <Text style={styles.text14}>
                  {localizationStrings.Total_Amount}{' '}
                </Text>
                {
                  <Text style={styles.text14700}>
                    {LastAmountWithCoupan + ' ' + country}
                  </Text>
                }
              </View>
            )}
            <View style={{height: 5}} />
            <SwipeButton
              containerStyles={{
                marginHorizontal: 16,
                height: 40,
                borderRadius: 30,
                marginVertical: 10,
              }}
              height={40}
              width={Dimensions.get('window').width - 32}
              onSwipeSuccess={() => {
                if (userData?.payment_option == undefined) {
                  showError('Please select payment method');
                  return;
                }
                if (userData?.payment_option == 'OPay') {
                  GetDriverAvailablity();
                }
                if (userData?.payment_option == 'Fawry') {
                  GetDriverAvailablity();
                }
                if (userData?.payment_option == 'Card') {
                  GetDriverAvailablity();
                }
                if (userData?.payment_option == 'Google Pay') {
                  GetDriverAvailablity();
                }
                if (userData?.payment_option == 'Pay_in_Car') {
                  add_booking(randomString);
                }
                if (userData?.payment_option == 'Cash') {
                  add_booking(randomString);
                }

                // add_booking();
              }}
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
              shouldResetAfterSuccess={true}
            />
            <AskNow isOpen={ask} setIsOpen={setAsk} />
            <SearchingDriverPopup
              visible={tripData?.booktype == 'later' ? displaySearch : visible}
              setVisible={
                tripData?.booktype == 'later' ? setDisplaySearch : setVisible
              }
              estimate={moment(add_time(new Date(), time)).format('mm ')}
              Refund_Payment_access={Refund_Payment_access}
              // estimate={moment(add_time(date, time)).format(
              //   'Do MMM' + ' @' + 'hh:mm a',
              // )}
            />
            <PaymentOptions
              isOpen={payment}
              setIsOpen={setPayment}
              setSelected={setPaymentMethod}
              selected={paymentMethod}
              setCardDetails={setCardDetails}
              price={LastAmountWithCoupan}
            />
            <CarDetails
              Type={'Car'}
              isOpen={Show_CardDetails}
              setIsOpen={setShow_CardDetails}
              CarData={Car_Details}
            />
            <PricingDetails
              Type={'Price'}
              isOpen={ShowPricing}
              setIsOpen={setShowPricing}
              basePrice={parseFloat(Car_Details?.charge || 0)}
              per_km={parseFloat(Car_Details?.per_km || 0)}
              per_min={parseFloat(Car_Details?.ride_time_charge_permin || 0)}
              toll={
                TollData?.tolls != undefined
                  ? TollData?.tolls[0]?.fares[0]?.convertedPrice?.value
                  : 0
              }
              coupan={Discount || 0}
              Estimated={LastAmountWithCoupan || 0}
              distance={distance || 0}
              time_Taken={parseFloat(time) || 0}
            />
            <CoupanCode
              isOpen={CoupanVisible}
              setIsOpen={setCoupanVisible}
              setSelected={setCoupanVisible}
              selected={CoupanData}
              setCardDetails={setSelectedCoupan}
            />
          </View>
        )}
      </ScrollView>
    </Animatable.View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.ButtonText,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'absolute',
    width: '100%',
  },
  searchContainer: {
    borderWidth: 1,
    backgroundColor: '#25231F',
    borderColor: '#36342F',
    margin: 16,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
  },
  pin: {
    height: 16,
    width: 16,
    resizeMode: 'contain',
    tintColor: theme.colors.lightGray,
  },
  circle: {
    height: 12,
    width: 12,
    borderRadius: 20,
    backgroundColor: theme.colors.yellow,
    marginLeft: 8,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 5,
    borderRightWidth: 0,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#FFDC00',
    marginLeft: 3,
  },
  btnContainer: {
    flexDirection: 'row',
    marginHorizontal: 4,
    marginBottom: 20,
    zIndex: 0,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  text14: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Jost-Regular',
    flex: 1,
    textAlign: 'left',
  },
  text14500: {
    fontSize: 14,
    color: '#FFDC00',
    fontFamily: 'Jost-Medium',
    marginRight: 10,
  },
  text14700: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Jost-Bold',
    marginRight: 10,
  },
  next: {height: 14, width: 14, resizeMode: 'contain'},
  btnView: {
    // width: 60,
    // height: 35,
    // backgroundColor: '#FFDC00',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  car: {
    height: 18,
    width: 40,
    resizeMode: 'contain',
    tintColor: '#000000',
  },
  container_: {
    backgroundColor: '#25231F',
    borderWidth: 1,
    borderColor: '#36342F',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Jost-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    marginHorizontal: 15,
    lineHeight: 23,
    marginBottom: 10,
  },
  title1: {
    fontSize: 18,
    fontFamily: 'Jost-Medium',
    color: '#FFFFFF',
    textAlign: 'center',
    marginHorizontal: 15,
    lineHeight: 23,
    marginTop: 10,
  },
  number: {
    fontSize: 12,
    fontFamily: 'Jost-Regular',
    color: '#BAB6AE',
    backgroundColor: '#36342F',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    alignSelf: 'center',
    marginVertical: 5,
  },
  img: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    backgroundColor: '#36342F',
    borderRadius: 40,
  },
});
export default ChooseLocation;
