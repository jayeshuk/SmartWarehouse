import * as React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Searchbar} from 'react-native-paper';
import ShowWareCard from '../../components/atoms/ShowWareCard';

export default function Home({navigation}) {
  const data = [
    {
      id: 0,
      name: "Adi's Warehouse",
      address: 'Kautha, Nanded',
      freespace: 2500,
      rate: 100,
    },
    {
      id: 1,
      name: "Ram's Warehouse",
      address: 'Kautha, Nanded',
      freespace: 2500,
      rate: 50,
    },
    {
      id: 2,
      name: 'Greenland Warehouse',
      address: 'Kautha, Nanded',
      freespace: 2500,
      rate: 600,
    },
    {
      id: 3,
      name: 'Cold Warehouse',
      address: 'Kautha, Nanded',
      freespace: 2500,
      rate: 200,
    },
    {
      id: 4,
      name: 'Cold Warehouse',
      address: 'Kautha, Nanded',
      freespace: 2500,
      rate: 800,
    },
    {
      id: 5,
      name: 'Cold Warehouse',
      address: 'Kautha, Nanded',
      freespace: 2500,
      rate: 1000,
    },
    {
      id: 6,
      name: 'Cold Warehouse',
      address: 'Kautha, Nanded',
      freespace: 2500,
      rate: 500,
    },
  ];
  const [searchQuery, setSearchQuery] = React.useState('');

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
          placeholder="Search Warehouse"
          onChangeText={onChangeSearch}
          onIconPress={toggleDrawer}
          value={searchQuery}
          icon="menu"
        />
      </View>
      <ScrollView>
        {data.map((item, index) => {
          return (
            <ShowWareCard
              key={item.id}
              id={item.id}
              name={item.name}
              rate={item.rate}
              freespace={item.freespace}
              address={item.address}
              handlePress={handlePress}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
