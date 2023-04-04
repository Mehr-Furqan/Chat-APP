import { StyleSheet, Text, View, Dimensions, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native'
import React, { useState } from 'react'
import Header from '../../component/Header'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import PhoneNo from '../../component/phoneNo';
import MidleScrenText from '../../component/midleScrenText';
import Button from '../../component/Button';
import { Colors } from '../../component/Colors';
import axios from 'axios';
import { BaseUrl } from '../../component/Api';
import { Constrants } from '../../component/Constrants';
import Toast from 'react-native-simple-toast';


export default function SignUpNo({ navigation }) {
    const [phoneNo, SetPhoneNo] = useState()
    const [loading, setLoading] = useState(false)
    const log = () => {
        if (phoneNo.length < 13) {
            alert('Phone no is to Short')
        } else {
            setLoading(true)

            axios.post(Constrants.Api + Constrants.request_phone_otp, {
                phone: phoneNo
            }).then(async response => {

                if (response.data.code) {
                    console.log(response.data.code, 'data');
                    Toast.show(response.data.data);
                    setLoading(false)

                    navigation.navigate('Otp', { phone: phoneNo })
                }

            })
                .catch(error => {
                    console.log('error', phoneNo, error);
                    Toast.show('User Exist Already');
                    setLoading(false)

                })
        }
        //    navigation.navigate('Otp', { phone: phoneNo })

    }
    const GoBack = () => {
        navigation.goBack();
    }
    const getNo = (no) => {
        console.log('Get No', no);
        SetPhoneNo(no)




    }


    return (
        <SafeAreaView style={{ backgroundColor: Colors.MainBackground, flex: 1 }}>
            <StatusBar backgroundColor={Colors.Statusbar} barStyle={'dark-content'} />
            <Header
                OnPress={GoBack}
            />
            <MidleScrenText
                txt={'Enter Your Phone Number'}
                style={
                    {
                        marginTop: windowHeight * 0.13,
                        width: windowWidth * 0.78,

                    }}
            />
            <Text style={styles.decprition}>Please confirm your country code and enter your phone number</Text>
            <PhoneNo
                style={{
                    marginTop: '10%'

                }}
                FullNo={getNo}
            />
            <Button
                txt={'Continue'}
                OnPress={log}
                style={{ marginTop: windowHeight * 0.11 }}
                Loader={loading}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ alignSelf: 'center', marginTop: '60%' }}><Text style={{ color: Colors.TextGreen, fontSize: 14, fontWeight: '600' }}>Already Have account? Login </Text></TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    decprition: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '400',
        width: windowWidth * 0.80,
        alignSelf: 'center',
        // marginTop: '4%',
        lineHeight: 24,
        padding: '3%',
        color: Colors.TextGray

    }
})