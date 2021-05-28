import React from 'react';
import {View, Text, Image} from 'react-native';
import {Title} from 'react-native-paper';

export default function LoginFailed() {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {/* <Image
        source={require('C:/Users/Tutorialspoint/Desktop/NativeReactSample/logo.png')}
      /> */}
      <Title style={{color: 'red', alignSelf: 'center'}}>Login Failed</Title>
    </View>
  );
}
