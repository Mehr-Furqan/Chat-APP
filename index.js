/**
 * @format
 */
import React from 'react';
// import thunk from 'redux-thunk';
import { Provider, useDispatch } from 'react-redux';
// import DataReduser from './Src/redux/reduser/Reduser';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { persistor } from './Src/redux/store';
import { store } from './Src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
// import {createStore, applyMiddleware, combineReducers} from 'redux';

const PReduxApp = () => {
  // const store = createStore(DataReduser, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => PReduxApp);
