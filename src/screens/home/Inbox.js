import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {theme} from '../../utils/theme';
import {useNavigation} from '@react-navigation/native';
import {ShowToast, baseUrl} from '../../utils/constance';
import moment from 'moment';
import {ImagePath} from '../../utils/ImagePath';
import Loader from '../../components/Loader';
import {useSelector} from 'react-redux';
import localizationStrings from '../../utils/Localization';

const Inbox = () => {
  const navigation = useNavigation();
  const [noti_data, setNoti_data] = useState([]);
  const [loading, setLoading] = useState(false);
  const {userId} = useSelector(state => state?.user);

  // alert(JSON.stringify(userId));

  const get_notification = async () => {
    try {
      const body = new FormData();
      body.append('user_id', userId);
      setLoading(true);
      var requestOptions = {
        method: 'POST',
        body: body,
        headers: {'Content-Type': 'multipart/form-data'},
      };
      const response = await fetch(
        baseUrl + 'get_notification',
        requestOptions,
      );
      const res = await response.json();

      if (res.status == 1) {
        setLoading(false);
        setNoti_data(
          res.result.sort((a, b) => moment(b.date_time).diff(a.date_time)),
        );
      } else {
        setLoading(false);
        // ShowToast(res.message);
      }
    } catch (error) {
      setLoading(false);
      //console.log(error);
      ShowToast(error);
    }
  };
  useEffect(() => {
    get_notification();
  }, []);

  const RenderItem = ({item, index}) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('NotificationDetails', item)}>
        {moment(noti_data[index - 1]?.date_time).format('DD/MM/YYYY') !=
          moment(item.date_time).format('DD/MM/YYYY') && (
          <Text
            style={{
              fontSize: 14,
              color: theme.colors.lightGray,
              marginVertical: 10,
            }}>
            {index == 0 ? '' : moment(item.date_time).format('DD/MM/YYYY')}
          </Text>
        )}

        <View
          // onPress={() => navigation.navigate('ChatDeatils', {item: item})}
          style={{
            flexDirection: 'row',
            paddingVertical: 15,
            borderBottomColor: '#36342F',
            borderBottomWidth: 1,
          }}>
          <ImageBackground
            source={
              item.noti_status == 'Message from 3T' ||
              item.noti_status == 'Offer for you'
                ? ImagePath.taxi_logo
                : {uri: item.user_image}
            }
            imageStyle={{borderRadius: 50}}
            style={styles.profile_icon}>
            <Image source={{uri: item.status_image}} style={styles.icon} />
          </ImageBackground>
          <View style={{flex: 1, marginHorizontal: 15, alignSelf: 'center'}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: theme.colors.white,
              }}>
              {item.noti_status == 'Message from 3T'
                ? localizationStrings?.Message_from_3T
                : item.noti_status == 'Message from Driver'
                ? localizationStrings?.Message_from_Driver
                : item.noti_status == 'Request Accepted'
                ? localizationStrings?.Request_Accept
                : item.noti_status == 'Booking Completed'
                ? localizationStrings?.Request_Completed
                : item.noti_status == 'Request Rejected' &&
                  localizationStrings?.Request_Rejected}
            </Text>
            <Text
              // numberOfLines={2}
              style={{
                fontSize: 12,
                color: theme.colors.lightGray,
                // marginTop: 6,
              }}>
              {item.message}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              color: theme.colors.lightGray,
            }}>
            {item.time_ago}
          </Text>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 20,
          marginHorizontal: 16,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Jost-Medium',
            color: '#FFFFFF',
          }}>
          {localizationStrings.Notifications}
        </Text>
        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/icons/using/close.png')}
            style={{height: 26, width: 26, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      </View>
      {loading && <Loader />}
      <FlatList
        data={noti_data}
        contentContainerStyle={{paddingHorizontal: 16}}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: theme.colors.ButtonText,
              marginVertical: 5,
            }}
          />
        )}
        ListHeaderComponent={
          <Text
            style={{
              fontSize: 14,
              color: theme.colors.lightGray,
              marginVertical: 10,
            }}>
            {moment(noti_data[0]?.date_time).format('DD/MM/YYYY') ==
            moment(new Date()).format('DD/MM/YYYY')
              ? 'Recent'
              : moment(noti_data[0]?.date_time).format('DD/MM/YYYY')}
          </Text>
        }
        renderItem={({item, index}) => <RenderItem item={item} index={index} />}
      />
    </View>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  icon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  profile_icon: {
    height: 60,
    width: 60,
    resizeMode: 'cover',
    borderRadius: 30,
    backgroundColor: '#36342F',
    justifyContent: 'flex-end',
  },
});
