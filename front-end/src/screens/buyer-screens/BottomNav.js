import React from 'react';
import {View, Text} from 'react-native';
import {BottomNavigation} from 'react-native-paper';

import Home from './Home';
import MyOrders from './MyOrders';
import Logout from './Logout';

export default function BottomNav() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'home', title: 'Home', icon: 'home-variant'},
    {key: 'myorders', title: 'My Orders', icon: 'cart'},
    {key: 'logout', title: 'Log Out', icon: 'logout'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    myorders: MyOrders,
    logout: Logout,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
