import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {mapsApiKey} from '../utils/constance';
import {useSelector} from 'react-redux';

const AddressPickup = ({placheholderText, fetchAddress, editable}) => {
  const {userId, countryId} = useSelector(state => state?.user);
  // alert(JSON.stringify(countryId))

  const onPressAddress = (data, details) => {
    // console.log('details==>>>>', details);

    // let resLength = details.address_components;
    // let zipCode = '';

    // let filtersResCity = details.address_components.filter(val => {
    //   if (val.types.includes('locality') || val.types.includes('sublocality')) {
    //     return val;
    //   }
    //   if (val.types.includes('postal_code')) {
    //     let postalCode = val.long_name;
    //     zipCode = postalCode;
    //   }
    //   return false;
    // });

    // let dataTextCityObj =
    //   filtersResCity.length > 0
    //     ? filtersResCity[0]
    //     : details.address_components[
    //         resLength > 1 ? resLength - 2 : resLength - 1
    //       ];

    // let cityText =
    //   dataTextCityObj.long_name && dataTextCityObj.long_name.length > 17
    //     ? dataTextCityObj.short_name
    //     : dataTextCityObj.long_name;

    // console.log("zip cod found", zipCode)
    // console.log("city namte", cityText)

    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    const address = details.formatted_address;
    fetchAddress(lat, lng, /* zipCode, cityText, */ address);
  };
  const country =
    countryId == '4'
      ? 'in'
      : countryId == '9'
      ? 'no'
      : countryId == '10'
      ? 'egy'
      : countryId == '11' && 'ksa';

  const country_language =
    countryId == '4'
      ? 'en'
      : countryId == '9'
      ? 'en'
      : countryId == '10'
      ? 'ar'
      : countryId == '11' && 'ar';

  // alert(countryId)

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={placheholderText}
        onPress={onPressAddress}
        fetchDetails={true}
        query={{
          key: mapsApiKey,
          language: country_language,
          components: 'country:' + country,

        }}
        textInputProps={{placeholderTextColor: '#FFFFFF4D', editable: editable}}
        styles={{
          textInputContainer: styles.containerStyle,
          textInput: styles.textInputStyle,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerStyle: {
    backgroundColor: '#25231F',
  },
  textInputStyle: {
    height: 45,
    color: '#FFFFFF',
    fontSize: 16,
    backgroundColor: '#25231F',
  },
});

export default AddressPickup;












