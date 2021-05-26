import React from 'react';
import {View, Pressable} from 'react-native';
import {Avatar, Button, Card, Text} from 'react-native-paper';

export default function ShowWareCard(props) {
  let rate = props.rate;
  const LeftContent = props => <Avatar.Icon {...props} icon="barn" size={45} />;

  return (
    <Card style={{margin: '3%', height: '14%'}} mode="elevated" elevation={5}>
      <Pressable
        android_ripple={{color: 'grey', borderless: true}}
        onPress={() => props.handlePress(props)}>
        <Card.Title
          title={props.name}
          subtitle={props.address}
          left={LeftContent}
        />
        <Card.Content
          style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={{color: 'green', fontSize: 16}}>
            Free Space: {props.freespace} Sq.Ft.
          </Text>
          <Text
            style={{
              fontSize: 16,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 5,
              backgroundColor: 'yellow',
              opacity: 0.8,
              padding: 4,
            }}
            theme={{fonts: {medium: 'Comic Sans'}}}>
            {'\u20B9'}
            {rate} /sqft
          </Text>
        </Card.Content>
      </Pressable>
    </Card>
  );
}
