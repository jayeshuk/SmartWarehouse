import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';

export default function Settings() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button mode="outlined" onPress={() => alert('Logged Out')}>
        LOG OUT
      </Button>
    </View>
  );
}
