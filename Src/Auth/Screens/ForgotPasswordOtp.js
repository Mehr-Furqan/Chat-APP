import React,{useState} from "react";
import { View, SafeAreaView, Dimensions, StyleSheet, Text, TouchableOpacity, StatusBar } from "react-native";
import Header from "../../component/Header";

import VerifyOtp from "./VerifyOtp";
import MidleScrenText from "../../component/midleScrenText";
import { Colors } from "../../component/Colors";
import Button from "../../component/Button";
import { Constrants } from "../../component/Constrants";
import axios from "axios";
import Toast from 'react-native-simple-toast';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FOtp = ({route, navigation }) => {
    const Phone = route.params.phone;
  const [code, setcode] = useState()
    const [loading,SetLoading]=useState(false)

    const GoBack = () => {
        navigation.goBack();
    }
     const getOtp = (e) => {
    console.log('ee', e.length, e);
    if (e.length === 4) {
      setcode(e)
    } else {
      setcode(e)
    //   alert('Otp is to Short')
    }
     }
    const otpHandler = () => {
    if (code.length !== 4) {
      alert('Enter 4 digit OTP')
    } else {
      SetLoading(true)
      console.log('else', code, code.length);
      axios.post(Constrants.Api + Constrants.forgotpassowrd_verify_phone_otp, {
        phone: Phone,
        otp: code

      }).then(async response => {

        if (response.data.code) {
          console.log(response, 'data');
          Toast.show(response.data.data);
      SetLoading(false)

          navigation.navigate('UpdatePassword', { phone: Phone })
          
        }

      })
        .catch(error => {
          console.log('error', code, error.response.error);
          Toast.show('Wrong OTP');
      SetLoading(false)


        })
      // navigation.navigate('SignupProfile')

    }
    }
  const Resend = () => {
     axios.post(Constrants.Api + Constrants.request_forgotPassword_phone_otp, {
                phone: Phone
            }).then(async response => {

                if (response.data.code) {
                    console.log(response.data.code, 'data');
                    Toast.show(response.data.data);

                }

            })
                .catch(error => {
                    Toast.show(error.response?.data);

                })
        }
  
    return (
        <SafeAreaView style={{ backgroundColor: Colors.MainBackground, flex: 1 }}>
            <StatusBar backgroundColor={Colors.Statusbar} barStyle={'dark-content'} />
            <Header
                OnPress={GoBack}
            />
            <MidleScrenText
                txt={'Enter Code'}
                style={
                    {
                        marginTop: windowHeight * 0.113,
                        width: windowWidth * 0.78,

                    }}
            />
        <Text style={styles.decprition}>We have sent you an SMS with the code to { Phone}</Text>
            <VerifyOtp
             otp={getOtp}/>
            <Button
                txt={'Continue'}
                   OnPress={otpHandler}
          style={{ marginTop: windowHeight * 0.11 }}
          Loader={loading}
            />
            <TouchableOpacity onPress={Resend} style={styles.resend}><Text style={{ color: Colors.TextGreen }}>Resend Code</Text></TouchableOpacity>
        </SafeAreaView>
    )
}
export default FOtp;
const styles = StyleSheet.create({
    decprition: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '400',
        width: windowWidth * 0.79,
        alignSelf: 'center',
        marginTop: '4%',
        lineHeight: 24,
        paddingTop: '5%',
        paddingHorizontal: '8%'

    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
    resend: {

        alignSelf: 'center',
        marginTop: windowHeight * 0.11,
    }
})