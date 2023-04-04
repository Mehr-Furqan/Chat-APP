import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  TouchableWithoutFeedback,
  Platform,
  AsyncStorage,
  BackHandler,
} from 'react-native';
import jwt_decode from "jwt-decode";
import React, { useState, useEffect } from 'react';
import { Colors } from '../component/Colors';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Dimensions } from 'react-native';
import { assets } from '../component/assets';
import { GetUsers, GetResentChat, Clear_Media } from '../redux/action/Action';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import { CALLBACK_TYPE } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Chat = ({ navigation }) => {
  useEffect(() => {
    redy();

    // console.log('fgdrtt', Jwt);
  }, []);
  const actionDispatch = useDispatch();
  const Seata = useSelector(state => state.SearchUsersList);
  const MData = useSelector(state => state.ResentChats);
  useEffect(() => {
    setsearchData(Seata);
  }, [Seata]);
  useEffect(() => {
    setMaindata(MData);
    // console.log('MDataMDataMDataMData', MData);
  }, [MData]);

  // const [ToggleNotification, setToggleNotification] = useState(true);
  const [search, setsearch] = useState('');
  const [DecodeTocken, setDecodeTocken] = useState('');

  const [searchFilterData, SetSearchFilterData] = useState();
  const [SearchData, setsearchData] = useState([]);
  const [Maindata, setMaindata] = useState([
    {
      id: 1,
      img: assets.Profile,
      tittle: 'Daniel Atkins',
      descripition: 'The weather will be perfect for the st...',
      time: '00:00 PM',
      notify: '1',
      online: true,
      seen: true,
    },
  ]);
  const [Jwt, setJwt] = useState();
  //Logout
  const Logout = async () => {
    try {
      await AsyncStorage.removeItem('fcmTocken').then(
        setMaindata(''),
        navigation.navigate('AuthStack'),
        actionDispatch(Clear_Media)
      );
    } catch (e) {
      // saving error
      console.log('logout');
    }
  };
  // Swipeable----------------------------------------------------------------
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const onRowDidOpen = rowKey => {
    // console.log('This row opened', rowKey);
  };
  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...Maindata];
    const prevIndex = Maindata.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setMaindata(newData);
  };

  const Hdecode = (e) => {
    const decoded = jwt_decode(e);

    setDecodeTocken(decoded)
  }
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('fcmTocken');
      // console.log('token stored', jsonValue);
      setJwt(jsonValue);
      CALLBACK = Hdecode(jsonValue);
      // setJwt(jsonValue)
    } catch (e) {
      // console.log('token not stored');
    }
  };
  const redy = async () => {
    await getData().then(actionDispatch(GetUsers()));
  };
  const OnonLoadStartListImage = () => {
    console.log("OnonLoadStartListImage");
  }

  useEffect(() => {
    redy();
    getChatList();
    // console.log('fgdrtt', Jwt);
  }, []);

  const da = () => {
    console.log(SearchData, 'searxh');
  };

  const searchFilterFunction = text => {
    //  console.log(SearchData,"searxh");
    const newData = SearchData.filter(item => {
      if (item?.username === null) return;

      const itemData = `${item?.username?.toUpperCase()}`;
      // const groupdata = `${item?.group_name?.toUpperCase()}`;
      const textData = text?.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    SetSearchFilterData(newData);
  };
  useEffect(() => {
    searchFilterFunction(search);
  }, [search]);
  useEffect(() => {
    // console.log(DecodeTocken, 'DecodeTocken');
  }, [DecodeTocken]);
  const renderItem = Maindata => (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('UserChatScreen', { item: Maindata.item })
      }
      underlayColor={'red'}>
      <View style={Styles.swipable}>
        <View>
          {console.log(Maindata.item.profile_img, 'img')}
          <FastImage
            style={Styles.swipableImg}
            source={{
              uri: Maindata?.item?.profile_img,
              priority: FastImage.priority.normal,
            }}
            onLoadStart={OnonLoadStartListImage}
            onError={(res) => console.log("error res", res.Error)}
            onProgress={e => console.log(e.nativeEvent.loaded / e.nativeEvent.total)}
            onLoadEnd={e => console.log(e.nativeEvent.width, e.nativeEvent.height)}

            resizeMode={FastImage.resizeMode.cover}
          />
          {Maindata.item.online_status == true ? (
            <Image style={Styles.Online} source={assets.Bluedot} />
          ) : null}
        </View>

        <View style={Styles.SwipableTextView}>
          <Text style={Styles.SwipableTittel}>{Maindata.item.username}</Text>
          <Text style={Styles.SwipableDescription}>
            {Maindata?.item.last_message
              ? Maindata?.item.last_message.slice(0, 20) + '...'
              : ''}
          </Text>
        </View>

        <View style={Styles.RightContainer}>
          {Maindata.item.seen ? (
            <Image style={Styles.chekIcon} source={assets.Checkall} />
          ) : (
            <Image style={Styles.chekIcon} source={assets.Checkmark} />
          )}
          <View style={Styles.timeNotify}>
            {Maindata.item.un_seen_counter ? (
              <Text style={Styles.Noyify}>{Maindata.item.un_seen_counter}</Text>
            ) : (
              <></>
            )}
            <Text style={Styles.time}>
              {Maindata.item.last_message_time
                ? moment().startOf(Maindata.item.last_message_times).fromNow()
                : ''}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
  const renderHiddenItem = (data, rowMap) => (
    <View style={Styles.swipableBackground}>
      <TouchableOpacity
        style={Styles.Delete}
        onPress={() => closeRow(rowMap, data.item.key)}>
        <Image style={Styles.More} source={assets.more} />
      </TouchableOpacity>

      <TouchableOpacity
        style={Styles.Mor}
        onPress={() => deleteRow(rowMap, data.item.key)}>
        <Image style={Styles.Del} source={assets.del} />
      </TouchableOpacity>
    </View>
  );
  // Swipeable----------------------------------------------------------------

  // const handlenotification = () => {
  //   setToggleNotification(!ToggleNotification);
  // };
  const getChatList = () => {
    actionDispatch(GetResentChat());
  };
  return (
    <SafeAreaView style={Styles.Container}>
      <StatusBar backgroundColor={Colors.Statusbar} barStyle={'dark-content'} />
      <View style={Styles.header}>
        <View style={Styles.HeaderRightGroup}>
          {/* <TouchableOpacity onPress={handlenotification} style={Styles.NotificationIconGroup}>
                        <Image style={Styles.headerIcon} source={assets.notification} />

                        {
                            ToggleNotification == true ?
                                <Image style={Styles.BlueDot} source={assets.Bluedot} />
                                : null}
                    </TouchableOpacity> */}
          {/* <Image style={Styles.headerImg} source={assets.avatar2} /> */}

          <FastImage
            style={Styles.headerImg}
            source={{
              uri: DecodeTocken.profile_img,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <Text style={Styles.headerText}>Chats</Text>
        <TouchableOpacity onPress={Logout} style={Styles.NotificationIconGroup}>
          <Text style={Styles.LogOutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          Styles.Search,
          { paddingVertical: Platform.OS === 'ios' ? '2.5%' : '0%' },
        ]}>
        <Image style={Styles.SearchIcon} source={assets.search} />
        <TextInput
          style={Styles.textInputSearch}
          placeholder="Search"
          placeholderTextColor={Colors.textBlack}
          value={search}
          onChangeText={e => setsearch(e)}
        />
      </View>
      {search.length > 0 ? (
        <View>
          <FlatList
            data={searchFilterData}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('UserChatScreen', { item: item })
                  }
                  style={Styles.SearchResultContainer}>
                  {item.profile_img ? (
                    <FastImage
                      style={Styles.SearchResultProfileImage}
                      source={{
                        uri: item.profile_img,
                        priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  ) : (
                    <Image
                      style={Styles.SearchResultProfileImage}
                      source={assets.Userpng}
                    />
                  )}
                  <Text style={Styles.SearchViewProfileName}>
                    {item.username}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : (
        <SwipeListView
          data={Maindata}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={0}
          rightOpenValue={-110}
          previewRowKey={'0'}
          previewOpenValue={-70}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
        />
      )}
      <TouchableOpacity onPress={da} style={Styles.Circle}>
        <Image style={Styles.CircleImg} source={assets.PlusGreen} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Chat;
const Styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: '5%',
  },
  HeaderRightGroup: {
    flexDirection: 'row',
    marginRight: '4%',
  },
  headerImg: {
    height: 35,
    width: 35,
    // backgroundColor: 'red',
    alignSelf: 'center',
    // resizeMode: 'contain'
    borderRadius: 100
  },
  headerIcon: {
    height: 23,
    width: 20,
    tintColor: Colors.textBlack,
  },
  BlueDot: {
    height: 10,
    width: 10,
    position: 'absolute',
    top: 5,
    right: 12,
  },
  NotificationIconGroup: {
    height: 35,
    width: 45,
    // backgroundColor: 'red',
    position: 'absolute',
    justifyContent: 'center',
    // tintColor: '#002DE3',
    right: 0,
  },
  LogOutText: {
    color: Colors.textBlack,
    fontSize: 14,
    fontWeight: '500',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.textBlack,
    // fontFamily: 'Mulish-VariableFont_wght'
  },
  Search: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    backgroundColor: Colors.MainBackground,

    borderRadius: 19,
    alignItems: 'center',
    paddingHorizontal: '5%',
    marginTop: '4%',
    marginBottom: '5%',
    borderColor: Colors.lighGrayBorder,
    borderWidth: 1,
  },
  SearchIcon: {
    height: 20,
    width: 20,
    tintColor: Colors.textBlack,
  },
  textInputSearch: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textBlack,
    marginHorizontal: '5%',
    flex: 1,
  },
  swipableBackground: {
    height: windowHeight / 12,
    width: windowWidth,
    flexDirection: 'row',
    backgroundColor: Colors.SwipeBackground,
    alignItems: 'center',

    justifyContent: 'space-between',
    justifyContent: 'flex-end',
    // paddingRight: '8%'
  },
  swipable: {
    height: windowHeight / 12,
    width: windowWidth,
    flexDirection: 'row',
    backgroundColor: Colors.MainBackground,
    alignItems: 'center',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
  },
  swipableImg: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  Online: {
    tintColor: '#20E070',
    height: 13,
    width: 13,
    position: 'absolute',
    right: 0,
  },
  SwipableTextView: {
    paddingLeft: '2%',
    width: '55%',
    // justifyContent: 'space-between'
  },
  SwipableTittel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.textBlack,
    paddingBottom: '2%',
  },
  SwipableDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.textBlack,
  },
  chekIcon: {
    height: 16,
    width: 16,
    // top:'50%',
    position: 'absolute',
    left: '-15%',

    bottom: -1,
  },
  time: {
    color: Colors.textBlack,
    fontSize: 12,
    alignSelf: 'flex-start',
    // top:'100%'
    // paddingLeft: '4%',
  },
  Noyify: {
    color: Colors.textBlack,
    // backgroundColor: 'red',
    // width: 15,
    minWidth: 15,
    maxWidth: 35,
    // height: 15,
    paddingVertical: '.4%',
    alignSelf: 'flex-end',
    overflow: 'hidden',
    borderRadius: 15 / 2,
    // textAlign: 'center',

    padding: '1%',
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: '2%',
    color: Colors.textWhite,
    // marginRight:'10%'
  },
  timeNotify: {
    flexDirection: 'column',
    // marginRight:'10%'
  },

  Delete: {
    height: windowHeight / 12,
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  Del: {
    height: 20,
    width: 16,
  },
  More: {
    height: 24,
    width: 24,
    marginRight: '4%',
    tintColor: Colors.tintBlack,
  },
  Mor: {
    height: windowHeight / 12,
    width: '12%',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  RightContainer: {
    // backgroundColor: 'red',
    // width:windowWidth/4,
    // Right:'15%',
    flexDirection: 'row',
  },
  Circle: {
    // backgroundColor: 'red',

    marginBottom: '30%',

    width: 70,
    // borderRadius: 50,
    // right: -20,
    position: 'absolute',
    height: 0,
    right: 50,
    bottom: -50,
  },
  CircleImg: {
    height: 100,
    width: 100,
    // backgroundColor: 'yellow',
    borderRadius: 100,
    resizeMode: 'cover',
  },
  ///////////////////////////////Search View Style Sheet/////////////////////
  SearchResultContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // backgroundColor:'red'
    marginHorizontal: '5%',
    alignItems: 'center',
  },
  SearchResultProfileImage: {
    height: 50,
    width: 50,
    borderRadius: 100,
    marginVertical: '2%',
    // resizeMode:'cover'
  },
  SearchViewProfileName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.textBlack,
    paddingLeft: '3%',
  },
});
