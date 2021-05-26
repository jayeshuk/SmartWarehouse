import React from 'react';
import {View, ScrollView} from 'react-native';
import {Searchbar, List, Text, DataTable} from 'react-native-paper';

export default function StoredGoods({navigation}) {
  const data = [
    {
      name: 'Rice',
      area: 1000,
      warehouse: "Ram's Warehouse",
    },
    {
      name: 'Paddy',
      area: 100,
      warehouse: "Ram's Warehouse",
    },
    {
      name: 'Sugarcane',
      area: 80,
      warehouse: "Ram's Warehouse",
    },
    {
      name: 'Corn',
      area: 500,
      warehouse: "Ram's Warehouse",
    },
    {
      name: 'Dal',
      area: 4000,
      warehouse: "Ram's Warehouse",
    },
    {
      name: 'Rice T2',
      area: 5000,
      warehouse: "Ram's Warehouse",
    },
  ];
  const [searchQuery, setSearchQuery] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [low, setLow] = React.useState(0);

  const onChangeSearch = query => setSearchQuery(query);
  const toggleDrawer = () => navigation.toggleDrawer();
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
                  <DataTable.Cell numeric>{item.warehouse}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.area}</DataTable.Cell>
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
            label={`Page ${page + 1} of ${data.length / 6}`}
          />
        </DataTable>
      </View>
    </View>
  );
}
