import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Linking,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {theme} from '../../utils/theme';
import {useNavigation, useRoute} from '@react-navigation/native';
import {baseUrl, ShowToast} from '../../utils/constance';

const ChatDeatils = () => {
  const navigation = useNavigation();
  const [details, setDetails] = useState([]);
  const {params} = useRoute();
  const [loading, setLoading] = useState(false);
  const [mess, setMess] = useState('');
  const [messagesending, setMessagesending] = useState(false);
  const [isFocused, setIsFocused] = useState(true);

  // //console.log('paramsparams', params?.item);

  // alert(JSON.stringify(params?.item?.driver_details?.online_status));

  const Driver_Id =
    params?.Driver == true ? params?.item?.driver_id : params?.item?.driver_id;

  const user_id =
    params?.Driver == true ? params?.item?.user_id : params?.item?.user_id;

  const insert_mess = async () => {
    setMessagesending(true);
    try {
      const body = new FormData();
      body.append('sender_id', user_id /* params?.id */);
      body.append('receiver_id', Driver_Id);
      body.append('chat_message', mess);
      // body.append('sender_id', '1' /* params?.id */);
      // body.append('receiver_id', '7');

      //console.log(body);

      var requestOptions = {
        method: 'POST',
        body: body,
        headers: {'Content-Type': 'multipart/form-data'},
      };
      const response = await fetch(baseUrl + 'insert_chat', requestOptions);
      const res = await response.json();
      //console.log(res);
      if (res.status == '1') {
        get_chat();
        setMess('');
        setMessagesending(false);
      } else {
        setMessagesending(false);
        get_chat();
        ShowToast(res.message);
      }
    } catch (error) {
      setMessagesending(false);
      //console.log(error);
      ShowToast(error);
    }
  };

  const get_chat = async () => {
    setLoading(true);
    try {
      const body = new FormData();
      body.append('sender_id', user_id /* params?.id */);
      body.append('receiver_id', Driver_Id);

      //console.log('bodybody', body);
      var requestOptions = {
        method: 'POST',
        body: body,
        headers: {'Content-Type': 'multipart/form-data'},
      };
      const response = await fetch(baseUrl + 'get_chat', requestOptions);
      const res = await response.json();
      //console.log(res);
      if (res.status == '1') {
        setDetails(res.result.reverse());
        setLoading(false);
      } else {
        setLoading(false);
        setDetails([]);
        // ShowToast(res.message);
      }
    } catch (error) {
      setLoading(false);
      //console.log(error);
      ShowToast(error);
    }
  };

  useEffect(() => {
    get_chat();

    const int = setInterval(() => {
      if (isFocused) get_chat(true);
    }, 3000);
    return () => clearInterval(int);
  }, [isFocused]);

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 16,
          marginVertical: 15,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            height: 26,
            width: 26,
            marginRight: 15,
          }}>
          <Image
            source={require('../../assets/icons/using/Back.png')}
            style={{
              height: 26,
              width: 26,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        <ImageBackground
          source={{
            uri:
              params?.Driver == true
                ? params?.item?.driver_details?.image
                : params?.item?.users_details?.image,
          }}
          style={{
            height: 40,
            width: 40,
            resizeMode: 'cover',
            borderRadius: 50,
            backgroundColor: '#cfcfcf',
          }}
          imageStyle={{
            height: 40,
            width: 40,
            resizeMode: 'cover',
            borderRadius: 50,
            backgroundColor: '#cfcfcf',
          }}>
          <View
            style={{
              height: 8,
              width: 8,
              backgroundColor:
                params?.item?.driver_details?.online_status == 'ONLINE'
                  ? '#4dd965'
                  : '#ffba01',
              // backgroundColor: '#ffba01',
              borderRadius: 100,
              position: 'absolute',
              bottom: 5,
              right: 0,
            }}
          />
        </ImageBackground>

        <View style={{flex: 1, marginHorizontal: 15, alignSelf: 'center'}}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: theme.colors.white,
            }}>
            {params?.Driver == true
              ? params?.item?.driver_details?.user_name
              : params?.item?.users_details?.user_name}
          </Text>

          <Text
            numberOfLines={1}
            style={{
              fontSize: 12,
              color: theme.colors.lightGray,
              marginTop: 1,
            }}>
            {params?.item?.driver_details?.online_status}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => Linking.openURL('tel:' + params?.item?.mobile)}
          style={{
            height: 26,
            width: 26,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/icons/using/calls.png')}
            style={{
              height: 16,
              width: 16,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          // onPress={() => navigation.goBack()}
          style={{height: 26, width: 26, marginLeft: 10}}>
          <Image
            source={require('../../assets/icons/using/more.png')}
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity> */}
      </View>
      <FlatList
        data={details}
        inverted
        renderItem={({item, index}) => (
          <View
            key={index}
            style={{
              marginHorizontal: 16,
              backgroundColor: '#6F6858',
              borderTopLeftRadius: item?.receiver_id == user_id ? 0 : 8,
              borderTopRightRadius: item?.receiver_id == user_id ? 8 : 0,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              maxWidth: '80%',
              alignSelf:
                item?.receiver_id == user_id ? 'flex-start' : 'flex-end',
              paddingVertical: 7,
              paddingLeft: item?.receiver_id == user_id ? 15 : 10,
              paddingRight: item?.receiver_id == user_id ? 15 : 10,
              marginTop: 20,
            }}>
            <Text style={{fontSize: 12, color: theme.colors.white}}>
              {item?.chat_message}
            </Text>
          </View>
        )}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#36342F',
          margin: 15,
          borderRadius: 4,
          paddingHorizontal: 10,
        }}>
        <TextInput
          placeholder="Type your message..."
          placeholderTextColor={theme.colors.lightGray}
          style={{flex: 1, color: 'white'}}
          value={mess}
          onChangeText={setMess}
        />
        <TouchableOpacity onPress={() => insert_mess()}>
          {messagesending ? (
            <ActivityIndicator color={theme.colors.white} />
          ) : (
            <Image
              source={require('../../assets/icons/using/send.png')}
              style={{
                height: 22,
                width: 22,
                resizeMode: 'contain',
              }}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatDeatils;

const styles = StyleSheet.create({});
