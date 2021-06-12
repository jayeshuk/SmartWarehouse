import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import {Title} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

import OrderCard from '../../components/atoms/OrderCard';

export default function Home() {
  const logged_user = useSelector(state => state.main_app.logged_user);
  const [pendingOrders, setPendingOrders] = useState([]);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    LoadOrders();
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  var config = {
    method: 'post',
    url: `http://192.168.43.132:3000/api/v1/users/loadorder/${logged_user.id}`,
    headers: {},
  };

  const LoadOrders = async () => {
    await axios(config)
      .then(function (response) {
        console.log('PENDING ORDERS:', JSON.stringify(response.data));
        setPendingOrders(response.data.data.newOrders);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    LoadOrders();
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {pendingOrders.length > 0 ? (
          <>
            {pendingOrders.map((item, index) => {
              return (
                <OrderCard
                  key={item._id}
                  name={item.name}
                  storage_place={item.storage_place}
                  space_req={item.quantity}
                  details={item}
                />
              );
            })}
          </>
        ) : (
          <Title style={{alignSelf: 'center'}}>No Space Requests so far.</Title>
        )}
      </ScrollView>
    </View>
  );
}
