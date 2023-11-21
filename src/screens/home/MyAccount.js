import {
  View,
  Text,
  useWindowDimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {theme} from '../../utils/theme';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomHeader from '../../components/CustomHeader';
import ProfileImg from '../../components/ProfileImg';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton_2 from '../../components/CustomButton_2';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {USERDATA} from '../../redux/ActionTypes';
import store from '../../redux/store';
import {baseUrl, ShowToast} from '../../utils/constance';
import {
  getCurrentLocation,
  get_Profile,
  post_api,
  showError,
  showSuccess,
} from '../../utils/Constants';
import Loader from '../../components/Loader';
import {ImagePath} from '../../utils/ImagePath';
import {launchImageLibrary} from 'react-native-image-picker';
import localizationStrings from '../../utils/Localization';

export default function SeupProfile() {
  const {userData, userId} = useSelector(state => state.user);

  const country_name =
    userData?.country == '4'
      ? 'India'
      : userData?.country == '9'
      ? 'Norway'
      : userData?.country == '10'
      ? 'Egypt'
      : userData?.country == '11' && 'Saudi Arabia';

  const dimension = useWindowDimensions();
  const navigation = useNavigation();
  const [email, setEmail] = useState(userData?.email);
  const [name, setName] = useState(
    userData?.first_name + ' ' + userData?.last_name,
  );
  const [mobile, setMobile] = useState(userData?.mobile);
  const [country, setCountry] = useState(country_name);
  const [city, setCity] = useState(userData?.city);
  const [fullAddress, setFullAddress] = useState(userData?.address);
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState('');

  // alert(JSON.stringify(userData?.promo_code_detail));
  // alert(JSON.stringify(img != ""));

  async function updateProfile() {
    // if (!img) {
    //   ShowToast('Please upload profile picture', 'error');
    //   return;
    // }
    const {latitude, longitude} = await getCurrentLocation();
    setLoading(true);
    const body = new FormData();
    body.append('user_id', userData?.id);
    body.append('email', email);
    body.append('mobile', mobile);
    body.append('first_name', name?.split(' ')[0]);
    body.append('last_name', name?.split(' ')[1]);
    body.append('address', fullAddress);
    body.append('city', city);
    body.append('country', userData?.country);
    body.append('lat', latitude);
    body.append('lon', longitude);
    {
      img != '' &&
        body.append('image', {
          uri: img.uri,
          // filename: img.fileName,
          name: img.fileName,
          type: img.type,
        });
    }
    console.log('JSON.stringify(body)', JSON.stringify(body));
    post_api('update_profile', body)
      .then(res => {
        setLoading(false);
        console.log('api', res);
        // return;
        if (res.status == '1') {
          // store.dispatch({type: USERDATA, payload: res.result});
          get_Profile(userId);

          showSuccess(res.message);
          return;
        }
        showError(res.message);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        // showError('An error occurred');
      });
  }
  const pick_img = () => {
    launchImageLibrary({mediaType: 'photo'}).then(data => {
      if (!data.didCancel) {
        setImg(data.assets[0]);
      }
    });
  };
  console.log(img);
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
      {loading && <Loader />}
      <CustomHeader title={localizationStrings.My_Account} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imgCircle}>
          <ProfileImg
            source={{
              uri: Object.entries(img).length == 0 ? userData?.image : img.uri,
            }}
            size={85}
            br={50}
          />
          <TouchableOpacity
            style={{position: 'absolute', bottom: 0, right: 0}}
            onPress={() => pick_img()}>
            <ProfileImg source={ImagePath.camera} size={25} br={1002} />
          </TouchableOpacity>
        </View>

        {/* <KeyboardAvoidingView behavior="height" style={{}}> */}
        <CustomTextInput
          placeholder={''}
          value={name}
          onChangeText={setName}
          source={require('../../assets/icons/using/pencil.png')}
          top={50}
        />
        <CustomTextInput
          placeholder={''}
          value={mobile}
          // veriry
          onChangeText={setMobile}
          source={require('../../assets/icons/using/pencil.png')}
          top={40}
        />
        <CustomTextInput
          placeholder={''}
          value={email}
          // veriry
          onChangeText={setEmail}
          source={require('../../assets/icons/using/pencil.png')}
          top={40}
        />
        <CustomTextInput
          placeholder={'Country'}
          value={country}
          onChangeText={setCountry}
          source={require('../../assets/icons/using/pencil.png')}
          top={40}
          editable={false}
        />
        {/* <CustomTextInput
          placeholder={'City'}
          value={city}
          onChangeText={setCity}
          source={require('../../assets/icons/using/pencil.png')}
          top={40}
        /> */}
        <CustomTextInput
          placeholder={localizationStrings?.Full_Address}
          value={fullAddress}
          onChangeText={setFullAddress}
          source={require('../../assets/icons/using/pencil.png')}
          top={40}
        />
        {/* </KeyboardAvoidingView> */}

        <CustomButton_2
          title={localizationStrings.Save_And_Update}
          bgColor={'#FFDC004D'}
          color="#FFDC00"
          mh={16}
          mt={35}
          mb={20}
          onPress={() => updateProfile()}
          // loading={loading}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  textcolor: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    fontSize: 16,
  },
  imgCircle: {
    height: 100,
    width: 100,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#FFDC0066',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
});
