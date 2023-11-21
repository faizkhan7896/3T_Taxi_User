import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import SolidButton from '../../components/SolidButton';
import localizationStrings from '../../utils/Localization';
import {theme} from '../../utils/theme';
import store from '../../redux/store';
import {
  BOOKING_STATUS,
  B_ID,
  CONTINUE_FALSE,
  CONTINUE_TRUE,
  END,
  START,
  START_TRUE,
  TRIP_DATA,
} from '../../redux/ActionTypes';

export default function GetStarted() {
  const dimension = useWindowDimensions();
  const navigation = useNavigation();

  const fadeAnim = new Animated.Value(0);

  // const fadeout = () => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1500,
    useNativeDriver: true,
  }).start();

  const position = new Animated.ValueXY({x: 0, y: 100});
  Animated.spring(position, {
    toValue: {x: -30, y: -10},
    speed: 10,
    bounciness: 40,
    useNativeDriver: true,
  }).start();

  const post = new Animated.ValueXY({x: 0, y: 0});
  Animated.spring(post, {
    toValue: {x: 10, y: -130},
    speed: 10,
    bounciness: 20,
    useNativeDriver: true,
  }).start();

  // useEffect(() => {
  //   store.dispatch({type: BOOKING_STATUS, booking_status: 'FINISH'});
  //   store.dispatch({type: B_ID, booking_id: ''});
  //   store.dispatch({type: START, startTrip: true});
  //   store.dispatch({type: END, startTrip: false});
  //   store.dispatch({type: TRIP_DATA, tripData: {}});
  //   store.dispatch({type: CONTINUE_TRUE, continue_trip: false});
  //   store.dispatch({type: START_TRUE, start_trip: false});
  //   store.dispatch({type: CONTINUE_FALSE, continue_trip: false});
  // }, []);

  return (
    <View>
      <StatusBar
        barStyle={'light-content'}
        translucent={true}
        backgroundColor="transparent"
      />
      <ImageBackground
        source={require('../../assets/icons/using/Splashbg.jpg')}
        style={{
          width: dimension.width,
          height: dimension.height,
          alignItems: 'center',
        }}
        imageStyle={{
          width: dimension.width,
          height: dimension.height + 40,
        }}>
        <Animated.View style={{opacity: fadeAnim, marginTop: 80}}>
          <Image source={require('../../assets/icons/using/Logo.png')} />
        </Animated.View>

        <Image
          source={require('../../assets/icons/using/welcome.png')}
          style={{
            width: dimension.width,
            height: dimension.height / 10,
            resizeMode: 'contain',
            marginTop: 10,
            // borderWidth: 1,
          }}
        />
        <Text
          style={{
            fontSize: 15,
            color: theme.colors.lightGray,
            textAlign: 'center',
            fontFamily: 'Jost-Regular',
            marginHorizontal: 40,
            marginVertical: 5,
          }}>
          {localizationStrings.start_string}
        </Text>

        {/* <View style={{width:dimension.width/2,marginBottom:10,padding:10}}> */}
        <SolidButton
          text={localizationStrings.Get_Started}
          // {localizationStrings.Get_Started}
          onPress={() => navigation.navigate('Login')}
          width={dimension.width / 2.6}
        />

        {/* </View> */}

        <Animated.View
          style={{
            marginTop: dimension.height / 4.5,
            transform: [{translateX: post.x}, {translateY: post.y}],
          }}>
          <Image
            source={require('../../assets/icons/using/illustration_1.png')}
            style={{
              width: dimension.width,
              height: dimension.height / 3,
              resizeMode: 'contain',
            }}
          />
        </Animated.View>
      </ImageBackground>
    </View>
  );
}
