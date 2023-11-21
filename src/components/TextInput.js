// import React from 'react';
// import {
//   Dimensions,
//   Image,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {theme} from '../utils/theme';
// import TextFormatted from './TextFormated';

// export default function CustomTextInput({
//   placeholder,
//   Heading,
//   onChangeText,
//   value,
//   nulll,
//   editable,
//   secureTextEntry,
//   keyboardType,
//   autoCapitalize,
//   onSubmitEditing,
//   HideOnPress,
//   LeftIcon,
//   opacitytwo,
//   searchbar,
//   search,
//   multiline,
//   height,
//   backgroundColor,
//   marginTop,
//   paddingTop,
//   paddingHorizontal,
//   placeholderTextColor,
//   paddingBottom,
//   width,
//   autoFocus,
//   borderWidth,
//   View_marginTop,
//   borderColor,
//   borderRadius
// }) {
//   return (
//     <View>
//       {!!Heading && (
//         <TextFormatted style={styles.heading}>{Heading}</TextFormatted>
//       )}

//       <View
//         style={{
//           backgroundColor: backgroundColor || theme.colors.inputBG,
//           paddingHorizontal: paddingHorizontal || 15,
//           // borderRadius: borderRadius|| 10,
//           marginTop: View_marginTop || 10,
//           opacity: opacitytwo,
//           width: width || Dimensions.get('window').width - 60,
//           justifyContent: 'space-between',
//           flexDirection: 'row',
//           alignItems: 'center',
//           borderWidth: borderWidth,
//           borderColor: borderColor || theme.colors.C4C4C4,
//           borderRadius: borderRadius||10
//           // flex: 1,
//         }}>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//           }}>
//           {!!searchbar && (
//             <Image
//               style={{
//                 height: 22,
//                 width: 22,
//                 resizeMode: 'contain',
//                 // marginRight: 7,
//               }}
//               source={searchbar}
//             />
//           )}
//           <TextInput
//             paddingHorizontal={15}
//             editable={editable}
//             style={[
//               styles.textInput,
//               {
//                 height: height,
//                 marginTop: marginTop,
//                 paddingTop: paddingTop,
//                 paddingBottom: paddingBottom,
//                 borderRadius: borderRadius || 100
//               },
//             ]}
//             autoCapitalize={autoCapitalize}
//             keyboardType={keyboardType}
//             secureTextEntry={secureTextEntry}
//             placeholder={placeholder}
//             placeholderTextColor={placeholderTextColor || theme.colors.Gray}
//             value={value}
//             onChangeText={onChangeText}
//             onSubmitEditing={onSubmitEditing}
//             multiline={multiline}
//             autoFocus={autoFocus}
//             // maxLength={40}
//           />
//           {!!LeftIcon && (
//             <TouchableOpacity
//               // style={{flexDirection: 'row'}}
//               onPress={HideOnPress}>
//               <Image
//                 style={{
//                   height: 15,
//                   width: 15,
//                   resizeMode: 'contain',
//                 }}
//                 source={LeftIcon}
//               />
//             </TouchableOpacity>
//           )}
//         </View>
//         {!!search && (
//           <Image
//             style={{
//               height: 20,
//               width: 20,
//               resizeMode: 'contain',
//             }}
//             // source={searchbar}
//           />
//         )}

//         {!!nulll && <View />}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   textInput: {
//     fontWeight: '500',
//     fontSize: 16,
//     paddingVertical: 15,
//     color: theme.colors.white,
//     flex: 1,
//     paddingHorizontal: 15,
//   },
//   heading: {
//     fontSize: 14,
//     // marginHorizontal: 30,
//     marginTop: 20,
//     color: theme.colors.placeholder,
//     fontWeight: '500',
//   },
//   error: {
//     color: '#900',
//     textDecorationLine: 'underline',
//     marginHorizontal: 20,
//   },
//   optional: {
//     fontSize: 14,
//     // marginHorizontal: 30,
//     // marginTop: 20,
//     color: theme.colors.placeholder,
//     fontWeight: '700',
//   },
// });


import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from '../utils/theme';
import TextFormatted from './TextFormated';
// import {TextInput} from 'react-native-paper';


export default function CustomTextInput({
  placeholder,
  Heading,
  onChangeText,
  value,
  nulll,
  editable,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  onSubmitEditing,
  HideOnPress,
  LeftIcon,
  opacitytwo,
  searchbar,
  search,
  multiline,
  height,
  backgroundColor,
  marginTop,
  paddingTop,
  paddingHorizontal,
  placeholderTextColor,
  paddingBottom,
  width,
  autoFocus,
  borderWidth,
  View_marginTop,
  borderColor,
  borderRadius
}) {
  return (
    <View>
      {!!Heading && (
        <TextFormatted style={styles.heading}>{Heading}</TextFormatted>
      )}

      <View
        style={{
          backgroundColor: backgroundColor || theme.colors.inputBG,
          paddingHorizontal: paddingHorizontal || 15,
        
          marginTop: View_marginTop || 10,
          opacity: opacitytwo,
          width: width || Dimensions.get('window').width - 60,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: borderWidth,
          borderColor: borderColor || theme.colors.C4C4C4,
          borderRadius: borderRadius||10
          // flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {!!searchbar && (
            <Image
              style={{
                height: 22,
                width: 22,
                resizeMode: 'contain',
                // marginRight: 7,
              }}
              source={searchbar}
            />
          )}
          <TextInput
            paddingHorizontal={15}
            editable={editable}
            style={[
              styles.textInput,
              {
                height: height,
                marginTop: marginTop,
                paddingTop: paddingTop,
                paddingBottom: paddingBottom,
                borderRadius: borderRadius || 100
              },
            ]}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor || theme.colors.Gray}
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            multiline={multiline}
            autoFocus={autoFocus}
            // maxLength={40}
          />
          {!!LeftIcon && (
            <TouchableOpacity
              // style={{flexDirection: 'row'}}
              onPress={HideOnPress}>
              <Image
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: 'contain',
                }}
                source={LeftIcon}
              />
            </TouchableOpacity>
          )}
        </View>
        {!!search && (
          <Image
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
            }}
            // source={searchbar}
          />
        )}

        {!!nulll && <View />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    fontWeight: '500',
    fontSize: 16,
    paddingVertical: 15,
    color: theme.colors.white,
    flex: 1,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 14,
    // marginHorizontal: 30,
    marginTop: 20,
    color: theme.colors.placeholder,
    fontWeight: '500',
  },
  error: {
    color: '#900',
    textDecorationLine: 'underline',
    marginHorizontal: 20,
  },
  optional: {
    fontSize: 14,
    // marginHorizontal: 30,
    // marginTop: 20,
    color: theme.colors.placeholder,
    fontWeight: '700',
  },
});
