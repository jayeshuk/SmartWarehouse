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
import Settings from '../screens/farmer-screens/Settings';

const {Navigator, Screen} = createDrawerNavigator();
const S = createStackNavigator();

function Home() {
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

export default function FarmerNav({navigation}) {
  return (
    <Navigator
      drawerContentOptions={{itemStyle: {marginVertical: 5}}}
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Screen name="Home" component={Home} />
      <Screen name="My Stored Goods" component={StoredGoods} />
      <Screen name="Settings" component={Settings} />
    </Navigator>
  );
}
