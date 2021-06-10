import React from 'react';
import {View, Pressable} from 'react-native';
import {Avatar, Button, Card, Text} from 'react-native-paper';

export default function ProductCard(props) {
  let rate = props.rate;
  const LeftContent = props => <Avatar.Icon {...props} icon="seed" size={45} />;

  return (
    <Card style={{margin: '3%'}} mode="elevated" elevation={5}>
      <Pressable
        android_ripple={{color: 'grey', borderless: true}}
        onPress={() => props.handlePress(props)}>
        <Card.Content
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Card.Title
            style={{
              // backgroundColor: 'blue',
              width: '70%',
              marginLeft: '-6%',
            }}
            title={props.name}
            subtitle={props.address}
            left={LeftContent}
            subtitleNumberOfLines={2}
            subtitleStyle={{marginBottom: '5%'}}
          />
          <Text
            style={{
              fontSize: 16,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 5,
              backgroundColor: 'yellow',
              opacity: 0.8,
              padding: 4,
              alignSelf: 'center',
            }}
            theme={{fonts: {medium: 'Comic Sans'}}}>
            {rate !== 0 ? `${'\u20B9'} ${rate}/sack` : `Not for sale`}
          </Text>
        </Card.Content>
      </Pressable>
    </Card>
  );
}
