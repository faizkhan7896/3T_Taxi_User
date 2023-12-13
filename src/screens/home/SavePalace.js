import {
  View,
  Text,
  useWindowDimensions,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {theme} from '../../utils/theme';
import {TouchableOpacity} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import CustomTextInput from '../../components/CustomTextInput';
import {ImageBackground} from 'react-native';
import CustomButton_2 from '../../components/CustomButton_2';
import {baseUrl, ShowToast} from '../../utils/constance';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {ADDRESS} from '../../redux/ActionTypes';
import store from '../../redux/store';
import localizationStrings from '../../utils/Localization';

export default function SavePalace({navigation}) {
  const {userId, address_} = useSelector(state => state?.user);
  const dimension = useWindowDimensions();
  const saved = ['My Home', 'My Office'];
  const [address, setAddress] = useState(address_?.address || '');
  const [name, setName] = useState('');
  const [places, setPlaces] = useState([]);
  const {params} = useRoute();

  // alert(JSON.stringify(address_));

  // alert(JSON.stringify(userId));

  const add_place = () => {
    var body = new FormData();
    body.append('user_id', userId);
    body.append('name', name);
    body.append('address', address);
    body.append('lat', '22.7028206');
    body.append('lon', '75.8716281');

    var requestOptions = {
      method: 'POST',
      body: body,
      headers: {'content-type': 'multipart/form-data'},
    };

    fetch(baseUrl + 'addUserlocation', requestOptions)
      .then(response => response.json())
      .then(result => {
        //console.log(result);
        get_place();
        setAddress();
        setName();
      })
      .catch(error => console.log('error', error));
  };
  const delete_place = id => {
    var body = new FormData();
    body.append('route_id', id);

    var requestOptions = {
      method: 'POST',
      body: body,
      headers: {'content-type': 'multipart/form-data'},
    };

    fetch(baseUrl + 'deleteUserLocation', requestOptions)
      .then(response => response.json())
      .then(result => {
        //console.log(result);
        get_place();
      })
      .catch(error => console.log('error', error));
  };
  const get_place = async () => {
    try {
      var requestOptions = {
        method: 'POST',
      };

      const response = await fetch(
        baseUrl + 'getUserLocation?user_id=' + userId,
        requestOptions,
      );
      const res = await response.json();
      //console.log(res);

      if (res.status == '1') {
        setPlaces(res.result);
      } else {
        ShowToast(result.message || 'Unknown error', 'error');
      }
    } catch (error) {}
  };
  useEffect(() => {
    get_place();
  }, []);

  //console.log('address', address);
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
      <CustomHeader title={localizationStrings?.Save_Place} />
      <CustomTextInput
        label={localizationStrings.Address}
        placeholder={localizationStrings.Full_Address}
        value={address}
        onChangeText={setAddress}
      />
      <CustomTextInput
        label={localizationStrings?.Name}
        placeholder="e.g. My Office"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginHorizontal: 16,
          marginVertical: 20,
        }}
        onPress={() => navigation.navigate('FullMap', {state: {setAddress}})}>
        <Image
          source={require('../../assets/icons/using/Pin.png')}
          style={{
            height: 20,
            width: 20,
            marginRight: 10,
            resizeMode: 'contain',
          }}></Image>
        <Text
          style={{color: '#FFDC00', fontFamily: 'Jost-Regular', fontSize: 16}}>
          {localizationStrings.My_Office_Address}
        </Text>
      </TouchableOpacity>

      <CustomButton_2
        title={localizationStrings.Save_Place}
        color={theme.colors.yellow}
        bgColor={theme.colors.yellow + '33'}
        mh={16}
        mv={20}
        onPress={() => add_place()}
      />

      <View style={styles.bottom}>
        <Text style={{color: '#868686', fontFamily: 'Jost-Regular'}}>
          {localizationStrings.Save_Place}
        </Text>

        {places.length != 0 && (
          <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
            {places?.map(v => (
              <TouchableOpacity
                onPress={() => {
                  store.dispatch({
                    type: ADDRESS,
                    payload: v,
                  });
                  navigation.goBack();
                }}
                activeOpacity={0.5}
                style={{flexDirection: 'row', marginTop: 10}}>
                <Image
                  source={require('../../assets/icons/using/pinstar.png')}
                  style={{
                    height: 16,
                    width: 16,
                    resizeMode: 'contain',
                    marginTop: 3,
                  }}
                />
                <View
                  style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                  <Text
                    style={{
                      fontFamily: 'Jost-Regular',
                      color: '#BAB6AE',
                      flex: 1,
                      marginHorizontal: 12,
                    }}>
                    {v.name}
                    {'\n'}
                    <Text
                      style={{
                        fontFamily: 'Jost-Regular',
                        color: '#807B73',
                        fontSize: 12,
                        marginTop: 5,
                      }}>
                      {v.address}
                    </Text>
                  </Text>
                  <TouchableOpacity onPress={() => delete_place(v.id)}>
                    <Image
                      source={require('../../assets/icons/using/Cross.png')}
                      style={{height: 18, width: 18, resizeMode: 'contain'}}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Jost-Regular',
    color: '#868686',
    marginHorizontal: 16,
  },
  bottom: {
    backgroundColor: '#25231F',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#36342F',
    flex: 1,
  },
});
