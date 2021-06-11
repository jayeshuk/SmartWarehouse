import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button, Title, TextInput, HelperText} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

export default function FillOrder({route, navigation}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [qty, setQty] = useState('');
  const [amount, setAmount] = useState();
  const [price, setPrice] = useState();
  const [details, setDetails] = useState(route.params);

  const logged_user = useSelector(state => state.main_app.logged_user);

  console.log('Inside Fill Order', route.params);

  // route.params.ware_id

  var data = JSON.stringify({
    name: name,
    quantity: qty,
    price_to_sell: price,
    amount_payable_byfarmer: amount,
    farmer_phone: phone,
    farmer_id: logged_user.id,
    wareowner_id: details.wareowner_id,
    warehouse_id: details.id,
  });

  var config = {
    method: 'patch',
    url: `http://192.168.43.132:3000/api/v1/users/sendorder/${details.wareowner_id}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

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
          onBlur={() => setAmount(qty * route.params.rate)}
        />
        <HelperText style={{marginLeft: '8%'}} type="info" visible={true}>
          Available Space is {route.params.freespace - qty} Sqft.
        </HelperText>
        <TextInput
          label="Goods Selling Price"
          value={price}
          mode="outlined"
          onChangeText={text => setPrice(text)}
          style={{width: '80%', height: 45, alignSelf: 'center'}}
        />
        <HelperText style={{marginLeft: '8%'}} type="info" visible={true}>
          Skip "Goods Selling Price" , If Not For Sale.
        </HelperText>
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
          navigation.goBack();
          navigation.goBack();
          SendOrder();
          details.setVisible(true);
        }}>
        Book Space
      </Button>
      <Button
        style={{
          alignSelf: 'center',
          marginHorizontal: '10%',
          marginVertical: '5%',
        }}
        labelStyle={{fontSize: 18}}
        mode="text"
        onPress={() => {
          navigation.goBack();
          navigation.goBack();
        }}>
        Cancel
      </Button>
    </View>
  );
}
