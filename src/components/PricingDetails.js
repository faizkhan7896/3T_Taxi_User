import {View, Text, useWindowDimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton_2 from './CustomButton_2';
import Modal from 'react-native-modal';
import {data, theme} from '../utils/theme';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {post_api, showError} from '../utils/Constants';
import localizationStrings from '../utils/Localization';

export default function PaymentOptions({
  isOpen,
  setIsOpen,
  basePrice,
  per_km,
  per_min,
  toll,
  coupan,
  Estimated,
  distance,
  time_Taken,
  Type,
  CarData,
}) {
  const navigation = useNavigation();
  const {userId, userData} = useSelector(state => state.user);
  const {countryId} = useSelector(state => state.user || 9);
  const [Data, setData] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const dimension = useWindowDimensions();
  // alert(JSON.stringify(distance))
  // //console.log(CarData);

  const country =
    countryId == '4'
      ? localizationStrings.INR
      : countryId == '9'
      ? localizationStrings.NOK
      : countryId == '10'
      ? localizationStrings.EGP
      : countryId == '11' && localizationStrings.SAR;

  return (
    <Modal
      isVisible={isOpen}
      style={{margin: 0, padding: 0}}
      onBackdropPress={() => setIsOpen(false)}
      onBackButtonPress={() => setIsOpen(false)}>
      {Type == 'Car' && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#36342F',
            bottom: 0,
            width: '100%',
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            paddingBottom: 50,
            paddingTop: 15,
            paddingHorizontal: 15,
          }}>
          <Text
            style={{
              color: theme.colors.white,
              fontFamily: 'Jost-SemiBold',
              fontSize: 25,
            }}>
            {localizationStrings?.Car_Details}
          </Text>

          <Image
            source={{uri: CarData.car_image}}
            style={{
              height: dimension?.width / 2.5,
              width: dimension?.width / 1.5,
              // resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              color: theme.colors.white,
              fontFamily: 'Jost-SemiBold',
              fontSize: 25,
              alignSelf: 'center',
              textAlign: 'center',
              marginBottom: 15,
            }}>
            {CarData?.car_name}
          </Text>

          <Text
            style={{
              color: '#BAB6AE',
              fontFamily: 'Jost-Medium',
              // fontSize: 25,
              // marginTop: 15,
            }}>
            {CarData?.description}
          </Text>
          {/* Your fare will be the price presented before the trip or based on
              the rates below and other applicable surcharges and adjustments */}
          <View style={{height: 25}} />
          <TouchableOpacity
            // onPress={() => setShowPricing(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Jost-SemiBold',
                flex: 1,
                textAlign: 'left',
              }}>
              {localizationStrings?.No_of_seat}
            </Text>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Jost-SemiBold',
                marginRight: 10,
              }}>
              {CarData?.no_of_seats}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => setShowPricing(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Jost-SemiBold',
                flex: 1,
                textAlign: 'left',
              }}>
              {localizationStrings?.Car_BasePrice}
            </Text>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Jost-SemiBold',
                marginRight: 10,
              }}>
              {CarData?.charge} {country}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => setShowPricing(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Jost-SemiBold',
                flex: 1,
                textAlign: 'left',
              }}>
              {localizationStrings?.Car_Per_km}
            </Text>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Jost-SemiBold',
                marginRight: 10,
              }}>
              {CarData?.per_km} {country}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => setShowPricing(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Jost-SemiBold',
                flex: 1,
                textAlign: 'left',
              }}>
              {localizationStrings?.Car_Per_min}
            </Text>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Jost-SemiBold',
                marginRight: 10,
              }}>
              {CarData?.ride_time_charge_permin} {country}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {Type == 'Price' && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#36342F',
            bottom: 0,
            width: '100%',
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            paddingBottom: 50,
            paddingTop: 15,
            paddingHorizontal: 15,
          }}>
          <Text
            style={{
              color: theme.colors.white,
              fontFamily: 'Jost-SemiBold',
              fontSize: 25,
            }}>
            {localizationStrings?.Fare_Break}
          </Text>
          <Text
            style={{
              color: '#BAB6AE',
              fontFamily: 'Jost-Medium',
              // fontSize: 25,
              marginTop: 15,
            }}>
            {localizationStrings?.Fare_Break_text}
          </Text>
          <View style={{height: 25}} />

          {basePrice != 0 && (
            <TouchableOpacity
              // onPress={() => setShowPricing(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Jost-SemiBold',
                  flex: 1,
                  textAlign: 'left',
                }}>
                {localizationStrings?.Total_distance}
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Jost-SemiBold',
                  marginRight: 10,
                }}>
                {distance.toFixed(2)} km
              </Text>
            </TouchableOpacity>
          )}
          {basePrice != 0 && (
            <TouchableOpacity
              // onPress={() => setShowPricing(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Jost-SemiBold',
                  flex: 1,
                  textAlign: 'left',
                }}>
                {localizationStrings?.BasePrice}
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Jost-SemiBold',
                  marginRight: 10,
                }}>
                {basePrice} {country}
              </Text>
            </TouchableOpacity>
          )}

          {per_km != 0 && (
            <TouchableOpacity
              // onPress={() => setShowPricing(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Jost-Medium',
                  flex: 1,
                  textAlign: 'left',
                }}>
                {localizationStrings?.Per_km}
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Jost-Medium',
                  marginRight: 10,
                }}>
                {per_km} {country}
              </Text>
            </TouchableOpacity>
          )}
          {per_min != 0 && (
            <TouchableOpacity
              // onPress={() => setShowPricing(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Jost-Medium',
                  flex: 1,
                  textAlign: 'left',
                }}>
                {localizationStrings?.Per_min}
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Jost-Medium',
                  marginRight: 10,
                }}>
                {per_min} {country}
              </Text>
            </TouchableOpacity>
          )}
          {toll != 0 && (
            <TouchableOpacity
              // onPress={() => setShowPricing(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Jost-Medium',
                  flex: 1,
                  textAlign: 'left',
                }}>
                {localizationStrings?.Toll_Price}
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Jost-Medium',
                  marginRight: 10,
                }}>
                {toll} {country}
              </Text>
            </TouchableOpacity>
          )}
          {coupan != 0 && (
            <TouchableOpacity
              // onPress={() => setShowPricing(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Jost-Medium',
                  flex: 1,
                  textAlign: 'left',
                }}>
                {localizationStrings?.Coupan_Discount}
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Jost-Medium',
                  marginRight: 10,
                }}>
                - {coupan} {country}
              </Text>
            </TouchableOpacity>
          )}
          {Estimated != 0 && (
            <TouchableOpacity
              // onPress={() => setShowPricing(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Jost-Medium',
                  flex: 1,
                  textAlign: 'left',
                }}>
                {localizationStrings?.Estimaged_Price}
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Jost-Medium',
                  marginRight: 10,
                }}>
                {Estimated} {country}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </Modal>
  );
}
