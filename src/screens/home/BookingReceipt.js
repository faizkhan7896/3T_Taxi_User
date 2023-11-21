import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../utils/theme';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomHeader from '../../components/CustomHeader';
import ProfileImg from '../../components/ProfileImg';
import {FlatList} from 'react-native';
import GradientLine from '../../components/GradientLine';
import Circle from '../../components/Circle';
import CustomButton_2 from '../../components/CustomButton_2';
import {useSelector} from 'react-redux';
import localizationStrings from '../../utils/Localization';

export default function BookingReceipt() {
  const dimension = useWindowDimensions();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(0);
  const {countryId} = useSelector(state => state.user||9);
  // alert()

  const country =
    countryId == '4'
      ? 'INR'
      : countryId == '9'
      ? 'NOK'
      : countryId == '10'
      ? 'EGP'
      : countryId == '11' && 'SAR';

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
      <CustomHeader title={localizationStrings.Booking} />
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <ProfileImg
              size={26}
              source={require('../../assets/icons/black_back.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontFamily: 'Jost-Medium',
              marginHorizontal: 25,
            }}>
            7th September
          </Text>
          <TouchableOpacity>
            <ProfileImg
              size={26}
              source={require('../../assets/icons/black_next.png')}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={{justifyContent: 'center'}}
          horizontal
          pagingEnabled
          data={[1, 2, 3, 4]}
          renderItem={({item, index}) => (
            <View
              style={{
                width: dimension.width - 50,
                marginHorizontal: 20,
                backgroundColor: '#25231F',
                borderWidth: 1,
                borderColor: '#36342F',
                borderRadius: 10,
                overflow: 'hidden',
                marginTop: 10,
              }}>
              <Image
                source={require('../../assets/icons/map_with_pin.png')}
                style={{
                  height: dimension.width / 2.5,
                  width: '100%',
                  resizeMode: 'cover',
                }}
              />
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 16,
                    marginTop: 10,
                  }}>
                  <View style={{alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/icons/location_pin.png')}
                      style={{
                        height: 16,
                        width: 16,
                        resizeMode: 'contain',
                        tintColor: '#74C12C',
                      }}
                    />
                    <GradientLine
                      colors={['#FFDC0000', '#FFDC00']}
                      height={19}
                      width={1}
                      marginVertical={5}
                    />
                    <Circle bg={'#FFDC00'} />
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      marginLeft: 10,
                      flex: 1,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#BAB6AE',
                          fontFamily: 'Jost-Regular',
                          flex: 1,
                        }}>
                        Spireaveien 1
                      </Text>
                      <Image
                        source={require('../../assets/icons/sticky_note.png')}
                        style={{
                          height: 16,
                          width: 16,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#BAB6AE',
                        fontFamily: 'Jost-Regular',
                      }}>
                      Enjoveien 20
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: '#36342F',
                    marginTop: 10,
                  }}
                />
                <TextComp
                  img
                  t1={'Departure'}
                  t2={'Estimated Arrival'}
                  s1={'13:48'}
                  s2={'13:48'}
                />
                <TextComp
                  t1={'Booking ID'}
                  t2={'Product'}
                  s1={'#2541547'}
                  s2={'Normal Car'}
                />
                <TextComp
                  t1={'Maximum Price'}
                  t2={'Payment Method'}
                  s1={'304 ' + country}
                  s2={'Cash'}
                />
                <CustomButton_2
                  title={'Cancel Booking'}
                  source={require('../../assets/icons/cancel.png')}
                  color={'#F01D50'}
                  bgColor={'#F01D504D'}
                  mh={16}
                  mv={15}
                />
              </View>
            </View>
          )}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: '#BAB6AE',
              fontSize: 14,
              fontFamily: 'Jost-Regular',
            }}>
            View our
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
            <Text
              style={{
                color: theme.colors.yellow,
                fontSize: 14,
                fontFamily: 'Jost-Medium',
              }}>
              {' '}
              {localizationStrings.Terms_And_Conditions}
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            marginBottom: 20,
            color: '#BAB6AE',
            fontSize: 14,
            fontFamily: 'Jost-Regular',
            textAlign: 'center',
          }}>
          once for Cancelation
        </Text>
      </ScrollView>
    </View>
  );
}
const VertLine = () => <View style={{width: 1, backgroundColor: '#656055'}} />;
const TextComp = ({t1, t2, s1, s2, color, img}) => (
  <View
    style={{
      flexDirection: 'row',
      borderBottomColor: '#656055',
      borderBottomWidth: 1,
    }}>
    <View style={{flex: 1, paddingHorizontal: 15, paddingVertical: 9}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {img && (
          <Image
            source={require('../../assets/icons/clock.png')}
            style={{
              height: 16,
              width: 16,
              resizeMode: 'contain',
              marginRight: 7,
            }}
          />
        )}
        <Text style={{fontSize: 14, color: theme.colors.lightGray}}>{t1}</Text>
      </View>
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
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {img && (
          <Image
            source={require('../../assets/icons/clock.png')}
            style={{
              height: 16,
              width: 16,
              resizeMode: 'contain',
              marginRight: 7,
            }}
          />
        )}
        <Text style={{fontSize: 14, color: theme.colors.lightGray}}>{t2}</Text>
      </View>
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
