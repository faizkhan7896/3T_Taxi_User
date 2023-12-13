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
import React, {useEffect, useState} from 'react';
import Statusbar from '../../components/Statusbar';
import Header from '../../components/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {theme} from '../../utils/theme';
import SolidButton from '../../components/SolidButton';
import {ScrollView} from 'react-native-gesture-handler';
import Modalss from '../../components/Modalss';
import CustomHeader from '../../components/CustomHeader';
import {baseUrl, ShowToast} from '../../utils/constance';
import RenderHtml from 'react-native-render-html';

export default function Privacy() {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const {params} = useRoute();
  const [selected, setSelected] = useState(0);
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);
  // alert(JSON.stringify(params?.type))

  const data = [
    {
      name:
        params?.type == 'terms'
          ? 'Terms & Conditions Rule number 1'
          : 'Privacy Policy' + ' Rule number 1',
      image:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet pulvinar elementum tellus pretium mauris eleifend integer aliquam et. Tortor ultrices vitae mi integer amet, cursus nisi. Egestas risus laoreet nunc libero, tempor aenean.',
    },
    {
      name:
        params?.type == 'terms'
          ? 'Terms & Conditions Rule number 2'
          : 'Privacy Policy' + ' Rule number 2',
      image:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet pulvinar elementum tellus pretium mauris eleifend integer aliquam et. Tortor ultrices vitae mi integer amet, cursus nisi. Egestas risus laoreet nunc libero, tempor aenean.',
    },
    {
      name:
        params?.type == 'terms'
          ? 'Terms & Conditions Rule number 3'
          : 'Privacy Policy' + ' Rule number 3',
      image:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet pulvinar elementum tellus pretium mauris eleifend integer aliquam et. Tortor ultrices vitae mi integer amet, cursus nisi. Egestas risus laoreet nunc libero, tempor aenean.',
    },
    {
      name:
        params?.type == 'terms'
          ? 'Terms & Conditions Rule number 4'
          : 'Privacy Policy' + ' Rule number 4',
      image:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet pulvinar elementum tellus pretium mauris eleifend integer aliquam et. Tortor ultrices vitae mi integer amet, cursus nisi. Egestas risus laoreet nunc libero, tempor aenean.',
    },
    {
      name:
        params?.type == 'terms'
          ? 'Terms & Conditions Rule number 5'
          : 'Privacy Policy' + ' Rule number 5',
      image:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet pulvinar elementum tellus pretium mauris eleifend integer aliquam et. Tortor ultrices vitae mi integer amet, cursus nisi. Egestas risus laoreet nunc libero, tempor aenean.',
    },
    {
      name:
        params?.type == 'terms'
          ? 'Terms & Conditions Rule number 6'
          : 'Privacy Policy' + ' Rule number 6',
      image:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet pulvinar elementum tellus pretium mauris eleifend integer aliquam et. Tortor ultrices vitae mi integer amet, cursus nisi. Egestas risus laoreet nunc libero, tempor aenean.',
    },
    {
      name:
        params?.type == 'terms'
          ? 'Terms & Conditions Rule number 7'
          : 'Privacy Policy' + ' Rule number 7',
      image:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet pulvinar elementum tellus pretium mauris eleifend integer aliquam et. Tortor ultrices vitae mi integer amet, cursus nisi. Egestas risus laoreet nunc libero, tempor aenean.',
    },
    {
      name:
        params?.type == 'terms'
          ? 'Terms & Conditions Rule number 8'
          : 'Privacy Policy' + ' Rule number 8',
      image:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet pulvinar elementum tellus pretium mauris eleifend integer aliquam et. Tortor ultrices vitae mi integer amet, cursus nisi. Egestas risus laoreet nunc libero, tempor aenean.',
    },
    {
      name:
        params?.type == 'terms'
          ? 'Terms & Conditions Rule number 9'
          : 'Privacy Policy' + ' Rule number 9',
      image:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet pulvinar elementum tellus pretium mauris eleifend integer aliquam et. Tortor ultrices vitae mi integer amet, cursus nisi. Egestas risus laoreet nunc libero, tempor aenean.',
    },
  ];

  const get_privacy = async () => {
    try {
      setLoading(true);
      const response = await fetch(baseUrl + 'get_privacy_policy');
      const res = await response.json();
      //console.log(res);
      if (res.status == '1') {
        setDetail(res.result);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      //console.log(error);
      ShowToast(error);
    }
  };
  useEffect(() => {
    get_privacy();
  }, []);

  const ListItem = ({source, text, Check, onPress}) => {
    return (
      <View style={{marginBottom: 15}}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 14,
            color: theme.colors.white,
            fontFamily: 'Jost-Medium',
          }}>
          {text}
        </Text>

        <Text
          style={{
            fontSize: 12,
            color: '#948E82',
            fontFamily: 'Jost-Regular',
            lineHeight: 17,
            marginTop: 7,
          }}>
          {source}
        </Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.ButtonText}}>
      <CustomHeader
        title={
          params?.type == 'terms' ? 'Terms & Conditions' : 'Privacy Policy'
        }
      />
      <ScrollView>
        <View style={{marginHorizontal: 16}}>
          {/* <RenderHTML source={{html: detail.description}} /> */}
          <RenderHtml
            contentWidth={width}
            baseStyle={{color: 'white'}}
            source={{html: detail.description}}
          />
          {data.map((v, i) => (
            <ListItem
              key={i}
              onPress={() => setSelected(i + 1)}
              source={v.image}
              text={v.name}
            />
          ))}
        </View>
      </ScrollView>
    </View>
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
