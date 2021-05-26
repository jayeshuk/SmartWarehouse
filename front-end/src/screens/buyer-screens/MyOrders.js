import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Title, List, Divider, IconButton} from 'react-native-paper';

export default function MyOrders() {
  const orders = [
    {
      id: 0,
      name: 'Paddy, Wheat, Corn, Jowar',
      ordervalue: '10,000',
    },
    {
      id: 1,
      name: 'Jowar, Wheat',
      ordervalue: '4,000',
    },
    {
      id: 2,
      name: 'Multi Grains, Corn',
      ordervalue: '6,000',
    },
    {
      id: 3,
      name: 'Wheat, Paddy',
      ordervalue: '12,000',
    },
  ];

  return (
    <View style={{flex: 1}}>
      <View style={{width: '100%'}}>
        <Title
          style={{marginVertical: '5%', fontSize: 24, alignSelf: 'center'}}>
          Order History
        </Title>
        <Divider style={{backgroundColor: 'black', marginHorizontal: '20%'}} />
      </View>

      <ScrollView>
        {/* <View style={{width: '100%'}}> */}
        {orders.map((item, index) => {
          return (
            <View key={item.id}>
              <List.Item
                title={item.name}
                titleEllipsizeMode="tail"
                description={`Order Value : ${item.ordervalue}`}
                left={props => (
                  <IconButton icon="package" {...props.style} size={40} />
                )}
              />
              <Divider style={{backgroundColor: 'black'}} />
            </View>
          );
        })}
        {/* </View> */}
      </ScrollView>
    </View>
  );
}
