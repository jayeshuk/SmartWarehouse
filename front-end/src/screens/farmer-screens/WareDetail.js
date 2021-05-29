import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Headline,
} from 'react-native-paper';

export default function WareDetail({route, navigation}) {
  console.log(route.params);
  const [details, setDetails] = useState(route.params);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{margin: '5%'}}>
        <Title>{details.name}</Title>
        <Paragraph>{details.address}</Paragraph>
      </View>
      <Image
        source={{
          uri:
            'https://images.indianexpress.com/2020/09/BIAL-Bonded-Warehouse.jpg',
        }}
        style={{
          width: '95%',
          height: '30%',
          margin: '2%',
          borderRadius: 10,
        }}
      />
      <Button
        style={{width: '30%', alignSelf: 'center', margin: '5%'}}
        mode="contained"
        onPress={() => navigation.navigate('FillOrder', details)}>
        BOOK
      </Button>
      <View>
        <Text style={{fontSize: 20, margin: '2%', marginLeft: '5%'}}>
          Rate of Storage: {'\u20B9'}
          {details.rate} per Sqft.
        </Text>
        <Text style={{fontSize: 20, margin: '2%', marginLeft: '5%'}}>
          Space Available: {details.freespace} Sqft.
        </Text>
      </View>
    </View>
  );
}
