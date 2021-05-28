import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {logUserOut} from '../redux-store/actions';

export default function Logout() {
  const dispatch = useDispatch();
  const LogUserOut = () => dispatch(logUserOut());
  const onLogoutPress = () => {
    LogUserOut();
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button mode="outlined" onPress={onLogoutPress}>
        LOG OUT
      </Button>
    </View>
  );
}
