import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button, Title, TextInput, Snackbar} from 'react-native-paper';

export default function FillOrder({route, navigation}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(0);
  const [qty, setQty] = useState(0);
  const [amount, setAmount] = useState();

  // route.params.wareowner_id

  // var data = JSON.stringify({
  //   "role": "farmer",
  //   "firstName": "Omkar",
  //   "lastName": "Kadam",
  //   "phone": 9132855182,
  //   "email": "jayeshukalkar@gmail.com"
  // });

  // var config = {
  //   method: 'patch',
  //   url: 'http://127.0.0.1:3000/api/v1/users/',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   data : data
  // };

  const SendOrder = async () => {
    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
          onBlur={() => setAmount(qty * details.rate)}
        />
        <View
          style={{
            flexDirection: 'row',
            margin: '10%',
            alignSelf: 'center',
          }}>
          <Text style={{fontSize: 25}}>Total Price : </Text>
          <Text style={{fontSize: 25}}>
            {'\u20B9'} {route.params.rate * qty}
          </Text>
        </View>
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
