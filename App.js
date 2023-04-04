import React, {useEffect, useState} from 'react';

import Chat from './Src/Screens/ChatScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserChatScreen from './Src/Screens/UserChatScreen';
import AuthStack from './Src/component/Navigation.js/AuthStack';
import AddMember from './Src/Screens/AddMember';
import Contacts from './Src/Screens/Contacts';
import UserProfile from './Src/Screens/UserProfile';
import MainRoute from './Src/component/Navigation.js/MainRoute';
import SignupProfile from './Src/Auth/Screens/SignupProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();
// const InitialStack=AsyncStorage.getItem('fcmTocken')? AuthStack:MainRoute
// import {createStore, applyMiddleware, combineReducers} from 'redux';
// import thunk from 'redux-thunk';
import {useDispatch} from 'react-redux';
// import DataReduser from './Src/redux/reduser/Reduser';
import Socket from './Src/component/Socket/Socket';
import {AddNewMessage} from './Src/redux/action/Action';

// const rootReduser = combineReducers({DataReduser});
// const store = createStore(DataReduser, applyMiddleware(thunk));
export default function App() {
  const actionDispatch = useDispatch();

  const [route, setRoute] = useState('');
  useEffect(() => {
    getData();
    // checkLogin();
    console.log('App .js');
  }, []);

  const getData = async () => {
    const token = await AsyncStorage.getItem('fcmTocken');
    if (token !== '' && token !== null) {
      Socket.setupSocket(data => {
        console.log(data, 'data::::::::::::::Socket-Login');
        // actionDispatch(GetSocketData(response.data.data))

        Socket.messageReciver(data => {
          console.log(data, 'data::::::::::::::messageReciver home');
          actionDispatch(AddNewMessage(data));
        }),
          Socket.sendMediaMessage(data => {
            data?.media?.forEach(element => {
              console.log('sendMediaMessage', element);
              // addMsg(dispatch, element);
              // getallUsers(dispatch);
            });
          }),
          Socket.groupMedia(data => {
            data?.media?.forEach(element => {
              console.log('groupMedia', element);
              // addMsg(dispatch, element);
              // getallUsers(dispatch);
            });
          }),
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
            console.log('userOnlineStatus Home', data);
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
        setRoute('App');
    } else {
      setRoute('AuthStack');
    }
    console.log('token', token);
  };

  return (
    <NavigationContainer>
      {route !== '' && (
        <Stack.Navigator
          initialRouteName={route}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name={'AuthStack'} component={AuthStack}></Stack.Screen>
          <Stack.Screen name={'App'} component={MainRoute}></Stack.Screen>

          <Stack.Screen name={'App2'} component={App}></Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
    // </Provider>
    // <SignupProfile />
    // <UserChatScreen />
    // <AddMember />
    // <Chat />
    // <AddMember />
    // <UserProfile />
    // <Contacts />
  );
}
