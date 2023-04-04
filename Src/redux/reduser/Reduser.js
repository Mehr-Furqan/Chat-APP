

import { State } from 'react-native-gesture-handler';
import {
  clear,
  SocketData,
  fetchMyMessages,
  getResentChat,
  AddNewMesge,
  UnSeenCounter,
  Offline_Media,
  CLEARMEDIA
} from '../Types';
const InitialState = {
  SearchUsersList: '',
  SocketData: '',
  ChatMessagess: [''],
  ResentChats: [],
  OfflineMedia: '',
};

const DataReduser = (state = InitialState, action) => {
  console.log("Reduser", action.type, "type", action?.payload);
  switch (action.type) {
    case 'GetUsers':
      //   console.log(action?.payload, 'state::::::::::::::::::::::::::::::::::');

      return {
        ...state,
        SearchUsersList: action?.payload,
      };
      break;
    case SocketData: {
      return {
        ...state,
        SocketData: action?.payload,
      };
      break;
    }
    case fetchMyMessages: {
      // let Potrate
      // function set(e) {
      //   console.log("parameter", e);
      //   Potrate = e
      //   console.log("xxx", e)
      //   return Potrate
      // }

      // var a;
      // console.log(action?.payload, 'state:::');
      // for (let index = 0; index < action?.payload.length; index++) {

      //   { a[index]?.attatchment != null && Image.getSize(action?.payload[index]?.attatchment, (w, h) => set(w > h)) }

      // }


      return {
        ...state,

        ChatMessagess: action?.payload,
      };

      break;
    }
    case clear: {
      //   console.log('clear', action?.payload);

      return {
        ...state,
        ChatMessagess: '',
      };
      break;
    }
    case CLEARMEDIA: {
      console.log('clear', action?.type);

      return {
        ...state,
        OfflineMedia: '',
      };
      break;
    }
    case AddNewMesge: {
      console.log(action.payload, 'AddNewMesge state:::');
      const index = state.ResentChats.findIndex(todo => todo.user_id === action.payload.sender_id);
      const newArray = [...state.ResentChats];
      newArray[index].un_seen_counter = newArray[index].un_seen_counter + 1 //changing value in the new array
      newArray[index].last_message = action.payload?.message_body;
      return {
        ...state,
        // ChatMessagess: state.ChatMessagess.push(action?.payload),
        ResentChats: newArray,
        ChatMessagess: [
          {
            id: action?.payload.sender_id + state.ChatMessagess.length,

            attatchment: action?.payload.attatchment,
            attatchment_name: null,
            created_at: '2022-07-01T05:53:23.707Z',
            group_id: action?.payload.group_id,
            media_caption: null,
            seen: true,
            media_type: null,
            message_body: action?.payload.message_body,

            message_type: action?.payload.message_type,
            reciever_id: action?.payload.reciever_id,
            sender_id: action?.payload.sender_id,
            updated_at: '2022-07-01T05:53:23.708Z',
            user_sender: action?.payload.user_sender,
          },
          ...state.ChatMessagess,
        ],

      };

      break;
    }
    case getResentChat:
      console.log(action?.payload, 'state::::::::::::::::::::::::::::::::::');

      return {
        ...state,
        ResentChats: action?.payload,
      };
      break;
    case Offline_Media:
      // console.log('////////////Offline_Media', action?.payload);
      let newOfflineMedia = [...state.OfflineMedia, action?.payload]
      console.log('newOfflineMedia', newOfflineMedia)
      return {
        ...state, //copying the orignal state
        OfflineMedia: newOfflineMedia, //reassingning todos to new array
      }
      break;
    case 'UnSeenCounter':
      // console.log('UnSeenCounter');
      const index = state.ResentChats.findIndex(todo => todo.user_id === action.payload);
      const newArray = [...state.ResentChats];
      newArray[index].un_seen_counter = 0//changing value in the new array
      return {
        ...state, //copying the orignal state
        ResentChats: newArray, //reassingning todos to new array
      }



      break;

  }

  return state;
};

export default DataReduser;
