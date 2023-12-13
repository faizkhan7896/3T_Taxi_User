// import {
//     View,
//     Text,
//     useWindowDimensions,
//     Image,
//     TouchableOpacity,
//     Modal,Pressable,Alert,
//     StyleSheet
//   } from 'react-native';
//   import React, {useState} from 'react';

//   import {theme} from '../utils/theme';
//   export default function SolidButton({modalVisible,setModalVisible,Visible,message,textValue,tt})

//   {
//   //console.log(Visible);

{
  /* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
        
          <View style={styles.modalView}>
            <View style={styles.img}>
          <Image
                source={require('../assets/icons/using/restrict.png')}
                style={{
                  width: 55,
                  marginTop:10,
                  // backgroundColor: theme.colors.ButtonText,
                  height: 55,
                  
                  backgroundColor: 'red',
                  resizeMode: 'contain',
                  borderRadius:100,
                 
                 
                }}
              />
              </View>
            <Text style={styles.modalText}>You won’t be able to request a ride without adding a payment method</Text>
      
            <View style={{marginHorizontal: 5,width:250}}>
          <SolidButton
            text="Add Payment Method"
            onPress={() => setModalVisible(true)}
         
          />
          <View style={{height: 10}} />
          <SolidButton
            text="Skip For Now"
            onPress={() => navigation.navigate('PromoCode')}
            backgroundColor={theme.colors.ButtonText}
            color={theme.colors.yellow}
            borderColor={theme.colors.yellow}
            borderWidth={1}
          />
        </View>
      </View>
      </View>
      </Modal> */
}

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       isVisible={Visible}
//       backdropColor={"white"}
//       style={{ margin: 0 }}
//       onModalHide={() => {tt}}>
//       <View>
//         <Text>textValue</Text>
//         <Text>message</Text>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor:'rgba(0, 0, 0, 0.7)',

//   },
//   modalView: {
//     margin: 40,
//     backgroundColor: theme.colors.ButtonText,
//     padding: 20,
//     borderRadius:20,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5
//   },

//   textStyle: {

//     fontWeight: "bold",
//     textAlign: "center",

//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center",
//     color: theme.colors.lightGray,
//     fontFamily: 'Poppins',
//     fontSize:16
//   },
//   img:{
//     backgroundColor: theme.colors.ButtonText,
//     width:70,
//     height:70,
//     marginTop:-50,
//     borderRadius:100,
//     alignItems:'center',
//     justifyContent:'center',marginBottom:10
//     },
// });

// import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  View,
  Modal,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import SolidButton from './SolidButton';
import {theme} from '../utils/theme';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import localizationStrings from '../utils/Localization';
export default function CustomModal({
  title,
  onPress,
  secondary,
  location,
  naviga,
  large,
  height,
  payment,
  width,
  baseColor,
  textColor,
  onPresss,
  modalVisible,
  close,
  image,
  show = false,
  cancel,
  Heading,
  terms,
  buttontext,
  textThree,
  textTwo,
  logoTwo,
  logoOne,
  logoThree,
  onPressTwo,
  hidemodal,
}) {
  // added property declarations
  const dimension = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        onPress={onPresss}
        visible={show}
        // onRequestClose={() => {onPress}}
        onRequestClose={close}
        dismiss={close}>
        <View style={styles.centeredView}>
          <TouchableOpacity
            onPress={hidemodal}
            activeOpacity={1}
            style={{height: dimension.height, justifyContent: 'center'}}>
            <View style={styles.modalView}>
              <View style={styles.img}>
                <Image
                  source={image}
                  style={{
                    width: 55,
                    marginTop: 10,
                    // backgroundColor: theme.colors.ButtonText,
                    height: 55,
                    resizeMode: 'contain',
                    borderRadius: 100,
                  }}
                />
              </View>
              <Text
                style={{color: '#F01D50', fontSize: 22, fontWeight: 'bold'}}>
                {Heading}
              </Text>
              <Text style={styles.modalText}>{title}</Text>

              {!!terms && (
                <View style={{flexDirection: 'row', margin: 5}}>
                  <Text style={{color: theme.colors.white, fontSize: 10}}>
                    View our{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Privacy')}>
                    <Text style={{color: theme.colors.yellow, fontSize: 12}}>
                      {' '}
                      Terms & Conditions
                    </Text>
                  </TouchableOpacity>
                  <Text style={{color: theme.colors.white, fontSize: 10}}>
                    once for Cancelation{' '}
                  </Text>
                </View>
              )}

              {!payment && (
                <View style={{marginHorizontal: 5, width: 250}}>
                  <SolidButton
                    text={localizationStrings.Add_Payment_Method}
                    onPress={close}
                    // change this to new screen add atm card------------------------------------------------------------------
                  />
                  <View style={{height: 10}} />
                  <SolidButton
                    text={localizationStrings.Skip_For_Now}
                    onPress={onPresss}
                    backgroundColor={theme.colors.ButtonText}
                    color={theme.colors.yellow}
                    borderColor={theme.colors.yellow}
                    borderWidth={1}
                  />
                </View>
              )}

              {!location && (
                <View style={{width: 250}}>
                  <Divider
                    style={{backgroundColor: 'rgba(255, 255, 255, 0.3)'}}
                  />
                  <SolidButton
                    text={buttontext}
                    onPress={naviga}
                    backgroundColor={theme.colors.ButtonText}
                    color="white"
                    elevation={-1}
                    logo={logoOne}
                    // borderColor={theme.colors.yellow}
                    // borderWidth={1}
                  />
                  <Divider
                    style={{backgroundColor: 'rgba(255, 255, 255, 0.3)'}}
                  />
                  <View style={{height: 10}} />
                  <SolidButton
                    text={textTwo}
                    onPress={naviga}
                    backgroundColor={theme.colors.ButtonText}
                    color="white"
                    logo={logoTwo}
                    elevation={-1}
                  />
                  <Divider
                    style={{backgroundColor: 'rgba(255, 255, 255, 0.3)'}}
                  />
                  <View style={{height: 10}} />
                  <SolidButton
                    text={textThree}
                    onPress={onPressTwo}
                    backgroundColor={theme.colors.ButtonText}
                    color="white"
                    logo={logoThree}
                    elevation={-1}
                  />
                </View>
              )}

              {!!cancel && (
                <View style={{marginHorizontal: 5, width: 250}}>
                  <SolidButton
                    text={localizationStrings.Cancel_Booking}
                    borderRadius={50}
                    backgroundColor="rgba(240, 29, 80, 0.3)"
                    color="#F01D50"
                    onPress={onPresss}
                    marginHorizontal={5}
                    fontSize={18}
                    logo={require('../assets/icons/using/Cross.png')}
                  />
                  <View style={{height: 10}} />
                  <SolidButton
                    text={localizationStrings.Keep_Book}
                    borderRadius={50}
                    backgroundColor="rgba(255, 220, 0, 0.3)"
                    color="#FFDC00"
                    onPress={close}
                    marginHorizontal={5}
                    fontSize={18}
                    logo={require('../assets/icons/using/right.png')}
                  />
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    margin: 40,
    backgroundColor: theme.colors.ButtonText,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: theme.colors.lightGray,
    fontFamily: 'Poppins',
    fontSize: 16,
  },
  img: {
    backgroundColor: theme.colors.ButtonText,
    width: 70,
    height: 70,
    marginTop: -50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
