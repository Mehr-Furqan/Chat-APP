import { StyleSheet, Text, SafeAreaView, View, StatusBar } from 'react-native'
import React, { useState } from 'react'
import Header from '../../component/Header'
import ImgPicker from '../../component/ImgPick'
import PhoneNo from '../../component/phoneNo'
import TextInputView from '../../component/TextInput'
import Button from '../../component/Button'
import { assets } from '../../component/assets'
import { Colors } from '../../component/Colors'
import { Constrants } from '../../component/Constrants'
import axios from 'axios'
import Toast from 'react-native-simple-toast';
const UpdatePassword = ({route, navigation }) => {
      const Phone = route.params.phone;
    const [ProfileImg, SetProfileImg] = useState()
    const [loading,SetLoading]=useState(false)

const getImg = (e) => {
        SetProfileImg(e)
    }
    const [pwd, setPWD] = useState('')
    const [Vpwd, setVPWD] = useState('')

    const pwdHandler = (e) => {
        setPWD(e)
    }
      const VpwdHandler = (e) => {
        setVPWD(e)
    }
    const log = () => {
        if (pwd!=Vpwd) {
            alert('password Not Matched')
        } else {
            SetLoading(true)
            axios.post(Constrants.Api + Constrants.UpdatePassword, {
                phone: Phone,
                password: Vpwd
            }).then(async response => {

                if (response.data.code == 200) {
                    console.log(response.data.data, 'data');
                    Toast.show(response.data.data);
            SetLoading(false)
                    
                    navigation.navigate('Login')

                }

            })
                .catch(error => {
                    console.log('error------',Phone,Vpwd, error);
                    Toast.show('error');
            SetLoading(false)

                })

            // navigation.navigate('Login')
        }
    }
    const GoBack = () => {
        navigation.goBack();
    }
    return (
        <SafeAreaView style={{ backgroundColor: Colors.MainBackground, flex: 1 }}>
            <StatusBar backgroundColor={Colors.Statusbar} barStyle={'dark-content'} />
            <Header
                txt={'Update Password'}
                OnPress={GoBack} />
            <ImgPicker
                getImg={getImg}
                
            />
            <View style={{ marginTop: '4%' }}>
                <TextInputView
                    value={pwd}
                    onChangeText={(e) => pwdHandler(e)}
                    placeHolder={'Password (Required)'}
                    pwd={true}
                /></View>
            <View style={{ marginTop: '2%' }}>
                <TextInputView
                    value={Vpwd}
                    onChangeText={(e) => VpwdHandler(e)}
                    placeHolder={'Password (Required)'}
                    pwd={true}
                /></View>
            <Button
                txt={'Save'}
                OnPress={log}
                style={{ marginTop: '15%' }}
                Loader={loading}
            />
        </SafeAreaView>
    )
}

export default UpdatePassword

const styles = StyleSheet.create({})