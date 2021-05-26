import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button, Title, TextInput, Snackbar} from 'react-native-paper';

export default function FillOrder({route, navigation}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [qty, setQty] = useState('');

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          alignSelf: 'center',
          margin: '10%',
        }}>
        <Title>
          <Text style={{fontSize: 30}}>Enter Goods Details</Text>
        </Title>
      </View>
      <View style={{marginVertical: '10%'}}>
        <TextInput
          label="Name"
          value={name}
          mode="outlined"
          onChangeText={text => setName(text)}
          style={{width: '80%', height: 45, alignSelf: 'center'}}
        />
        <TextInput
          label="Contact No."
          value={phone}
          mode="outlined"
          onChangeText={text => setPhone(text)}
          style={{width: '80%', height: 45, alignSelf: 'center'}}
        />
        <TextInput
          label="Area in sqft."
          value={qty}
          mode="outlined"
          onChangeText={text => setQty(text)}
          style={{width: '80%', height: 45, alignSelf: 'center'}}
        />
      </View>
      <Button
        style={{alignSelf: 'center', marginHorizontal: '10%'}}
        labelStyle={{fontSize: 18}}
        // contentStyle={{flexDirection: 'row-reverse'}}
        mode="contained"
        onPress={() => {
          // route.params.setVisible(!visible);
          navigation.goBack();
          navigation.goBack();
        }}>
        Book Space
      </Button>
    </View>
  );
}
