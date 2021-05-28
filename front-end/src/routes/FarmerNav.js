import 'react-native-gesture-handler';
import * as React from 'react';
import {Button} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/farmer-screens/Home';
import WareDetail from '../screens/farmer-screens/WareDetail';
import FillOrder from '../screens/farmer-screens/FillOrder';

import StoredGoods from '../screens/farmer-screens/StoredGoods';
import Logout from '../screens/Logout';

const {Navigator, Screen} = createDrawerNavigator();
const S = createStackNavigator();

function StackOne() {
  return (
    <S.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <S.Screen name="HomeScreen" component={HomeScreen} />
      <S.Screen name="WareDetail" component={WareDetail} />
      <S.Screen name="FillOrder" component={FillOrder} />
    </S.Navigator>
  );
}

export default function FarmerNav() {
  return (
    <Navigator
      drawerContentOptions={{itemStyle: {marginVertical: 5}}}
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Screen name="Home" component={StackOne} />
      <Screen name="My Stored Goods" component={StoredGoods} />
      <Screen name="Settings" component={Logout} />
    </Navigator>
  );
}
