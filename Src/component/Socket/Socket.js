import { AsyncStorage } from "react-native"
import io from 'socket.io-client';
export default class Socket {
  static socket = null;
  static setupSocket(callback) {
    Socket.socket = io('https://defigram-testimg.herokuapp.com/');
    Socket.socket.on('disconnect'); //comment by ali
    Socket.socket.off(); //c
    Socket.socket.on('connect', async () => {
      const token = await AsyncStorage.getItem('fcmTocken')
      
        Socket.socket.emit(
          'join',
          { token },
          callback
            ? callback
            : data => {
              console.log('data from socket.js File', data);
              if (data?.error) {
                console.log('error in join ', data.error);
              }
              if (data?.success) {
                console.log('success in join ', data.success);
              }
            },
        );
      
      });
  
    Socket.socket.on('disconnect', msg => {
      console.log('disconnect', msg);
    });
  }
  static messageReciver(callBack) {
    Socket.socket.on('newTextMessage', callBack);
  }
  static sendMediaMessage(media) {
    Socket.socket.on('newMediaMessageOneToOne', media);
  }
  static groupMedia(media) {
    Socket.socket.on('newGroupMediaMessage', media);
  }
  static newGroupMessage(callBack) {
    Socket.socket.on('newGroupMessage', callBack);
  }
  static newGroupCreated(groupCreate) {
    Socket.socket.on('newGroupCreated', groupCreate);
  }
  static removeFromGroup(removeGroup) {
    Socket.socket.on('removeFromGroup', removeGroup);
  }
  static addNewmember(addedToGroup) {
    Socket.socket.on('addedToGroup', addedToGroup);
  }
  static userOnlineStatus(userOnlineStatus) {
    Socket.socket.on('userOnlineStatus', userOnlineStatus);
  }
  static seenMessageOneToOne(callBack) {
    Socket.socket.on('seenMessageOneToOne', callBack);
  }
}