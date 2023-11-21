import {DefaultTheme} from 'react-native-paper';
import localizationStrings from './Localization';
// git remote set-url origin https://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@github.com/kdsinghapp/3T_Taxi_User.git

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    white: '#ffffff',
    lightGray: '#BAB6AE',
    Black: '#000000',
    ButtonText: '#171614',
    yellow: '#FFDC00',
    Gray: 'gray',
    D9D9D9: '#D9D9D9',
    HomeBg: '#F6F6F6',
    Tabbg: '#DBDBDB',
    red: '#EB1D36',
    purple: '#2FAFC7',
    // purple: '#7E48D2',
    green: '#0EB647',
    SubItem: '#8F959E',
    Pluscontainer: '#F8F8FA',
    SelectAvailablity: '#34519B',
    ScrollDown: '#043848',

    Chat_container: '#2E8AF6',
    inputBG: '#F7F8F8',
    Placeholder: '#ADA4A5',
    inActive: '#DBDBDB',
    C4C4C4: '#c4c4c4',
    searchbar: '#3234361A',
    Button: '#F3E13A',
    heading_Text: '#670000',
    OtherText: '#33196B',
    Like: '#1deb5c',
    text: '#36342F',
  },
  dark: true,
};

export const data = [
  [
    {
      name: localizationStrings.Google_Pay,
      id: 'Google Pay',
      image: require('../assets/icons/using/GooglePay.png'),
    },
    {
      name: localizationStrings?.Card,
      id: 'Card',
      image: require('../assets/icons/using/Card_.png'),
    },
    {
      name: localizationStrings?.Cash,
      id: 'Cash',
      image: require('../assets/icons/using/CashMachine.png'),
    },
  ],

  [
    {
      name: localizationStrings?.Opay,
      id: 'OPay',
      image: require('../assets/icons/using/Opay.jpeg'),
    },
    {
      name: localizationStrings?.PayInCar,
      id: 'Pay_in_Car',
      image: require('../assets/icons/using/CardMachine_EG.png'),
    },
  ],
];
// export const mapsApiKey = 'AIzaSyCj_8-SZsoxYxZwN_Wi_7hU8kDSeQx_YVQ';
export const mapsApiKey = 'AIzaSyDmLCUMGhVP2osA_Fv5w87nVwiqJbk2HhQ';
