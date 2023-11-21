import {Linking, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import CustomTextInput from './CustomTextInput';
import CustomButton_2 from './CustomButton_2';
import LinearGradient from 'react-native-linear-gradient';
import {post_api, showError, showSuccess} from '../utils/Constants';
import Loader from './Loader';
import {useSelector} from 'react-redux';
import localizationStrings from '../utils/Localization';

const ContactUs = () => {
  const {userId} = useSelector(state => state.user);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [issue, setIssue] = useState('');
  const [loading, setLoading] = useState(false);
  const {userData} = useSelector(state => state.user);

  const country =
    userData?.country == '4'
      ? 'INR'
      : userData?.country == '9'
      ? 'NOK'
      : userData?.country == '10'
      ? 'EGP'
      : userData?.country == '11' && 'SAR';
  // alert(country)

  const contact_us = () => {
    if (!name || !email || !number || !subject || !issue) {
      showError(localizationStrings?.msg_fill_all_field);
      return;
    }
    const body = new FormData();
    body.append('user_id', userId);
    body.append('name', name);
    body.append('email', email);
    body.append('mobile', number);
    body.append('subject', subject);
    body.append('issue', issue);

    setLoading(true);
    post_api('add_support', body)
      .then(v => {
        if (v.status == 1) {
          console.log(v);
          showSuccess(v.message);
          setName('');
          setEmail('');
          setNumber('');
          setSubject('');
          setIssue('');
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      {loading && <Loader />}
      <CustomTextInput
        placeholder={localizationStrings.Your_full_name}
        value={name}
        onChangeText={setName}
      />
      <CustomTextInput
        placeholder={localizationStrings.Email_Address}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
      />
      <CustomTextInput
        placeholder={localizationStrings.Phone_Number}
        value={number}
        keyboardType="number-pad"
        onChangeText={setNumber}
      />
      <CustomTextInput
        placeholder={localizationStrings.Subject}
        value={subject}
        onChangeText={setSubject}
      />
      <CustomTextInput
        placeholder={localizationStrings.Your_Issue}
        height={100}
        value={issue}
        onChangeText={setIssue}
        multiline={true}
      />
      <CustomButton_2
        title={localizationStrings.Submit}
        bgColor="#FFDC004D"
        color={'#FFDC00'}
        mh={16}
        mt={35}
        onPress={() => contact_us()}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 16,
          marginVertical: 20,
        }}>
        <LinearGradient
          colors={['#BAB6AE00', '#BAB6AE']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{height: 1, flex: 1, borderRadius: 5}}
        />
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Jost-Regular',
            color: '#BAB6AE',
            marginHorizontal: 10,
          }}>
          OR
        </Text>
        <LinearGradient
          colors={['#BAB6AE', '#BAB6AE00']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{height: 1, flex: 1, borderRadius: 5}}
        />
      </View>
      <CustomButton_2
        onPress={() => {
          if (country == 'NOK') {
            Linking.openURL(`tel:004748900800`);
            return;
          }
          if (country == 'EGP') {
            Linking.openURL(`tel:00201000914249`);
            return;
          }
        }}
        title={localizationStrings.Direct_Call_Us_Now}
        bgColor="#FFDC004D"
        color={'#FFDC00'}
        mh={16}
        // mt={35}
        bw={1}
        bc={'#FFDC00'}
        mb={30}
      />
      <CustomButton_2
        onPress={() => {
          if (country == 'NOK') {
            Linking.openURL(`sms:004748900800` + '?body=3T Driver Support');
            return;
          }
          if (country == 'EGP') {
            Linking.openURL(`sms:00201000914249` + '?body=3T Driver Support');
            return;
          }
        }}
        title={localizationStrings.Chat_With_Us}
        bgColor="#FFDC004D"
        color={'#FFDC00'}
        mh={16}
        // mt={35}
        bw={1}
        bc={'#FFDC00'}
        mb={30}
      />
    </ScrollView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({});
