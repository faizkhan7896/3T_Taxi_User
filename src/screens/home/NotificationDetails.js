import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {ShowToast, baseUrl} from '../../../utils/constance';
import {theme} from '../../utils/theme';
import localizationStrings from '../../utils/Localization';
import Statusbar from '../../components/Statusbar';

const NotificationDetails = () => {
  const navigation = useNavigation();
  const params = useRoute();
  const [noti_data, setNoti_data] = useState([]);
  const [loading, setLoading] = useState(false);
  const {userId} = useSelector(state => state?.user);

  //   alert(JSON.stringify(params?.params.param));
  //   console.log('params - ', params);

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
      <Statusbar backgroundColor={theme.colors.ButtonText} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 20,
          marginHorizontal: 16,
        }}>
        <Image
          source={require('../../assets/icons/using/close.png')}
          style={{height: 26, width: 26, resizeMode: 'contain', opacity: 0}}
        />
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Jost-Medium',
            color: '#FFFFFF',
          }}></Text>
        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/icons/using/close.png')}
            style={{height: 26, width: 26, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      </View>

      <ImageBackground
        source={
          params?.params?.noti_status == 'Message from 3T' ||
          params?.params?.noti_status == 'Offer for you'
            ? require('../../assets/icons/taxi_logo.png')
            : {uri: params?.params?.user_image}
        }
        imageStyle={{borderRadius: 50}}
        style={styles.profile_icon}>
        <Image
          source={{uri: params?.params?.status_image}}
          style={styles.icon}
        />
      </ImageBackground>

      <Text
        style={{
          fontSize: 20,
          fontFamily: 'Jost-Medium',
          color: '#FFFFFF',
          paddingHorizontal: 20,
          marginTop: 30,
        }}>
        {params?.params?.noti_status == 'Message from 3T'
          ? localizationStrings?.Message_from_3T
          : params?.params?.noti_status == 'Message from Driver'
          ? localizationStrings?.Message_from_User
          : params?.params?.noti_status == 'Request Accepted'
          ? localizationStrings?.Request_Accept
          : params?.params?.noti_status == 'Booking Completed'
          ? localizationStrings?.Request_Completed
          : params?.params?.noti_status == 'Request Rejected' &&
            localizationStrings?.Request_Rejected}
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontFamily: 'Jost-Medium',
          color: '#FFFFFF',
          paddingHorizontal: 20,
          marginTop: 10,
          color: theme.colors.lightGray,
        }}>
        {params?.params?.message}
      </Text>
      <Text
        style={{
          fontSize: 10,
          fontFamily: 'Jost-Medium',
          color: '#FFFFFF',
          paddingHorizontal: 20,
          marginTop: 10,
          color: theme.colors.lightGray,
          alignSelf: 'flex-end',
        }}>
        {params?.params?.time_ago}
      </Text>
    </View>
  );
};

export default NotificationDetails;

const styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  profile_icon: {
    height: 120,
    width: 120,
    resizeMode: 'cover',
    borderRadius: 130,
    backgroundColor: '#36342F',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    // marginTop: 15,
  },
});
