import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Image,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {theme} from '../utils/theme';
import Button from '../components/Button';
import {TouchableOpacity} from 'react-native';
import Statusbar from './Statusbar';
import Header from './Header';
import {WebView} from 'react-native-webview';
import {post_api, showError, showSuccess} from '../utils/Constants';
import store from '../redux/store';
import {B_ID} from '../redux/ActionTypes';
import localizationStrings from '../utils/Localization';

const WebViewScreen = () => {
  const {params} = useRoute();
  const navigation = useNavigation();
  const [splash_loading, setsplash_loading] = useState(false);
  const [failed, setfailed] = useState(false);
  const [visible, setvisible] = useState(true);
  const [navState, setnavState] = useState({});
  const wvRef = useRef();
  const dimensions = useWindowDimensions();
  const [loading, setLoading] = useState(false);

  // alert(JSON.stringify(loading));
  // console.log(
  //   'data',
  //   params?.user_id,
  //   params?.picuplocation,
  //   params?.picuplat,
  //   params?.pickuplon,
  //   params?.dropofflocation,
  //   params?.droplat,
  //   params?.droplon,
  //   params?.car_type_id,
  //   params?.start_time,
  //   params?.end_time,
  //   params?.amount,
  //   params?.vat,
  //   params?.toll_tax,
  //   params?.payment_type,
  //   params?.distance,
  //   params?.distance_time,
  //   params?.timezone,
  //   params?.apply_code,
  //   params?.promo_id,
  //   params?.promo_discount_amount,
  //   params?.transaction_id,
  //   params?.req_datetime,
  // );

  useEffect(() => {
    setTimeout(() => {
      if (!splash_loading) {
        setsplash_loading(true);
      }
    }, 12000);
    backhandler = BackHandler.addEventListener('hardwareBackPress', () => {
      console.log('this.wvRef', wvRef.current);
      if (navState.canGoBack && wvRef.current) {
        // console.log(wvRef)
        wvRef.current.goBack();
        return true;
      }

      // alert
      return false;
    });
  }, []);

  const add_booking = async () => {
    setLoading(true);
    const body = new FormData();
    body.append('user_id', params?.user_id);
    body.append('picuplocation', params?.picuplocation);
    body.append('picuplat', params?.picuplat);
    body.append('pickuplon', params?.pickuplon);
    body.append('dropofflocation', params?.dropofflocation);
    body.append('droplat', params?.droplat);
    body.append('droplon', params?.droplon);
    body.append('car_type_id', params?.car_type_id);
    body.append('start_time', params?.start_time);
    body.append('end_time', params?.end_time);
    body.append('amount', params?.amount);
    body.append('vat', params?.vat);
    body.append('toll_tax', params?.toll_tax);
    body.append('payment_type', params?.payment_type);
    body.append('distance', params?.distance);
    body.append('distance_time', params?.distance_time);
    body.append('timezone', params?.timezone);
    body.append(
      'current_datetime',
      moment(new Date()).format('YYYY-MM-DD hh:mm:s'),
    );

    body.append(
      'apply_code',
      params?.apply_code == '' ? '' : params?.apply_code?.coupon_code || '',
    );
    body.append(
      'promo_id',
      params?.promo_id == '' ? '' : params?.promo_id?.id || '',
    );
    body.append(
      'promo_discount_amount',
      params?.promo_discount_amount == null
        ? 0
        : params?.promo_discount_amount || 0,
    );
    body.append('transaction_id', params?.transaction_id);
    body.append('req_datetime', params?.req_datetime);

    console.log(JSON.stringify(body));
    // return;
    post_api('addBookingRequest', body)
      .then(v => {
        setLoading(false);
        if (v.status == 1) {
          console.log('v.result.id', v.result.id);
          navigation.goBack();
          setTimeout(() => {
            params?.visible_(true);
            store.dispatch({type: B_ID, payload: v.result.id});
            showSuccess(localizationStrings?.msg_Booking_Created);
          }, 1500);
          return;
        }
        if (v.status == 0) {
          console.log('v.result.id', v.result.id);
          store.dispatch({type: B_ID, payload: v.result.id});
          showError(localizationStrings?.Driver_not_found);
          return;
        }

        showError(v.message);
      })
      .catch(e => showError(e));
  };

  const onNavigationStateChange = navState => {
    console.log('WebView Response', navState);
    if (navState?.url?.split('result?status=')[1]?.slice(0, 7) == 'SUCCESS') {
      add_booking();
    }
    // setResponsee(navState);
  };

  useEffect(() => {
    backhandler.remove();
    // setLoading(false)
    // const url =
    //   'https://sandboxcashier.opaycheckout.com/result?status=SUCCESS&isSilence=Y&payToken=eyJhbGciOiJIUzUxMiJ9.eyJwYXlObyI6IjIzMDkyNTUwODE4MTA5OTA3MTc2NiIsImNvdW50cnkiOiJFRyIsInN1YiI6IjI4MTgyMzA5MTM2MDAzNyIsIm9yZGVyTm8iOiIyMzA5MjUxNDgxODEwOTkwNzAxNDgiLCJvcmRlckN1cnJlbmN5IjoiRUdQIiwicGF5TWV0aG9kIjoiQmFua0NhcmQiLCJzZXNzaW9uSWQiOiIyMzA5MjUxNDgxODEwOTkwNzAxNDgiLCJzaWxlbmNlIjoiWSIsImV4cCI6MTY5NTYzMDQ3N30.g_j48QGFiAUfnRDKTq9LC9xCLWZaIW9VrkhDBXLfaJlD6_Rt34gMjzvsih_4SbxwePuYih1bCUwdyxvQeGFptA&session=230925148181099070148';

    // alert(
    //   JSON.stringify(navState?.url?.split('result?status=')[1]?.slice(0, 7)),
    // );
  }, []);

  function DefaultScreen() {
    return (
      <View
        style={{
          // alignItems: 'center',
          flex: 1,
          backgroundColor: theme.colors.ButtonText,
          justifyContent: 'center',
        }}>
        <Statusbar
          backgroundColor={theme.colors.ButtonText}
          barStyle="light-content"
        />
        <Image
          source={require('../assets/icons/using/No_connection.png')}
          style={{
            height: 250,
            width: 250,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            color: theme.colors.Black,
            marginVertical: 15,
            // alignSelf: 'center',
            // marginHorizontal: 40,
            textAlign: 'center',
          }}>
          Oops, No Internet Connection
        </Text>
        <Text
          style={{
            fontSize: 13,
            // fontWeight: '700',
            color: 'gray',
            textAlign: 'center',
            marginHorizontal: 60,
          }}>
          Make sure wifi or cellular data is turned on and then try again.
        </Text>

        <TouchableOpacity
          onPress={() => {
            //  this.setState({ failed: false, splash_loading: true });
            setfailed(false);
            setsplash_loading(true);
          }}
          style={{
            marginTop: 70,
            borderRadius: 50,
            marginHorizontal: 20,
            // paddingVertical: 20,
            backgroundColor: '#d71921',
          }}>
          <TextFormatted
            style={{
              fontSize: 16,
              textAlign: 'center',
              margin: 5,
              color: '#ffffff',
              backgroundColor: 'transparent',
              fontWeight: '700',
              paddingVertical: 12,
            }}>
            TRY AGAIN
          </TextFormatted>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
      <Statusbar
        barStyle="light-content"
        backgroundColor={theme.colors.ButtonText}
      />
      <Header navigation={navigation} Headertext={'Payment'} />

      {failed ? (
        <DefaultScreen />
      ) : (
        <WebView
          source={{uri: params.url}}
          onNavigationStateChange={onNavigationStateChange}
          javaScriptEnabled
          setSupportMultipleWindows={false}
          ref={ref => {
            wvRef.current = ref;
          }}
          onLoadStart={() => setvisible(true)}
          onLoadEnd={() => {
            setvisible(false);
            setsplash_loading(true);
          }}
          style={{flex: 1}}
          allowsFullscreenVideo
          pullToRefreshEnabled
          onError={e => {
            console.warn(e.nativeEvent);
            setfailed(true);
          }}
          geolocationEnabled={true}
          scalesPageToFit={false}
          injectedJavaScriptBeforeContentLoaded={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);`}
          injectedJavaScript={`document.getElementsByClassName("elementor-search-form__container")[0].style="padding:10px 10px";`}
        />
      )}

      {loading && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: theme.colors.Black + '66',
            height: '100%',
            width: '100%',
          }}>
          <ActivityIndicator color={theme.colors.yellow} size="large" />
        </View>
      )}
    </View>
  );
};

export default WebViewScreen;
