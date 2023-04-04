import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Dimensions, StatusBar ,AsyncStorage} from "react-native"
import ImgPicker from "../../component/ImgPick";
import Header from "../../component/Header";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import TextInputView from "../../component/TextInput";
import Button from "../../component/Button";
import { Colors } from "../../component/Colors";
import { Constrants } from "../../component/Constrants";
import axios from "axios";
import Toast from 'react-native-simple-toast';

const SignupProfile = ({ route, navigation }) => {
    const Phone = route.params ? route.params.phone :'';
    
    const [username, setuserName] = useState('',);
    const [pwd, setPWD] = useState('')
    const [ProfileImg, SetProfileImg] = useState()
    const [loading,setLoading]=useState(false)
    
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', pwd);
    formData.append('phone', Phone);
    formData.append('profile', {
        uri: ProfileImg?.uri,
        type: ProfileImg?.type,
        name: ProfileImg?.fileName,
        fcm_token:"kufjrhiubjutlbuigjbgriupbiurbuirbiuepb"
    })
    formData.append('fcm_token', 'kufjrhiubjutlbuigjbgriupbiurbuirbiuepb');
    ;
    const usernamehandler = (e) => {
        setuserName(e)

    }
    const pwdHandler = (e) => {
        setPWD(e)

    }
    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('fcmTocken', value)

        } catch (e) {
            // saving error
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('fcmTocken')
            console.log("jason",jsonValue);
        } catch (e) {
            console.log('token not stored');
        }
    }

    console.log('phonerrrr', Phone);
    const log = () => {
        if (ProfileImg === "") {
            alert('Please Select a Profile Image')
        } else if (pwd === "" || username === "") {
            alert('Wronge UserName Or Password')
        } else {
        setLoading(true)
           
                
                axios({
    method: 'post',
    url: 'https://defigram-testimg.herokuapp.com/api/signUpUser',
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
    
}).then(  response=> {
                console.log('response', response.data.code);
                // const dataResponse = await response.json();
                if (response?.data.code=='200') {
                    console.log(response?.data.code, 'data');
                    storeData(response?.data.data)
                    // await AsyncStorage.setItem('fcmTocken', JSON.stringify(response?._bodyBlob.data.blobId),)
                    Toast.show('sign up succefully');
                    // console.log(await AsyncStorage.getItem('fcmTocken',),"brt");
setLoading(false)
                }
                    navigation.navigate('Login')

            })
                .catch(error => {
                    console.log('error', error.response.data);
                    Toast.show(error.response.data.error);
                    // navigation.navigate('Login')
setLoading(false)
                })
        }
    }
    const GoBack = () => {
        navigation.goBack();
    }
    const getImg = (e) => {
        SetProfileImg(e),
            console.log('img', e);
    }
    useEffect(() => {
        console.log(ProfileImg, 'ProfileImg');
        console.log('userName', username, pwd);
        getData();
            // console.log('jsonValue', fcmTocken);
    }, [ProfileImg])
    return (
        <SafeAreaView style={{ backgroundColor: Colors.MainBackground, flex: 1 }}>
            <StatusBar backgroundColor={Colors.Statusbar} barStyle={'dark-content'} />
            <Header
                txt={'Your Profile'}
                OnPress={GoBack} />
            <ImgPicker
                getImg={getImg}
                img={true}
            />
            <View style={{ marginTop: '10%' }}>
                <TextInputView
                    value={username}
                    onChangeText={(e) => usernamehandler(e)}
                    placeHolder={'Full Name (Required)'}
                // pwd={true}
                />
                <TextInputView
                    value={pwd}
                    onChangeText={(e) => pwdHandler(e)}
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
export default SignupProfile;