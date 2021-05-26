// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import * as React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { name as appName } from './app.json';
import App from './App';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

export default function Main() {
  return (
      <StoreProvider store={store}>
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
    </StoreProvider >
  );
}

AppRegistry.registerComponent(appName, () => App);
