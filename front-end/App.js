import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import AppNav from './src/routes/AppNav';
import {Provider} from 'react-redux';
import configureStore from './src/redux-store';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <AppNav />
    </Provider>
  );
}
