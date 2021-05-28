import * as React from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import {Searchbar} from 'react-native-paper';
import ShowWareCard from '../../components/atoms/ShowWareCard';
import axios from 'axios';

export default function Home({navigation}) {
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    LoadWarehouses();
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  // const data = [
  //   {
  //     id: 0,
  //     name: "Adi's Warehouse",
  //     address: 'Kautha, Nanded',
  //     freespace: 2500,
  //     rate: 100,
  //   },
  //   {
  //     id: 1,
  //     name: "Ram's Warehouse",
  //     address: 'Kautha, Nanded',
  //     freespace: 2500,
  //     rate: 50,
  //   },
  //   {
  //     id: 2,
  //     name: 'Greenland Warehouse',
  //     address: 'Kautha, Nanded',
  //     freespace: 2500,
  //     rate: 600,
  //   },
  //   {
  //     id: 3,
  //     name: 'Cold Warehouse',
  //     address: 'Kautha, Nanded',
  //     freespace: 2500,
  //     rate: 200,
  //   },
  //   {
  //     id: 4,
  //     name: 'Cold Warehouse',
  //     address: 'Kautha, Nanded',
  //     freespace: 2500,
  //     rate: 800,
  //   },
  //   {
  //     id: 5,
  //     name: 'Cold Warehouse',
  //     address: 'Kautha, Nanded',
  //     freespace: 2500,
  //     rate: 1000,
  //   },
  //   {
  //     id: 6,
  //     name: 'Cold Warehouse',
  //     address: 'Kautha, Nanded',
  //     freespace: 2500,
  //     rate: 500,
  //   },
  // ];
  var config = {
    method: 'get',
    url: 'http://192.168.43.132:3000/api/v1/warehouses/',
    headers: {},
  };

  const LoadWarehouses = async () => {
    await axios(config)
      .then(function (response) {
        console.log('Loaded:', JSON.stringify(response.data));
        setData(response.data.data.warehouses);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    LoadWarehouses();
  }, []);

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const toggleDrawer = () => navigation && navigation.toggleDrawer();
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
          onIconPress={toggleDrawer}
          value={searchQuery}
          icon="menu"
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {data.length > 0 ? (
          data.map((item, index) => {
            return (
              <ShowWareCard
                key={item._id}
                id={item._id}
                name={item.name}
                rate={item.rate}
                freespace={item.space_available}
                address={item.address}
                handlePress={handlePress}
              />
            );
          })
        ) : (
          <>
            <Text style={{alignSelf: 'center', margin: '5%', fontSize: 25}}>
              No Warehouses Active
            </Text>
          </>
        )}
      </ScrollView>
    </View>
  );
}
