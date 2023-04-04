import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import CountryPicker, { getAllCountries, getCallingCode } from 'react-native-country-picker-modal'
import { Colors } from './Colors';
import { colors } from '@mui/material';

export default function PhoneNo(props) {
    const [country, setCountry] = useState('+92')
    const [countryCode, setCountryCode] = useState()
    const [no, setNo] = useState()


    const onSelect = (country) => {
        setCountryCode(country.cca2)
        setCountry(country)
    }

    useEffect(() => {
        console.log("country", country);
        console.log("countryCode", countryCode);
        props.FullNo(country + no)

    })
    return (
        <View style={[styles.container, props.style]}>
            <View style={styles.Cpick}>

                <CountryPicker
                    placeholder={
                        <Text style={{ color: Colors.textBlack, }}>{country}</Text>
                    }
                    translation="eng"
                    containerButtonStyle={styles.countrypicker}
                    withCountryNameButton={true}
                    withCallingCode={true}
                    withAlphaFilter={true}
                    withFlag={true}
                    withFilter={true}
                    withFlagButton={true}
                    onSelect={val => {
                        setCountry('+' + val?.callingCode);
                    }}
                />
            </View>
            <TextInput
                style={styles.PhoneNo}
                value={no}
                onChangeText={(e) => setNo(e)}
                placeholder={'Phone Number'}
                placeholderTextColor={'gray'}
                // keyboardType={"numeric"}
                keyboardType="phone-pad"
                textContentType={'telephoneNumber'}
                maxLength={10}



            ></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    Cpick: {
        backgroundColor: Colors.TextInputBackground,
        height: windowHeight * 0.044,
        width: windowWidth * 0.20,
        borderRadius: 4,
        marginRight: '1%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    PhoneNo: {
        // height: windowHeight * 0.044,
        width: windowWidth * 0.65,
        backgroundColor: Colors.TextInputBackground,
        borderRadius: 4,
        marginLeft: '1%',
        color: Colors.textBlack,
        fontSize: 14,
        fontWeight: '600',
        paddingLeft: '2%',
        paddingVertical: '.9%'

    }
})