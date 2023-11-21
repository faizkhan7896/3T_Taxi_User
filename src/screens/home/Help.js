import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import Statusbar from '../../components/Statusbar';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../../utils/theme';
import {
  TextInput,
  Menu,
  TouchableRipple,
  Button,
  Provider,
} from 'react-native-paper';
import SolidButton from '../../components/SolidButton';
import {ScrollView} from 'react-native-gesture-handler';
import Modalss from '../../components/Modalss';
import {SelectList} from 'react-native-dropdown-select-list';

import {Divider} from 'react-native-elements';
import CustomHeader from '../../components/CustomHeader';
import FAQs from '../../components/FAQs';
import ContactUs from '../../components/ContactUs';
import localizationStrings from '../../utils/Localization';

const data = [
  {
    name: 'Frequently question number 1 will be here...',
  },
  {
    name: 'Frequently question number 2 will be here...',
  },
  {
    name: 'Frequently question number 3 will be here...',
  },
  {
    name: 'Frequently question number 4 will be here...',
  },
  {
    name: 'Frequently question number 5 will be here...',
  },
  {
    name: 'Frequently question number 6 will be here...',
  },
  {
    name: 'Frequently question number 7 will be here...',
  },
];

export default function SetupPayment() {
  const dimension = useWindowDimensions();
  const navigation = useNavigation();
  const [selected, setSelected] = useState(0);
  const [visible, setIsVisible] = useState(true);
  const [faq, setFaq] = useState(false);
  const [active, setActive] = useState('FAQs');

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
      <CustomHeader title={localizationStrings.Help_and_Support} />

      <TabBar active={active} setActive={setActive} />
      <View style={{flex: 1}}>
        {active == 'FAQs' && <FAQs />}
        {active == 'Contact Us' && <ContactUs />}
      </View>
    </View>
  );
}
const TabBar = ({active, setActive}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={{marginHorizontal: 16, alignSelf: 'flex-start'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // marginHorizontal: 16,
          //   marginTop: 10,
          //   flex: 1,
        }}>
        <TouchableOpacity style={styles.tab} onPress={() => setActive('FAQs')}>
          <Text
            style={[
              styles.tabText,
              {
                color:
                  active == 'FAQs'
                    ? theme.colors.yellow
                    : theme.colors.lightGray,
              },
            ]}>
            {localizationStrings.F_A_Q_s}
          </Text>
          <View
            style={[
              styles.triangle,
              {
                borderBottomColor:
                  active == 'FAQs' ? theme.colors.yellow : 'transparent',
              },
            ]}
          />
          <View
            style={{
              backgroundColor:
                active == 'FAQs' ? theme.colors.yellow : 'transparent',
              height: 2,
              //   width: (width - 32) / 2,
              width: '100%',
            }}></View>
        </TouchableOpacity>
        <View style={{width: 50}} />
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActive('Contact Us')}>
          <Text
            style={[
              styles.tabText,
              {
                color:
                  active == 'Contact Us'
                    ? theme.colors.yellow
                    : theme.colors.lightGray,
              },
            ]}>
            {localizationStrings.Contact_Us}
          </Text>
          <View
            style={[
              styles.triangle,
              {
                borderBottomColor:
                  active == 'Contact Us' ? theme.colors.yellow : 'transparent',
              },
            ]}
          />
          <View
            style={{
              backgroundColor:
                active == 'Contact Us' ? theme.colors.yellow : 'transparent',
              height: 2,
              width: '100%',
              //   width: (width - 32) / 2,
            }}></View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: theme.colors.yellow,
          height: 0.5,
          opacity: 0.4,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {alignItems: 'center'},
  tabText: {fontSize: 16, fontFamily: 'Jost-Medium'},
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    marginTop: 2,
  },
});
