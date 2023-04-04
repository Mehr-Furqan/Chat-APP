import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Socket from '../Socket/Socket';
// import {AddNewMessage} from '../../redux/action/Action';
import { Path } from './Path';
import { useDispatch } from 'react-redux';

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
  headerShown: false,
};

const MainRoute = () => {
  const actionDispatch = useDispatch();
  //   Socket.setupSocket(data => {
  //     console.log('smain', data);
  //     Socket.messageReciver(data => {
  //       console.log(data, 'data::::::::::::::messageReciver Mainroute');
  //       actionDispatch(AddNewMessage(data));
  //     });
  //   });

  return (
    <Stack.Navigator
      screenOptions={screenOptionStyle}
      initialRouteName={'Chat'}>
      <Stack.Screen name={'Chat'} component={Path.Chat}></Stack.Screen>

      <Stack.Screen name="UserChatScreen" component={Path.UserChatScreen} />
      <Stack.Screen name="VideoPlay" component={Path.VideoPlay} />

    </Stack.Navigator>
  );
};

export default MainRoute;
