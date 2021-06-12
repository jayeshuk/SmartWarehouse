import React from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';
import {Searchbar, List, Text, DataTable} from 'react-native-paper';
import {useSelector} from 'react-redux';
import axios from 'axios';

export default function StoredGoods({navigation}) {
  const [data, setData] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [low, setLow] = React.useState(0);

  const onChangeSearch = query => setSearchQuery(query);
  const toggleDrawer = () => navigation.toggleDrawer();
  const handlePress = content => {
    const obj = {...content};
    delete obj.handlePress;
    navigation.navigate('WareDetail', obj);
  };

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    CallProduces();
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const logged_user = useSelector(state => state.main_app.logged_user);

  const call_config = {
    method: 'post',
    url: 'http://192.168.43.132:3000/api/v1/produces/call/',
    headers: {
      'Content-Type': 'application/json',
    },
    data: logged_user.container,
  };

  const CallProduces = async () => {
    await axios(call_config)
      .then(async function (response) {
        var p_data = response.data.data.storedProduces;
        console.log('PDATA', p_data);
        setData(p_data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    CallProduces();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
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
            placeholder="Search Goods"
            onChangeText={onChangeSearch}
            onIconPress={toggleDrawer}
            value={searchQuery}
            icon="menu"
          />
        </View>
        <View style={{margin: '2%'}}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Goods</DataTable.Title>
              <DataTable.Title numeric>Storage Location</DataTable.Title>
              <DataTable.Title numeric>Area(sqft.)</DataTable.Title>
            </DataTable.Header>
            {data.slice(low, low + 6).length ? (
              data.slice(low, low + 6).map((item, index) => {
                return (
                  <DataTable.Row key={index}>
                    <DataTable.Cell>{item.name}</DataTable.Cell>
                    <DataTable.Cell>{item.storage_place}</DataTable.Cell>
                    <DataTable.Cell numeric>{item.quantity}</DataTable.Cell>
                  </DataTable.Row>
                );
              })
            ) : (
              <DataTable.Row>
                <DataTable.Cell>No More Records</DataTable.Cell>
              </DataTable.Row>
            )}
            <DataTable.Pagination
              page={1}
              numberOfPages={3}
              onPageChange={page => {
                setPage(page);
                setLow(page * 6);
              }}
              label={`Page ${page} of ${
                data.length > 6 ? data.length / 6 : data.length
              }`}
            />
          </DataTable>
        </View>
      </View>
    </ScrollView>
  );
}
