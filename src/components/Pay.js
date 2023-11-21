import { View, Text, useWindowDimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { theme } from '../utils/theme';
import { useNavigation } from '@react-navigation/native';
export default function SeupProfile({
    source, text, Check, onPress, tag, item, color, visible, font, visibleTwo
}) {
    const dimension = useWindowDimensions();
    const navigation = useNavigation();
    return (
        <View style={{ flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-between', marginVertical: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {!visible &&
                    <Image
                        source={tag}
                        style={{
                            marginRight: 10,
                            resizeMode: 'contain',
                            height: 25,
                            width: 35
                        }} />}

                <Text style={{ color: '#BAB6AE', fontSize: font || 12 }}> {text}</Text>
            </View>

            <TouchableOpacity onPress={onPress}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: color || "yellow", fontSize: font || 12 }}> {Check}
                    </Text>
                    {!visibleTwo &&
                        <Image
                            source={source}
                            style={{
                                marginLeft: 5,
                                resizeMode: 'contain',
                                height: 20,
                                width: 8
                            }} />}
                </View>
            </TouchableOpacity>


        </View>

    );
};
