import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Platform,
  StatusBar,
  AsyncStorage,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { assets } from '../component/assets';
import { Colors } from '../component/Colors';

import { useSelector, useDispatch } from 'react-redux';
import { GetChatMessages, Clear, unSeenCounter, OfflineMediaAction } from '../redux/action/Action';
import axios from 'axios';
import { Constrants } from '../component/Constrants';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import { heightPixel, widthPixel } from '../component/Physics/Physics';
import { useLayoutEffect } from 'react';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


var potrate;
const Header = ({ OnPress, Img, Name, Time, Online }) => {
  //   console.log('img', Img);
  return (
    <SafeAreaView style={styles.HeaderContaineer}>
      <View style={styles.HeaderLeftContainer}>
        <TouchableOpacity onPress={OnPress}>

          <Image style={styles.BackIcon} source={assets.BackIcon}></Image>
        </TouchableOpacity>

        {/* <View style={styles.HeaderNotify}><Text style={{ textAlign: 'center', fontSize: 11, }}>{props.txt}</Text></View> */}
        <View style={{ left: 15, alignSelf: 'center' }}>
          <FastImage
            style={styles.HeaderImage}
            source={{
              uri: Img,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />

          {Online ? (
            <Image style={styles.HeaderOnline} source={assets.Bluedot} />
          ) : (
            <></>
          )}
        </View>
      </View>

      <View style={styles.HeaderTextContainer}>
        <Text style={styles.HeaderText}>{Name}</Text>
        <Text style={styles.HeaderTextBasic}>{Time}</Text>
      </View>
    </SafeAreaView>
  );
};


const UserChatScreen = ({ route, navigation }) => {
  const User = route?.params?.item;
  const [messages, setmessages] = useState();
  const [openModel, setopenModel] = useState();
  const [ProfileImg, SetProfileImg] = useState()
  const [clicked, setCliked] = useState(false);
  const [imageloaging, setImageloading] = useState(false);
  const [showimage, setshowimage] = useState('');
  const [player, setplayer] = useState()
  const [msges, setmesges] = useState('');
  const actionDispatch = useDispatch();
  const [OfflineMedia, SetOfflineMedia] = useState([]);
  const GetMessagesRedux = useSelector(state => state.ChatMessagess);

  useLayoutEffect(() => {


    setmessages(GetMessagesRedux);


  }, [GetMessagesRedux])
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "READ_EXTERNAL_STORAGE",
          message:
            "READ_EXTERNAL_STORAGE" +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        setopenModel(!openModel)
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    console.log(OfflineMedia);


  }, [OfflineMedia])








  useEffect(() => {
    Getmessages(User);
  }, [User]);
  // useEffect(() => {
  //   setmessages(GetMessagesRedux);
  //   // console.log(GetMessagesRedux, 'GetMessagesReduxGetMessagesRedux');
  //   // console.log('GetMessagesRedux', User);

  // }, [GetMessagesRedux]);
  useEffect(() => {
    // console.log(heightPixel(191), "height");
    console.log('messages', messages);
  }, [messages]);
  const Getmessages = n => {
    actionDispatch(GetChatMessages(n));
  };

  const snd = () => {
    setmessages([


      {
        id: messages.length + 1,
        attatchment_name: null,
        created_at: '2022-07-01T19:01:34.097Z',
        group_id: 'cl52532cd58910mt6qhnpb0mr',

        media_caption: showimage ? showimage : null,
        media_type: showimage ? 'MEDIA' : null,
        message_body: msges,
        message_type: showimage ? 'MEDIA' : 'TEXT',
        reciever_id: User.user_id,
        seen: false,
        sender_id: 'cl46mmqpe00020mypqjyo7jo4',
        updated_at: '2022-07-01T19:01:34.098',
        clk: true,
      }, ...messages,

    ]);
    setmesges('');
    sndButtonHandler();
  };
  const sndPic = async (e) => {
    const token = await AsyncStorage.getItem('fcmTocken');
    var typ = e.type.split('/')
    var Ftype = typ[0] === 'image' ? 'PICTURE' : 'VIDEO';
    console.log('sndPic', typ[0], Ftype);
    let formData = new FormData();
    formData.append('is_group_chat', false);
    formData.append('reciever_id', User.user_id);
    formData.append('media_type', Ftype);
    formData.append('message_type', 'MEDIA');
    formData.append('media', {
      uri: e.uri,
      type: e.type,
      name: e.fileName,
    });
    axios
      .post(
        Constrants.Api + Constrants.sendMessages,
        formData,



        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      )
      .then(async response => {
        console.log('MESSAGE SEND', response?.data?.data,);
        Getmessages(User);
        // setshowimage('')
      })
      .catch(error => {
        console.log('error:MESSAGE SEND', error.response);
      });
    setmesges(null);
  };
  const sndButtonHandler = async () => {
    const token = await AsyncStorage.getItem('fcmTocken');
    // console.log('token', token);

    axios
      .post(
        Constrants.Api + Constrants.sendMessages,

        {
          is_group_chat: User.is_group_chat,
          reciever_id: User.user_id,
          message_type: 'TEXT',
          message_body: msges,
          media_caption: " null",

        },


        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      )
      .then(response => {
        console.log(response?.data?.data, 'MESSENDSAGE');
        Getmessages(User);
      })
      .catch(error => {
        console.log('error', error.response);
      });
    setmesges(null);
  };
  const Nav = () => {
    navigation.navigate('Chat');
    actionDispatch(Clear());
  };
  useFocusEffect(() => {
    // console.log("focused", User);

    actionDispatch(unSeenCounter(User?.user_id))

  })
  const opencamera = async () => {
    setshowimage(),
      setCliked(true);
    setTimeout(() => {
      setImageloading(true);

      ImagePicker.launchCamera({
        mediaType: 'mixed',
        includeBase64: false,
        height: 400,
        width: 400,
        quality: 1,
      }).then(async response => {

        setImageloading(false);
        if (!response.didCancel) {
          setshowimage(response?.assets[0])

          sndPic(response?.assets[0]);


          console.log('image', response?.assets[0]);
        }
        setCliked(false);
      });
    }, 1000);
  };
  const openGallery = async () => {

    setshowimage();

    setCliked(true);
    setTimeout(() => {
      setImageloading(true);

      ImagePicker.launchImageLibrary({
        mediaType: 'mixed',
        includeBase64: false,
        height: 400,
        width: 400,
        quality: 1,
      }).then(async response => {

        setImageloading(false);
        if (!response.didCancel) {
          setshowimage(response?.assets[0]);
          console.log('imageGallery', response?.assets[0]);
          sndPic(response?.assets[0]);
          console.log('uri', response?.assets[0]?.uri);
          actionDispatch(OfflineMediaAction({ uri: response?.assets[0]?.uri, fileName: response?.assets[0]?.fileName }))
          // console.log('type', response?.assets[0]?.type);
        }
        setCliked(false);
      });
    }, 1000);
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.MainBackground }}>

      <StatusBar backgroundColor={Colors.Statusbar} barStyle={'dark-content'} />
      <Header
        Img={User?.profile_img}
        txt={'6'}
        Name={User?.username}
        OnPress={Nav}
        Time={moment().startOf(User?.online_status_time).fromNow()}
        Online={User?.online_status}
      />
      <View style={styles.Line} />
      {/* <View style={styles.DateIcon}>
        <Text style={styles.DateText}>redjmbjhvkjvkjv 1</Text>
      </View> */}
      <View style={{ height: '83%', bottom: '1%', }}>
        <FlatList
          inverted={true}

          data={messages}
          // extraData={pendingMsg}
          renderItem={({ item, key }) => {





            return (
              <View>
                {User.user_id != item.reciever_id ? (

                  <View style={styles.senderContainer}>
                    <FastImage
                      style={styles.SenderImg}
                      source={{
                        uri: User?.profile_img,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.cover}

                    />

                    <View style={{ marginLeft: '3%' }}>


                      {item?.attatchment ?
                        <TouchableOpacity onPress={() => navigation.navigate('VideoPlay', { item: item })} style={styles.userImgContainer}>



                          <FastImage
                            style={[{
                              height: heightPixel(300),
                              width: widthPixel(250),
                            }, styles.msgImage]}
                            source={{
                              uri: item.attatchment,
                              priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                          />


                          <View style={styles.CheckTimeImg}>


                            {item.clk ? (
                              <Image style={styles.chk} source={assets.wait} />
                            ) : (
                              <Image
                                style={styles.chk}
                                source={item.seen ? assets.Checkall : assets.Checkmark}
                              />
                            )}
                            <Text style={styles.msgTime}>{moment(item.created_at).format('LT')}</Text>
                          </View>
                        </TouchableOpacity> :
                        <TouchableOpacity style={styles.textContanerSender}>
                          <Text style={styles.msgText}>{item.message_body}</Text>
                          <Text style={styles.msgTime}>
                            {moment(item.updated_at).format('LT')}
                          </Text>
                        </TouchableOpacity>}

                    </View>
                  </View>
                ) : (
                  <View style={styles.UserContainer}>
                    {item.attatchment ?
                      <TouchableOpacity onPress={() => navigation.navigate('VideoPlay', { item: item })} style={styles.userImgContainer}>

                        <FastImage
                          style={[{
                            height: heightPixel(300),
                            width: widthPixel(250),
                          }, styles.msgImage]}
                          source={{
                            uri: item.attatchment,
                            priority: FastImage.priority.normal,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />


                        <View style={styles.CheckTimeImg}>


                          {item.clk ? (
                            <Image style={styles.chk} source={assets.wait} />
                          ) : (
                            <Image
                              style={styles.chk}
                              source={item.seen ? assets.Checkall : assets.Checkmark}
                            />
                          )}
                          <Text style={styles.msgTime}>{moment(item.created_at).format('LT')}</Text>
                        </View>
                      </TouchableOpacity> :
                      <TouchableOpacity style={styles.userTextContainer}>


                        <Text style={styles.msgText}>{item.message_body}</Text>

                        <View style={styles.CheckTime}>


                          {item.clk ? (
                            <Image style={styles.chk} source={assets.wait} />
                          ) : (
                            <Image
                              style={styles.chk}
                              source={item.seen ? assets.Checkall : assets.Checkmark}
                            />
                          )}
                          <Text style={styles.msgTime}>{moment(item.created_at).format('LT')}</Text>
                        </View>
                      </TouchableOpacity>}

                  </View>
                )}
              </View>
            );
          }
          }
        /></View>
      <View
        style={{
          bottom: Platform.OS === 'ios' ? '3%' : 0,
          position: 'absolute',
          alignSelf: 'center',
          backgroundColor: Colors.MainBackground,
          // height: windowHeight * 0.1,
          // backgroundColor: 'red',
        }}>

        {openModel ?
          <View

            style={{ width: windowWidth, height: windowHeight * 0.1, backgroundColor: 'transparent', blurEffect: 'systemMaterialLight', borderRadius: 10, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', zIndex: 1000, }}>

            <TouchableOpacity onPress={openGallery}><Image style={{ height: 50, width: 50, resizeMode: 'contain' }} source={assets.gallery} /></TouchableOpacity>
            <TouchableOpacity onPress={opencamera}><Image style={{ height: 50, width: 50, resizeMode: 'contain' }} source={assets.File} /></TouchableOpacity>


          </View> : <></>}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
          }}>
          <TouchableOpacity onPress={() => requestCameraPermission()} style={{ alignSelf: 'center' }}>
            <Image style={styles.Imgfile} source={assets.File} />
          </TouchableOpacity>
          <TouchableOpacity style={{ alignSelf: 'center' }}>
            <Image style={styles.Imgfile} source={assets.mic} />
          </TouchableOpacity>

          <View
            style={{
              width: '75%',

              borderRadius: 20,
              borderColor: Colors.ChatBorder,
              borderWidth: 1,
            }}>
            <TextInput
              // clearButtonMode="always"


              style={{
                // backgroundColor: Colors.TextInputBackground,
                width: '75%',
                paddingVertical: Platform.OS === 'ios' ? '4%' : '2%',
                paddingHorizontal: '2%',
                fontSize: 14,
                fontWeight: '500',
                color: Colors.textBlack,
              }}
              placeholder={'Send a message'}
              placeholderTextColor={Colors.TextGray}
              value={msges}
              onChangeText={e => setmesges(e)}

            />
          </View>
          <TouchableOpacity
            onPress={snd}
            // onPress={onSubmit_handler}
            style={{ alignSelf: 'center', flexDirection: 'row' }}>
            <Image style={styles.Imgfile} source={assets.Shape} />
          </TouchableOpacity>
        </View>
      </View>

      {/* <Image style={{ height: windowHeight, width: windowWidth, zIndex: 1, flex: 1 }} source={showimage}></Image>d */}
    </SafeAreaView >
  );
};

export default UserChatScreen;

const styles = StyleSheet.create({
  HeaderNotify: {
    backgroundColor: Colors.HeaderNotificationRed,
    height: 16,
    // width: 100,
    minWidth: 16,
    borderRadius: 100,
    padding: '1%',
    paddingHorizontal: '2%',
    justifyContent: 'center',
    // bottom: '2%',
    top: -7,
  },
  HeaderLeftContainer: {
    // width: 'null',
    flexDirection: 'row',
    alignContent: 'center',
  },
  HeaderContaineer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: '5%',
    marginTop: '2%',
    backgroundColor: Colors.MainBackground
  },
  BackIcon: {
    height: 20,
    width: 15,
    resizeMode: 'contain',
    top: 8,
  },
  HeaderText: {
    color: Colors.textBlack,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'left',
  },
  HeaderTextBasic: {
    color: Colors.TextGray,
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
  HeaderTextContainer: {
    // justifyContent: 'center',
    marginLeft: '8%',
  },
  HeaderImage: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  HeaderOnline: {
    tintColor: '#20E070',
    height: 10,
    width: 10,
    position: 'absolute',
    right: 0,
  },
  DateIcon: {
    backgroundColor: Colors.DateBackground,
    borderRadius: 8,
    paddingHorizontal: '2%',
    paddingVertical: '1%',
    width: '13%',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 100,
  },
  DateText: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.textWhite,
    zIndex: 1,
  },
  Line: {
    borderBottomColor: Colors.ChatBorder,
    borderBottomWidth: 1,
    paddingVertical: '1%',
    marginVertical: '2%',
    marginHorizontal: '2%',
  },
  senderContainer: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    // marginBottom: '5%',
    zIndex: 1,

    marginTop: '3%',
  },
  SenderImg: {
    height: 32,
    width: 32,
    borderRadius: 32 / 2,
    alignSelf: 'flex-end',
    bottom: 5,
  },
  textContanerSender: {
    maxWidth: windowWidth * 0.72,
    // minHeight: windowHeight * 0.06,
    borderColor: Colors.ChatBorder,
    borderWidth: 1,
    borderBottomRightRadius: 16,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    justifyContent: 'flex-end',
    // paddingHorizontal: '4%',
    // paddingVertical: '5%'
    padding: '5%',
    backgroundColor: Colors.ReciveMsgBackGround,
    flexDirection: 'row-reverse'

  },
  userImgContainer: {

    borderColor: '#ecebeb',
    flexDirection: 'row',
    borderWidth: 4,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 16,
    // justifyContent: 'flex-start',
    // paddingHorizontal: '4%',
    // paddingVertical: '5%'
    // padding: '3%',
    alignSelf: 'flex-end',
    // backgroundColor: 'black',
    // backgroundColor: 'red',

    overflow: 'hidden',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'

  },
  userTextContainer: {
    maxWidth: windowWidth * 0.72,
    minHeight: windowHeight * 0.04,
    borderColor: Colors.ChatBorder,
    flexDirection: 'row',
    borderWidth: 1,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    // justifyContent: 'flex-start',
    // paddingHorizontal: '4%',
    // paddingVertical: '5%'
    padding: '3%',
    alignSelf: 'flex-end',
    backgroundColor: Colors.SendMsgBackGround,
    // backgroundColor: 'red'

    overflow: 'hidden',
    flexWrap: 'wrap',
    justifyContent: 'flex-end'

  },

  CheckTime: {
    flexDirection: 'row-reverse',

    // backgroundColor: 'red',
    flexShrink: 1,
    alignItems: 'baseline'
    // height: '100%',
    // zIndex: 1,
  },
  CheckTimeImg: {
    flexDirection: 'row-reverse',
    height: '5%',
    width: '15%',
    backgroundColor: '#00000025',
    flexShrink: 1,
    bottom: 0,
    position: 'absolute',
    margin: '1%',
    right: 5
  },
  UserContainer: {
    marginHorizontal: '5%',
    marginTop: '3%',
    // backgroundColor: 'red'
  },

  chk: {

    height: 16,
    width: 16,
    marginTop: '2%',
  },
  msgText: {

    color: Colors.textBlack,
    fontSize: 14,
    fontWeight: '500',
    paddingLeft: '2%',
    paddingRight: '2%',

    textAlign: "left",
    alignSelf: 'flex-start',
    // backgroundColor: 'blue',








  },
  msgTime: {
    color: 'white',
    fontSize: 12,
    marginTop: '2%',


  },
  Imgfile: {
    tintColor: Colors.tintBlack,
    height: 25,
    width: 25,
    resizeMode: 'contain',
    // backgroundColor:'red'
  },
  msgImage: {

    resizeMode: 'contain'
  },

});
