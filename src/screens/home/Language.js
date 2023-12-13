import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {theme} from '../../utils/theme';
import Statusbar from '../../components/Statusbar';
import Header from '../../components/Header';
import localizationStrings from '../../utils/Localization';
import store from '../../redux/store';
import {LANGUAGEUPDATED_} from '../../redux/ActionTypes';
import {baseUrl} from '../../utils/constance';
import {useSelector} from 'react-redux';

const LanguageSelectionScreen = ({navigation}) => {
  const data = ['English', 'Arabic', 'Norwegian'];
  const [selected, setSelected] = useState(localizationStrings.getLanguage());
  const [reload, setReload] = useState({});
  const {countryId, userId, cityId} = useSelector(state => state?.user);

  // alert(JSON.stringify(localizationStrings.getLanguage()))

  const update_language = async val => {
    try {
      const url =
        baseUrl + 'update_language?user_id=' + userId + '&language=' + val;
      //console.log(url);
      const response = await fetch(url);
      const res = await response.json();
      //console.log('update_languageupdate_languageupdate_language', res);
    } catch (error) {
      //console.log(error);
    }
  };
  const updateLang = val => {
    localizationStrings.setLanguage(val);
    setReload({});
    update_language(val);
  };

  useEffect(() => {
    setReload({});
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
      <Statusbar
        barStyle={'light-content'}
        backgroundColor={theme.colors.ButtonText}
      />
      <Header
        navigation={navigation}
        Headertext="choose Language"
        color="white"
        backonPress={() => navigation.goBack()}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: '500',
          color: theme.colors.white,
          marginVertical: 15,
          marginHorizontal: 20,
        }}>
        {localizationStrings.selectlanguage}
      </Text>

      <FlatList
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setSelected(item);
              updateLang(item);
              store.dispatch({
                type: LANGUAGEUPDATED_,
                payload: true,
              });
            }}
            style={{
              marginHorizontal: 40,
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
                fontWeight: '400',
                color: theme.colors.lightGray,
                marginLeft: 10,
              }}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  headingStyle: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },

  elementContainer: {
    width: '100%',
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: theme.colors.yellow,
    borderRadius: 10,
    height: 40,
  },
  textStyle: {
    color: 'black',
    fontSize: 25,
  },
});

export default LanguageSelectionScreen;
