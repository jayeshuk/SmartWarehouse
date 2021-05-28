import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';

import Login from '../screens/Login';
import Register from '../screens/Register';
import FarmerNav from './FarmerNav';
import WareNav from './WareNav';
import BuyerNav from './BuyerNav';
import LoginFailed from './LoginFailed';

const {Navigator, Screen} = createStackNavigator();

export default function AppNav() {
  const logged_user = useSelector(state => state.main_app.logged_user);
  const isLoggedIn = logged_user.token ? true : false;
  console.log('USER DATA FROM MAIN NAV:', logged_user);

  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        {!isLoggedIn ? (
          <>
            <Screen name="Login" component={Login} />
            <Screen name="Register" component={Register} />
          </>
        ) : logged_user.role === 'farmer' ? (
          <>
            <Screen name="FarmerNav" component={FarmerNav} />
          </>
        ) : logged_user.role === 'warehouseowner' ? (
          <>
            <Screen name="WareNav" component={WareNav} />
          </>
        ) : logged_user.role === 'buyer' ? (
          <>
            <Screen name="BuyerNav" component={BuyerNav} />
          </>
        ) : (
          <>
            <Screen name="Login" component={Login} />
            <Screen name="Register" component={Register} />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
}
