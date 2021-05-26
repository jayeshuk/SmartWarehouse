import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Login';
import Register from '../screens/Register';
import FarmerNav from './FarmerNav';
import WareNav from './WareNav';
import BuyerNav from './BuyerNav';

const {Navigator, Screen} = createStackNavigator();

export default function AppNav() {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Screen name="Login" component={Login} />
        <Screen name="Register" component={Register} />
        <Screen name="FarmerNav" component={FarmerNav} />
        <Screen name="WareNav" component={WareNav} />
        <Screen name="BuyerNav" component={BuyerNav} />
      </Navigator>
    </NavigationContainer>
  );
}
