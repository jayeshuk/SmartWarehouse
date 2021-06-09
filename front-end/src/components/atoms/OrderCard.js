import React, {useState} from 'react';
import {View, Pressable} from 'react-native';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import axios from 'axios';

export default function OrderCard(props) {
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);

  const LeftContent = props => (
    <Avatar.Icon {...props} icon="package-up" size={45} />
  );

  console.log('CARD DATA', props);
  var data = JSON.stringify(props);

  var config = {
    method: 'post',
    url: 'http://192.168.43.132:3000/api/v1/produces/',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  const BookSpace = async () => {
    await axios(config)
      .then(function (response) {
        console.log('BOOKED', JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Card style={{margin: '5%'}} mode="elevated" elevation={5}>
      <Pressable android_ripple={{color: 'grey', borderless: true}}>
        <Card.Content
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Card.Title
            style={{
              // backgroundColor: 'blue',
              width: '100%',
              marginLeft: '-6%',
            }}
            title={props.name}
            subtitle={props.storage_place}
            left={LeftContent}
            subtitleNumberOfLines={2}
            subtitleStyle={{marginBottom: '5%'}}
          />
        </Card.Content>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: '5%',
          }}>
          {accept || reject ? (
            accept ? (
              <Button
                icon="check-bold"
                style={{backgroundColor: '#49e372'}}
                mode="contained">
                Request Accepted
              </Button>
            ) : (
              <Button
                icon="close"
                style={{backgroundColor: '#fa5ab2'}}
                mode="contained">
                Request Rejected
              </Button>
            )
          ) : (
            <>
              <Button
                style={{backgroundColor: '#49e372'}}
                mode="contained"
                onPress={() => {
                  BookSpace();
                  setAccept(true);
                }}>
                Accept
              </Button>
              <Button
                style={{backgroundColor: '#fa5ab2'}}
                mode="contained"
                onPress={() => {
                  // BookSpace();
                  setReject(true);
                }}>
                Reject
              </Button>
            </>
          )}
        </View>
        {/* While If Rejected, delete the produce from produce Collection and wareowner orders array. */}
      </Pressable>
    </Card>
  );
}
