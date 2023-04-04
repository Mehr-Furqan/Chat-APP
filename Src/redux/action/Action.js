import {
  Get_Users,
  SocketData,
  fetchMyMessages,
  clear,
  getResentChat,
  AddNewMesge,
  UnSeenCounter,
  Offline_Media,
  CLEARMEDIA
} from '../Types';

import axios from 'axios';
import { Constrants } from '../../component/Constrants';
import { AsyncStorage } from 'react-native';

const GetUserss = n => {
  type: Get_Users;
  payload: n;
};
const GetSocketDatas = e => {
  {
    type: SocketData;
    payload: e;
  }
  // console.log('Action dipatchesss');
};

export const GetUsers = () => {
  return async dispatch => {
    const token = await AsyncStorage.getItem('fcmTocken', token);

    await axios
      .get(Constrants.Api + Constrants.searchAllUsers, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .then(response => {
        const data = response.data?.data;
        dispatch({ type: Get_Users, payload: data });
        // console.log('res', data);
      })
      .catch(error => {
        // const errorMsg = error.message
        console.log('response::::error', error?.response?.data);
      });
  };
};

/////jwt Tocken
export const GetSocketData = n => {
  // console.log('Action dipatchesssxxxxxxxxxxxxxxxxxxx');

  return dispatch => {
    dispatch({
      type: SocketData,
      payload: n,
    });
  };
};
///////fetch messages
export const GetChatMessages = n => {
  // console.log("GetChatMessages::nn",n);
  return async dispatch => {
    const token = await AsyncStorage.getItem('fcmTocken');

    await axios
      .post(
        Constrants.Api + Constrants.fetchMyMessages,
        {
          is_group_chat: n?.is_group_chat,
          reciever_id: n.user_id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      )
      .then(response => {
        const data = response?.data.data;
        dispatch({ type: fetchMyMessages, payload: data });
        // console.log('res', data);
      })
      .catch(error => {
        // const errorMsg = error.message
        // console.log('response::::error', error?.response?.data);
      });
  };
};
export const Clear = () => {
  // console.log("here is action clear");
  return async dispatch => {
    dispatch({ type: clear });
  };
};
export const Clear_Media = () => {
  console.log("here is action clear");
  return async dispatch => {
    dispatch({ type: CLEARMEDIA });
  };
};
export const GetResentChat = n => {
  return async dispatch => {
    const token = await AsyncStorage.getItem('fcmTocken', token);

    await axios
      .get(Constrants.Api + Constrants.get_message_contacts, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .then(response => {
        const data = response?.data.data;
        dispatch({ type: getResentChat, payload: data });
        console.log('res', data);
      })
      .catch(error => {
        // const errorMsg = error.message
        // console.log('response::::error', error?.response?.data);
      });
  };
};
export const AddNewMessage = n => {
  console.log('here is action AddNewMessage');
  return async dispatch => {
    await dispatch({ type: AddNewMesge, payload: n });
  };
};
export const unSeenCounter = n => {
  // console.log("unSeenCounter::nn", n);
  return async dispatch => {
    const token = await AsyncStorage.getItem('fcmTocken');

    await axios
      .post(
        Constrants.Api + Constrants.seen_messages,
        {
          sender_id: n
        },
        {
          headers: {
            // 'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      )
      .then(response => {
        // const data = response?.data.data;
        dispatch({ type: 'UnSeenCounter', payload: n });
        // console.log('res', response.data);
      })
      .catch(error => {
        // const errorMsg = error.message
        console.log('response::::error', error?.response?.data);
      });
  };
};
export const OfflineMediaAction = n => {
  console.log('here is action OfflineMedia', n);
  return async dispatch => {
    await dispatch({ type: Offline_Media, payload: n });
  }
}