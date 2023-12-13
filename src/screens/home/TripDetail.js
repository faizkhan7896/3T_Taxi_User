import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../../utils/theme';
import Circle from '../../components/Circle';
import GradientLineWithText from '../../components/GradientLineWithText';
import CustomButton_2 from '../../components/CustomButton_2';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import {apis} from '../../utils/apis';
import {useSelector} from 'react-redux';
import localizationStrings from '../../utils/Localization';

const TripDetail = ({navigation}) => {
  const {params} = useRoute();
  const [loading, setLoading] = useState(false);
  const {userId} = useSelector(state => state.user);
  const {countryId} = useSelector(state => state.user||9);

  const country =
    countryId == '4'
      ? 'INR'
      : countryId == '9'
      ? 'NOK'
      : countryId == '10'
      ? 'EGP'
      : countryId == '11' && 'SAR';

  // //console.log(params.data);
  // alert(JSON.stringify(params?.item?.promo_discount_amount));

  const DeleteReciept = () => {
    const body = new FormData();
    body.append('user_id', userId);
    body.append('booking_id', params?.item?.id);
    setLoading(true);

    apis.post_api('deleteReceiptByUser', body).then(v => {
      //console.log(v);
      setLoading(false);
      // setDetail(v.result[0]);
      navigation.goBack();
    });
    api.get_gym().then(v => {
      //console.log(v);
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#171614'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
          marginTop: 30,
          marginBottom: 20,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            height: 30,
            width: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/icons/using/Back.png')}
            style={{height: 28, width: 28, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <Text
          style={{fontSize: 20, fontWeight: '600', color: theme.colors.white}}>
          {moment(params?.item?.req_datetime).format('Do MMMM')}
        </Text>
        <View style={{width: 30}} />
      </View>
      <ScrollView>
        <Image
          source={require('../../assets/icons/using/map_detail.png')}
          style={{height: 220, width: '100%', resizeMode: 'contain'}}
        />
        <View style={{margin: 20}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Circle bg={theme.colors.lightGray} />
            <Text style={styles.text}>
              {params?.item?.picuplocation == ''
                ? 'Pickup Location'
                : params?.item?.picuplocation}
            </Text>
          </View>
          <LinearGradient
            colors={['#BAB6AE00', '#BAB6AE']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{
              width: 1,
              height: 13,
              marginHorizontal: 5,
              marginVertical: 5,
            }}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Circle bg={theme.colors.lightGray} />
            <Text numberOfLines={2} style={styles.text}>
              {/* {params?.item?.dropofflocation} */}
              {params?.item?.dropofflocation == ''
                ? 'Drop Location'
                : params?.item?.dropofflocation}
            </Text>
          </View>
          {/* <Image
            source={require('../../assets/icons/using/note.png')}
            style={{
              height: 16,
              width: 16,
              resizeMode: 'contain',
              position: 'absolute',
              right: 0,
            }}
          /> */}
        </View>
        <GradientLineWithText title={localizationStrings.Trip_Details} />

        <View style={{borderTopWidth: 1, borderTopColor: theme.colors[656055]}}>
          <TextComp
            t1={localizationStrings?.Booking}
            t2={localizationStrings?.Distance}
            s1={params?.item?.id}
            s2={params?.item?.distance + ' km'}
          />
          {/* <TextComp
      t1={'Trip Type'}
      t2={'Pickup Distance'}
      s1={'Inter City'}
      s2={params?.item?.distance + ' km'}
    /> */}
          <TextComp
            t1={localizationStrings?.Start}
            t2={localizationStrings?.End}
            s1={
              moment(params?.item?.start_time).format('LT') == 'Invalid date'
                ? 'Start Time'
                : moment(params?.item?.start_time).format('LT')
            }
            s2={
              moment(params?.item?.end_time).format('LT') == 'Invalid date'
                ? 'End Time'
                : moment(params?.item?.end_time).format('LT')
            }
          />
        </View>
        <GradientLineWithText title={localizationStrings.User_Information} />
        <View style={{borderTopWidth: 1, borderTopColor: theme.colors[656055]}}>
          <TextComp
            t1={localizationStrings.User_Name}
            t2={localizationStrings.Email_or_Phone_Number}
            s1={params?.item?.users_details?.user_name}
            s2={params?.item?.users_details?.mobile}
          />
        </View>
        <GradientLineWithText title={localizationStrings.Price_Information} />
        <View style={{borderTopWidth: 1, borderTopColor: theme.colors[656055]}}>
          <TextComp
            t1={localizationStrings.Total_Price}
            t2={localizationStrings.Coupan_Discount}
            s1={params?.item?.amount + ' ' + country}
            s2={params?.item?.promo_discount_amount + ' ' + country}
            color={theme.colors.yellow}
          />
          <TextComp
            t1={localizationStrings.VAT_}
            t2={localizationStrings.Paid_By}
            s1={params?.item?.vat + '% ' + country}
            s2={params?.item?.payment_type}
          />
        </View>
        <CustomButton_2
          title={localizationStrings.Email_Receipt}
          source={require('../../assets/icons/using/mail.png')}
          color={theme.colors.yellow}
          bgColor={theme.colors.yellow + '4D'} //#FFDC004D
          mh={16}
          mv={20}
          fontSize={16}
          h={40}
        />
        <CustomButton_2
          title={localizationStrings.Delete_Receipt}
          source={require('../../assets/icons/using/dustbin.png')}
          color={'#F01D50'}
          bgColor={'#F01D504D'} //#FFDC004D
          mh={16}
          // mv={30}
          fontSize={16}
          h={40}
          mb={30}
          onPress={() => DeleteReciept()}
          loading={loading}
        />
      </ScrollView>
    </View>
  );
};
const VertLine = () => <View style={{width: 1, backgroundColor: '#656055'}} />;
const TextComp = ({t1, t2, s1, s2, color}) => (
  <View
    style={{
      flexDirection: 'row',
      borderBottomColor: '#656055',
      borderBottomWidth: 1,
    }}>
    <View style={{flex: 1, paddingHorizontal: 15, paddingVertical: 9}}>
      <Text style={{fontSize: 14, color: theme.colors.lightGray}}>{t1}</Text>
      <Text
        style={{
          fontSize: 14,
          color: color || theme.colors.white,
          fontWeight: '500',
          marginTop: 5,
        }}>
        {s1}
      </Text>
    </View>
    <VertLine />
    <View style={{flex: 1, paddingHorizontal: 15, paddingVertical: 9}}>
      <Text style={{fontSize: 14, color: theme.colors.lightGray}}>{t2}</Text>
      <Text
        style={{
          fontSize: 14,
          color: theme.colors.white,
          fontWeight: '500',
          marginTop: 5,
        }}>
        {s2}
      </Text>
    </View>
  </View>
);

export default TripDetail;

const styles = StyleSheet.create({
  text: {fontSize: 13, color: theme.colors.lightGray, marginLeft: 10},
});
