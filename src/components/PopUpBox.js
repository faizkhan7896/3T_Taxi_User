import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import CustomButton_2 from './CustomButton_2';
import ProfileImg from './ProfileImg';
import {useEffect} from 'react';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import localizationStrings from '../utils/Localization';

export default function PopUpBox({visible, setVisible, source, children}) {
  const [found, setFound] = useState(false);
  // const [visible, setVisible] = useState(false);
  // useEffect(() => {
  //   setFound(false);
  //   setTimeout(() => {
  //     setFound(true);
  //   }, 2500);
  // }, []);
  return (
    <View>
      {/* <DriverFound visible={visible} setVisible={setVisible} /> */}

      {/* <FindDriver visible={visible} setVisible={setVisible} /> */}
    </View>
  );
}

const FindDriver = ({visible, setVisible}) => (
  <Modal isVisible={visible}>
    <View
      style={{
        backgroundColor: '#25231F',
        borderWidth: 1,
        borderColor: '#36342F',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 20,
      }}>
      <View>
        <Image
          source={require('../assets/icons/using/ride.png')}
          style={{
            height: 80,
            width: 80,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Jost-Medium',
            color: '#FFFFFF',
            textAlign: 'center',
            marginHorizontal: 15,
            lineHeight: 23,
            marginTop: 10,
          }}>
          {localizationStrings.Safe_and_hygenic_ride}
        </Text>
        <Image
          source={require('../assets/icons/using/search_driver.png')}
          style={{
            height: 17,
            width: '100%',
            resizeMode: 'contain',
            marginVertical: 20,
          }}
        />
        <CustomButton_2
          title={localizationStrings.Cancel}
          bgColor="#F01D504D"
          source={require('../assets/icons/using/Cross.png')}
          color={'#F01D50'}
          h={34}
        />
      </View>
    </View>
  </Modal>
);
const DriverFound = ({visible, setVisible, setFound}) => {
  const navigation = useNavigation();
  return (
    <Modal isVisible={visible}>
      <View
        style={{
          backgroundColor: '#25231F',
          borderWidth: 1,
          borderColor: '#36342F',
          borderRadius: 20,
          paddingHorizontal: 16,
          paddingVertical: 20,
        }}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Jost-Regular',
              color: '#FFFFFF',
              marginBottom: 20,
            }}>
            Driver will reach you in just 25 min.
          </Text>
          <ProfileImg
            source={require('../assets/icons/using/ride.png')}
            size={80}
            br={60}
          />
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Jost-Medium',
              color: '#FFFFFF',
              marginTop: 10,
            }}>
            Saimon Jhonson
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Jost-Regular',
              color: '#BAB6AE',
              marginVertical: 7,
            }}>
            KIA Sonate
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Jost-Regular',
              color: '#BAB6AE',
              backgroundColor: '#36342F',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 4,
            }}>
            PLA 02 TE 1235
          </Text>
          <Image
            source={require('../assets/icons/using/search_driver.png')}
            style={{
              height: 17,
              width: '100%',
              resizeMode: 'contain',
              marginVertical: 20,
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <CustomButton_2
              onPress={() => {
                // setFound(false);
                setVisible(false);
              }}
              // onPress={onPress}
              title={localizationStrings.Cancel}
              bgColor="#F01D504D"
              source={require('../assets/icons/using/Cross.png')}
              color={'#F01D50'}
              h={34}
              flex={1}
            />
            <View style={{width: 20}} />
            <CustomButton_2
              onPress={() => navigation.navigate('StartTrip')}
              title={'Continue'}
              bgColor="#74C12C4D"
              source={require('../assets/icons/using/Checked.png')}
              color={'#74C12C'}
              h={34}
              flex={1}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
