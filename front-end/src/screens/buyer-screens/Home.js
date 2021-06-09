import * as React from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import {Searchbar} from 'react-native-paper';
import ProductCard from '../../components/atoms/ProductCard';

export default function Home({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    //Load The THings Again
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const products = [
    {
      id: 0,
      name: 'Wheat',
      address: 'Stored at Kautha, Nanded',
      rate: 1200,
    },
    {
      id: 1,
      name: 'Paddy',
      address: 'Stored at Kautha, Nanded',
      rate: 2000,
    },
    {
      id: 2,
      name: 'Dal',
      address: 'Stored at Kautha, Nanded',
      rate: 1500,
    },
    {
      id: 3,
      name: 'Corn',
      address: 'Stored at Kautha, Nanded',
      rate: 1000,
    },
    {
      id: 4,
      name: 'Cold Food',
      address: 'Stored at Kautha, Nanded',
      rate: 4000,
    },
    {
      id: 5,
      name: 'Rice T2',
      address: 'Stored at Kautha, Nanded',
      rate: 2500,
    },
    {
      id: 6,
      name: 'Jowar',
      address: 'Stored at Kautha, Nanded',
      rate: 1800,
    },
  ];
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  const handlePress = content => {
    const obj = {...content};
    delete obj.handlePress;
    navigation.navigate('WareDetail', obj);
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <Searchbar
          style={{marginHorizontal: '5%', marginTop: '5%'}}
          placeholder="Search Warehouse"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {products.map((item, index) => {
          return (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              rate={item.rate}
              address={item.address}
              handlePress={handlePress}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
