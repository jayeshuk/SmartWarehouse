import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import BottomNav from '../screens/wareowner-screens/BottomNav';

const {Navigator, Screen} = createStackNavigator();

export default function WareNav() {
  return (
    <Navigator
      initialRouteName="BottomNav"
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="BottomNav" component={BottomNav} />
    </Navigator>
  );
}
