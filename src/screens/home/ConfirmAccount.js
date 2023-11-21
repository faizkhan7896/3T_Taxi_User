import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../../utils/theme';
import {ScrollView} from 'react-native-gesture-handler';
import CustomHeader from '../../components/CustomHeader';
import CustomButton_2 from '../../components/CustomButton_2';
import localizationStrings from '../../utils/Localization';
const data = [
  {
    name: 'Amazon Pay',
    nameTwo: 'OK 250',
    image: require('../../assets/icons/using/Amazon.png'),
  },
];

export default function SetupPayment() {
  const dimension = useWindowDimensions();
  const navigation = useNavigation();
  const [selected, setSelected] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const ListItem = ({source, text, Check, onPress, textTwo}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={source}
            style={{
              width: 60,
              height: 65,
              resizeMode: 'contain',
            }}
          />
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              color: theme.colors.white,
              textAlign: 'left',
              marginVertical: 20,
              fontWeight: 'bold',
              // width: 220,
              marginHorizontal: 20,
            }}>
            {text}
          </Text>
        </View>

        <View
          style={{
            //   width: dimension.width-40,
            //   height: 40,
            marginTop: 30,
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              color: theme.colors.white,
              fontWeight: 'bold',
              // width: 220,
            }}>
            {textTwo}
          </Text>
          <Image
            // source={Check}
            style={{
              width: 22,
              height: 22,
              resizeMode: 'contain',
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#171614', width: dimension.width}}>
      <CustomHeader title={localizationStrings.Confirm_And_Add} />
      <ScrollView>
        <View
          style={{
            backgroundColor: '#171614',
            marginHorizontal: 16,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: theme.colors.lightGray,
              fontFamily: 'Jost-Regular',
              marginTop: 20,
            }}>
            {localizationStrings.Amount}
          </Text>
          <Text
            style={{
              fontSize: 25,
              color: theme.colors.white,
              marginTop: 5,
              fontFamily: 'Jost-Bold',
            }}>
            NOK 250
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: theme.colors.lightGray,
              fontFamily: 'Jost-Regular',
              marginTop: 20,
            }}>
            Selected Bank
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // marginHorizontal: 16,
              height: 58,
              borderRadius: 8,
              padding: 10,
            }}>
            <Image
              source={require('../../assets/icons/using/Amazon.png')}
              style={{width: 60, height: 38, resizeMode: 'contain'}}
            />
            <Text
              style={{
                fontSize: 16,
                color: theme.colors.white,
                marginHorizontal: 20,
                fontFamily: 'Jost-Medium',
                flex: 1,
              }}>
              {localizationStrings.Amazon_Pay}
            </Text>

            <Text
              numberOfLines={1}
              style={{
                fontSize: 16,
                color: theme.colors.white,
                fontFamily: 'Jost-Medium',
              }}>
              NOK 250
            </Text>
          </View>
        </View>
      </ScrollView>
      <CustomButton_2
        title={localizationStrings.Add_NOK}
        bgColor={'#FFDC00'}
        mh={16}
        color={'#171614'}
        mb={30}
        onPress={() => navigation.navigate('MyWalletPre')}
      />
    </View>
  );
}
