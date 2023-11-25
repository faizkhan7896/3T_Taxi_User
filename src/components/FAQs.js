import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {ScrollView} from 'react-native';
import {post_api} from '../utils/Constants';
import {baseUrl} from '../utils/constance';
import Loader from './Loader';
import localizationStrings from '../utils/Localization';
import {Dimensions} from 'react-native';
import RenderHTML from 'react-native-render-html';

const FAQs = () => {
  const [select, setSelect] = useState('');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const dimension = useWindowDimensions();
  // alert(JSON.stringify(list[0].answer.split('<p>')));

  const get_faq = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        baseUrl + 'faq_list_user?language=' + localizationStrings.getLanguage(),

        {method: 'POST'},
      );
      const res = await response.json();
      if (res.status == 1) {
        setList(res.result);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setList([]);
    get_faq();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={{
        borderTopWidth: 1,
        borderTopColor: '#36342F',
        marginHorizontal: 16,
        marginTop: 20,
      }}>
      {loading && <Loader />}
      {list.map((v, i) => (
        <View
          key={v.id}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#36342F',
            paddingVertical: 13,
          }}>
          <TouchableOpacity
            onPress={() => setSelect(i == select ? null : i)}
            style={{flexDirection: 'row'}}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 14,
                fontFamily: 'Jost-Medium',
                color: '#BAB6AE',
                // flex: 1,
                textAlign: 'left',
                width: Dimensions.get('window').width - 60,
              }}>
              {v.question}
            </Text>
            <Image
              source={
                i == select
                  ? require('../assets/icons/using/minus.png')
                  : require('../assets/icons/using/plus.png')
              }
              style={{height: 19, width: 19, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          {i == select && (
            <RenderHTML
              baseStyle={{
                fontFamily: 'Poppins-Regular',
                color: '#B4B4B4',
                fontSize: 14,
              }}
              contentWidth={dimension.width - 50}
              source={{html: v.answer}}
            />
          )}
          {/* {i == select && (
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Jost-Regular',
                color: '#948E82',
                marginTop: 12,
                // textAlign: 'left',
              }}>
              {v.answer?.split('</p>\r\n')}
            </Text>
          )} */}
        </View>
      ))}
    </ScrollView>
  );
};

export default FAQs;

const styles = StyleSheet.create({});
