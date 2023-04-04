import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Dimensions, StyleSheet, Text, TouchableOpacity, StatusBar } from "react-native";
import Header from "./Header";
import Button from "./Button";
import VerifyOtp from "../Auth/Screens/VerifyOtp";
import MidleScrenText from "./midleScrenText";
import { Colors } from "./Colors";
import { Constrants } from "./Constrants";
import axios from "axios";
import Toast from 'react-native-simple-toast';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Otp = ({ route, navigation }) => {
  const Phone = route.params.phone;
  const [code, setcode] = useState()
  const [loading, setLoading] = useState(false)

  const log = () => {
    navigation.navigate('SignupProfile')
    console.log('Next');
  }
  const GoBack = () => {
    navigation.goBack();
  }
  const getOtp = (e) => {
    console.log('ee', e.length, e);
    if (e.length === 4) {
      setcode(e)
    } else {
      setcode(e)
      // alert('Otp is to Short')
    }
  }
 
  const otpHandler = () => {
    if (code.length !== 4) {
      alert('Enter 4 digit OTP')
    } else {
      setLoading(true)
      45
      console.log('else', code, code.length, Phone);
      axios.post(Constrants.Api + Constrants.verify_phone_otp, {
        phone: Phone,
        otp: code
      })
        .then(async response => {
          console.log(response.data.code, 'data');

          if (response.data.code == '200') {
            Toast.show(response.data.data);
            console.log(response.data.code, 'data2');
            setLoading(false)

            navigation.navigate('SignupProfile', { phone: Phone })
          }

        })
        .catch(error => {
          console.log('error', code, error);
          Toast.show('error');

        })
      // navigation.navigate('SignupProfile')

    }
  }
  // useEffect(() => {
  //   console.log('param', itemId);
  // })

  const ResendOtp = () => {
  
            axios.post(Constrants.Api + Constrants.request_phone_otp, {
                phone: Phone
            }).then(async response => {

                if (response.data.code) {
                    console.log(response.data.code, 'data');
                    Toast.show(response.data.data);

                }

            })
                .catch(error => {
                    Toast.show(error.response.data);
setLoading(false)

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
        otp={getOtp}
      />
      <Button
        txt={'Next'}
        OnPress={otpHandler}
        // OnPress={log}
        style={{ marginTop: windowHeight * 0.11 }}
        Loader={loading}
      />



      <TouchableOpacity onPress={ResendOtp} style={styles.resend}><Text style={{ color: Colors.TextGreen }}>Resend Code</Text></TouchableOpacity>
    </SafeAreaView>
  )
}
export default Otp;
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
    paddingHorizontal: '8%',
    color: Colors.TextGray

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