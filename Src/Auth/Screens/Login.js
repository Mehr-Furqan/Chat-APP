import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../../component/Header';
import ImgPicker from '../../component/ImgPick';
import PhoneNo from '../../component/phoneNo';
import TextInputView from '../../component/TextInput';
import Button from '../../component/Button';
import { Colors } from '../../component/Colors';
import { Constrants } from '../../component/Constrants';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import Socket from '../../component/Socket/Socket';
import { GetSocketData } from '../../redux/action/Action';
import { useSelector, useDispatch } from 'react-redux';

const Login = ({ navigation }) => {
  const [pwd, setPWD] = useState('');
  const [no, setNo] = useState();
  const [ProfileImg, SetProfileImg] = useState();
  const [loading, SetLoading] = useState(false);
  const actionDispatch = useDispatch();

  const pwdHandler = e => {
    setPWD(e);
  };
  const getNo = e => {
    setNo(e);
  };

  const GoBack = () => {
    navigation.goBack();
  };
  const getImg = e => {
    SetProfileImg(e);
  };
  const login = () => {
    SetLoading(true);
    if (no.length < 13 || pwd == '') {
      alert('Phone no is to Short');
    } else {
      axios
        .post(Constrants.Api + Constrants.simpleLogin, {
          phone: no,
          password: pwd,
          fcm_token: 'bhjdvuvuihuihrviviuhuihiiubyub',
        })
        .then(async response => {
          console.log(response.data.data, 'data');
          SetLoading(false);

          Toast.show('login');
          AsyncStorage.setItem('fcmTocken', response.data.data).then(
            Socket.setupSocket(data => {
              console.log(data, 'data::::::::::::::Socket-Login');
              actionDispatch(GetSocketData(response.data.data));

              Socket.messageReciver(data => {
                console.log(data, 'data::::::::::::::messageReciver');
                //   addMsg(dispatch, data);
                //   getallUsers(dispatch);
              }),
                // Socket.sendMediaMessage(data => {
                //   data?.media?.forEach(element => {
                //     console.log("sendMediaMessage", element);
                //     // addMsg(dispatch, element);
                //     // getallUsers(dispatch);
                //   });
                // }),

                // Socket.groupMedia(data => {
                //   data?.media?.forEach(element => {
                //     console.log("groupMedia", element);
                //     // addMsg(dispatch, element);
                //     // getallUsers(dispatch);
                //   });
                // }),
                Socket.newGroupMessage(data => {
                  console.log('newGroupMessage', data);
                  // addMsg(dispatch, data);
                  // getallUsers(dispatch);
                }),
                Socket.newGroupCreated(data => {
                  console.log('newGroupCreated', data);
                  // getallUsers(dispatch);
                  // addMsg(dispatch, data);
                }),
                Socket.removeFromGroup(data => {
                  console.log('removeFromGroup', data);
                  // setInitialroute(stackConstants?.bottom);
                  // getallUsers(dispatch);
                  // dispatch(Removefromgroup(data));
                  // addMsg(dispatch, data);
                }),
                Socket.addNewmember(data => {
                  console.log('addNewmember', data);
                  // getallUsers(dispatch);
                  // dispatch(Removefromgroup(data));
                  // addMsg(dispatch, data);
                }),
                Socket.userOnlineStatus(data => {
                  console.log('login userOnlineStatus login', data);
                  // getallUsers(dispatch);
                  // addMsg(dispatch, data);
                }),
                Socket.seenMessageOneToOne(data => {
                  console.log('seenMessageOneToOne', data);
                  console.log('listen', data);
                  // getallUsers(dispatch);
                  // addMsg(dispatch, data);
                  // markSeen(dispatch, data);
                });
            }),
            SetLoading(false),

            navigation.navigate('App'),
          );
        })
        .catch(error => {
          console.log('error', error);
          // Toast.show('error');
          SetLoading(false);
        });
    }
  };
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('fcmTocken', value);
    } catch (e) {
      // saving error
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: Colors.MainBackground, flex: 1 }}>
      <StatusBar backgroundColor={Colors.Statusbar} barStyle={'dark-content'} />
      <Header txt={'Login'} OnPress={GoBack} />
      <ImgPicker getImg={getImg} />
      <PhoneNo
        style={{
          marginTop: '10%',
        }}
        FullNo={getNo}
      />
      <View style={{ marginTop: '4%' }}>
        <TextInputView
          value={pwd}
          onChangeText={e => pwdHandler(e)}
          placeHolder={'Password (Required)'}
          pwd={true}
        />
      </View>

      <Button
        txt={'Login'}
        OnPress={login}
        style={{ marginTop: '15%' }}
        Loader={loading}
      />
      <TouchableOpacity
        style={{ justifyContent: 'center', paddingTop: '5%' }}
        onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={{ color: Colors.TextGreen, alignSelf: 'center' }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
