import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {useSelector} from 'react-redux';
import AuthNavigation from './Auth';
import HomeNavigator from './Home';
import localizationStrings from '../utils/Localization';
import store from '../redux/store';
import {CITY, COUNTRY} from '../redux/ActionTypes';
import {
  getCurrentLocation,
  get_Profile,
  locationPermission,
  post_api,
  showError,
} from '../utils/Constants';
import {useEffect} from 'react';
import {useState} from 'react';
import {baseUrl} from '../utils/constance';
import GetStarted from '../screens/auth/GetStarted';
import Splash from '../screens/auth/Splash';

const Stack = createNativeStackNavigator();

function App() {
  const isLoggedIn = useSelector(state => state?.user?.login);
  const Language_Updated = useSelector(state => state?.user?.LangigaeUpdated);
  const {countryId, userId, cityId} = useSelector(state => state?.user);
  //console.log(isLoggedIn);
  const [LanguageUpdated, setLanguageUpdated] = useState(false);
  const [reload, setReload] = useState({});
  const [LocationData, setLocationData] = useState({});
  // alert(JSON.stringify(countryId))
  // //console.log('countryIdcountryIdcountryId',);

  const updateLang = val => {
    // //console.log('setLanguage=', val);
    localizationStrings.setLanguage(val);
    setReload({});
  };

  const country =
    countryId == '4'
      ? 'IN'
      : countryId == '9'
      ? 'NO'
      : countryId == '10'
      ? 'EGY'
      : countryId == '11' && 'SAR';

  const update_language = async () => {
    try {
      const url =
        baseUrl +
        'update_language?user_id=' +
        userId +
        '&language=' +
        localizationStrings.getLanguage() +
        '&country=' +
        country;
      // //console.log(url);
      const response = await fetch(url);
      const res = await response.json();
      // //console.log('update_languageupdate_languageupdate_language', res);
    } catch (error) {
      //console.log(error);
    }
  };

  const getLocation = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    setLanguageUpdated(false);
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const {latitude, longitude} = await getCurrentLocation();

      //console.log('latitude-longitude:', latitude, longitude);

      try {
        const url_NO =
          'https://api.opencagedata.com/geocode/v1/json?q=59.9139+10.7522&key=e9709f46c855447897dd6f78f2534dbe';

        const url_EGY =
          'https://api.opencagedata.com/geocode/v1/json?q=25.6950127+32.6182674&key=e9709f46c855447897dd6f78f2534dbe';

        const url =
          'https://api.opencagedata.com/geocode/v1/json?q=' +
          (latitude || 59.9139) +
          '+' +
          (longitude || 10.7522) +
          '&key=e9709f46c855447897dd6f78f2534dbe';

        const response = await fetch(url, {method: 'GET'});

        const res = await response.json();

        clearTimeout(timeoutId);
        //console.log('URL=', url);
        //console.log('country=', res?.results[0]?.components?.country);
        //console.log('city=', res?.results[0]?.components?.city);
        setLocationData(res?.results[0]?.components);
        // return;

        if (res?.results[0]?.components?.city != undefined) {
          if (res?.results[0]?.components?.city == 'New Cairo City') {
            store.dispatch({
              type: CITY,
              payload: 'Cairo',
            });
          }
          if (res?.results[0]?.components?.country == 'Egypt') {
            store.dispatch({
              type: CITY,
              payload: 'Cairo',
            });
          }
          if (res?.results[0]?.components?.country == 'Norway') {
            store.dispatch({
              type: CITY,
              payload: 'Oslo',
            });
          } else {
            store.dispatch({
              type: CITY,
              payload: res?.results[0]?.components?.city,
            });
          }
        } else {
          if (res?.results[0]?.components?.country == 'Norway') {
            store.dispatch({
              type: CITY,
              payload: 'Oslo',
            });
          }
        }
        // alert('dynamic');

        if (res?.results[0]?.components?.country == 'Norway') {
          store.dispatch({type: COUNTRY, payload: '9'});
          updateLang('Norwegian');
          //console.log('Norwegian');
        }
        if (res?.results[0]?.components?.country == 'Egypt') {
          store.dispatch({type: COUNTRY, payload: '10'});
          updateLang('Arabic');
          //console.log('Arabic');
        }
        if (res?.results[0]?.components?.country == 'Saudi Arabia') {
          store.dispatch({type: COUNTRY, payload: '10'});
          updateLang('Arabic');
          //console.log('Arabic');
        }
        if (res?.results[0]?.components?.country == 'India') {
          store.dispatch({type: COUNTRY, payload: '4'});
          updateLang('English');
          //console.log('English');
        }
        // alert(JSON.stringify(localizationStrings.getLanguage()));
        setLanguageUpdated(true);
      } catch (error) {
        //console.log('post njbn', error);
      }
    }
  };

  useEffect(() => {
    // setTimeout(() => {
    //   alert(localizationStrings?.getLanguage());
    //   setReload({});
    //   if (countryId == '') {
    //     alert('static');
    //     store.dispatch({type: COUNTRY, payload: '9'});
    //     updateLang('Norwegian');
    //     setLocationData({
    //       'ISO_3166-1_alpha-2': 'NO',
    //       'ISO_3166-1_alpha-3': 'NOR',
    //       'ISO_3166-2': ['NO-03'],
    //       _category: 'building',
    //       _type: 'building',
    //       city: 'Oslo',
    //       continent: 'Europe',
    //       country: 'Norway',
    //       country_code: 'no',
    //       house_number: '28B',
    //       municipality: 'Oslo',
    //       postal_city: 'Oslo',
    //       postcode: '0184',
    //       quarter: 'Vaterland',
    //       road: 'Storgata',
    //       suburb: 'Sentrum',
    //     });
    //   }
    // }, 10000);
    if (Language_Updated != true) {
      getLocation();

      setTimeout(() => {
        getLocation();
      }, 1500);
    } else {
      if (countryId == '9') {
        updateLang('Norwegian');
      }
      if (countryId == '10') {
        updateLang('Arabic');
      }
    }

    const intervalCall = setInterval(() => {
      update_language();
    }, 1500);
    return () => {
      // clean up
      clearInterval(intervalCall);
    };
  }, []);

  if (!isLoggedIn) {
    return (
      <NavigationContainer>
        {LocationData?.country == undefined ? (
          <Splash />
        ) : LocationData?.country == 'Norway' &&
          localizationStrings.getLanguage() == 'Norwegian' ? (
          <AuthNavigation />
        ) : LocationData?.country == 'Egypt' &&
          localizationStrings.getLanguage() == 'Arabic' ? (
          <AuthNavigation />
        ) : LocationData?.country == 'India' &&
          localizationStrings.getLanguage() == 'English' ? (
          <AuthNavigation />
        ) : (
          LocationData?.country == 'India' &&
          localizationStrings.getLanguage() == 'Norwegian' && <AuthNavigation />
        )}
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      {LocationData?.country == undefined ? (
        <Splash />
      ) : Language_Updated != true ? (
        LocationData?.country == 'Norway' &&
        localizationStrings.getLanguage() == 'Norwegian' ? (
          <HomeNavigator />
        ) : LocationData?.country == 'Egypt' &&
          localizationStrings.getLanguage() == 'Arabic' ? (
          <HomeNavigator />
        ) : LocationData?.country == 'India' &&
          localizationStrings.getLanguage() == 'English' ? (
          <HomeNavigator />
        ) : (
          LocationData?.country == 'India' &&
          localizationStrings.getLanguage() == 'Norwegian' && <HomeNavigator />
        )
      ) : (
        <HomeNavigator />
      )}
    </NavigationContainer>
  );
}

export default App;
