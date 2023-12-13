import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import App from '../../components/EndTripSheet';
import localizationStrings from '../../utils/Localization';
import SearchFieldContainer from '../../components/SearchFieldContainer';
import {useSelector} from 'react-redux';
import moment from 'moment';

export default function TripEnd({navigation}) {
  const dimension = useWindowDimensions();
  const {tripData} = useSelector(state => state?.user);
  const [ReviewSended, setReviewSended] = useState(false);
  // //console.log('tripData', tripData);
  // alert(JSON.stringify(tripData?.users_details?.first_name))
  // useEffect(() => {
  //   navigation.navigate('HomeMap');
  // }, [ReviewSended]);

  return (
    <View style={{flex: 1, backgroundColor: '#171614'}}>
      <CustomHeader title={localizationStrings?.Trip_Ended} />
      <ScrollView>
        <View
          style={{
            backgroundColor: '#36342F',
            borderWidth: 1,
            borderColor: '#535048',
            marginHorizontal: 16,
            borderRadius: 20,
          }}>
          <Image
            source={require('../../assets/icons/map_with_pin.png')}
            style={{
              height: 150,
              width: dimension.width - 50,
              resizeMode: 'cover',
              borderRadius: 20,
              alignSelf: 'center',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: 15,
            }}>
            <Text style={styles.text}>
              {moment(tripData?.req_datetime).format(
                'Do MMM' + ' @' + 'hh:mm a',
              )}
            </Text>
            <Text style={styles.text}>
              {parseInt(tripData?.distance)?.toFixed(2)} km |{' '}
              {parseInt(tripData?.distance_time)?.toFixed(2)} min
            </Text>
          </View>

          <SearchFieldContainer
            title={tripData?.picuplocation}
            title2={tripData?.dropofflocation}
            color2={'#BAB6AE'}
          />
        </View>
      </ScrollView>
      <App navigation={navigation} setReviewSended={setReviewSended} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Jost-Regular',
  },
});
