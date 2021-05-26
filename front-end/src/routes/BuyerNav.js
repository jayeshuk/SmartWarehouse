import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import BottomTab from '../screens/buyer-screens/BottomNav';

const {Navigator, Screen} = createStackNavigator();

export default function BuyerNav() {
  return (
    <Navigator
      initialRouteName="BottomTab"
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="BottomTab" component={BottomTab} />
    </Navigator>
  );
}
