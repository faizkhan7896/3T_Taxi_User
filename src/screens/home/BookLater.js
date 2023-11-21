import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../utils/theme';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import GradientLine from '../../components/GradientLine';
import {TextInput} from 'react-native';
import {ScrollView} from 'react-native';
import AddressPickup from '../../components/AddressPickup';
import {useSelector} from 'react-redux';
import localizationStrings from '../../utils/Localization';

const BookLater = ({navigation}) => {
  const recentAdd = ['Enjoveien 20, OSLO, Norge', 'Spireaveien 1, OSLO, Norge'];
  const saved = ['My Home', 'My Office'];

  const [state, setState] = useState({
    destinationCords: {},
    destinationAddress: '',
  });

  const {destinationCords, destinationAddress} = state;
  const {userId, booking_id, tripData, userData} = useSelector(
    state => state?.user,
  );

  // alert(JSON.stringify(destinationAddress))
  const fetchDestinationCords1 = (lat, lng, address) => {
    getCordinates1({lat, lng, address});
  };

  const fetchDestinationCords2 = (lat, lng, address) => {
    getCordinates2({lat, lng, address});
  };
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
      <CustomHeader
        left={
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/icons/using/side_bar.png')}
              style={{height: 22, width: 22, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        }
        imgSource={require('../../assets/icons/using/Logo.png')}
        source2={require('../../assets/icons/using/noti.png')}
        size2={18}
      />
      {/* <View
        style={{
          backgroundColor: '#25231F',
          borderWidth: 1,
          borderColor: '#36342F',
          margin: 16,
          padding: 15,
          borderRadius: 10,
          flexDirection: 'row',
        }}>
        <View style={{alignItems: 'center', paddingVertical: 5}}>
          <Image
            source={require('../../assets/icons/using/Pin.png')}
            style={{
              height: 16,
              width: 16,
              resizeMode: 'contain',
              tintColor: theme.colors.lightGray,
            }}
          />
          <GradientLine
            colors={['#FFDC0000', '#FFDC00']}
            height={23}
            width={1}
            marginVertical={5}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 20,
                backgroundColor: theme.colors.yellow,
                marginLeft: 8,
              }}
            />
            <Image
              source={require('../../assets/icons/using/next_arrow.png')}
              style={{height: 8, width: 8, resizeMode: 'contain'}}
            />
          </View>
        </View>
        <View
          style={{flex: 1, justifyContent: 'space-between', paddingLeft: 10}}>
          <Text
            style={{
              fontFamily: 'Jost-Regular',
              color: theme.colors.lightGray, //#FFFFFF4D
            }}>
            Departure Address (Spireaveien 1)
          </Text>
          <View style={{height: 1, backgroundColor: '#36342F', marginTop: 5}} />
          <TextInput
            placeholder="Enter Destination"
            placeholderTextColor={'#FFFFFF4D'}
            onEndEditing={() => navigation.goBack()}
            style={{
              paddingVertical: 1,
              fontFamily: 'Jost-Regular',
              color: theme.colors.white,
            }}
          />
        </View>
      </View> */}

      <View style={styles.searchContainer}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            paddingLeft: 10,
          }}>
          <AddressPickup
            placheholderText={localizationStrings.Departure+' '+localizationStrings.Address}
            fetchAddress={fetchDestinationCords1}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Text
                style={{
                  height: 45,
                  color: '#FFFFFF',
                  fontSize: 16,
                  backgroundColor: '#25231F',
                }}>
                vdfvdf
              </Text> */}
            <AddressPickup
              placheholderText={'Destination address'}
              fetchAddress={fetchDestinationCords2}
            />
          </View>
        </View>
      </View>
      <ScrollView>
        <Text style={styles.heading}>Recent Addresses</Text>
        {recentAdd.map(v => (
          <View style={styles.container}>
            <Image
              source={require('../../assets/icons/using/history.png')}
              style={{height: 16, width: 16, resizeMode: 'contain'}}
            />
            <Text
              style={{
                fontFamily: 'Jost-Medium',
                color: '#BAB6AE',
                marginHorizontal: 16,
              }}>
              {v}
            </Text>
          </View>
        ))}
        <View style={{height: 20}} />
        <Text style={styles.heading}>{localizationStrings.Save_Place}</Text>
        {saved.map(v => (
          <View style={[styles.container, {alignItems: 'flex-start'}]}>
            <Image
              source={require('../../assets/icons/using/pinstar.png')}
              style={{
                height: 16,
                width: 16,
                resizeMode: 'contain',
                marginTop: 3,
              }}
            />
            <View style={{marginHorizontal: 16}}>
              <Text style={{fontFamily: 'Jost-Regular', color: '#BAB6AE'}}>
                {v}
              </Text>
              <Text
                style={{
                  fontFamily: 'Jost-Regular',
                  color: '#807B73',
                  fontSize: 12,
                  marginTop: 5,
                }}>
                {localizationStrings.Home_Address}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('SavePalace')}
        style={{
          alignItems: 'center',
          paddingVertical: 10,
          borderTopWidth: 1,
          borderColor: '#36342F',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 16,
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/icons/using/pinstar.png')}
            style={{
              height: 16,
              width: 16,
              resizeMode: 'contain',
            }}
          />
          <Text
            style={{
              color: '#BAB6AE',
              fontFamily: 'Jost-Regular',
              fontSize: 14,
              marginLeft: 7,
            }}>
            Add Save Places
          </Text>
        </View>
        <Text
          style={{
            color: '#807B73',
            fontSize: 12,
            fontFamily: 'Jost-Regular',
            marginTop: 2,
          }}>
          Get to your favorite destinations faster
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookLater;

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'Jost-Regular',
    color: '#868686',
    marginHorizontal: 16,
  },
  container: {
    marginHorizontal: 16,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
