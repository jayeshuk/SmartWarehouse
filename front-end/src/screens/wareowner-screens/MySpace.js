import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {
  Headline,
  TextInput,
  Subheading,
  Provider,
  Divider,
  List,
  Caption,
  Button,
  Snackbar,
} from 'react-native-paper';
import {logUser} from '../../redux-store/actions';
import {useSelector, useDispatch} from 'react-redux';
import DropDown from 'react-native-paper-dropdown';
import {PieChart, StackedBarChart} from 'react-native-chart-kit';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;
const stackdata = {
  labels: ['Feb', 'March', 'April', 'May'],
  legend: ['L1', 'L2', 'L3'],
  data: [
    [60, 60, 60],
    [20, 40, 60],
    [50, 50, 20],
    [15, 20, 20],
  ],
  barColors: ['#F44336', '#2196F3', '#4CAF50'],
};
const piedata = [
  {
    name: 'Rice',
    population: 21500000,
    color: '#F44336',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Paddy',
    population: 2800000,
    color: '#2196F3',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Dal',
    population: 5227612,
    color: '#4CAF50',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Rice T2',
    population: 11920000,
    color: '#cf69f5',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Free',
    population: 8538000,
    color: '#808080',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  decimalPlaces: 2, // optional, defaults to 2dp
  color: () => 'black',
  // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: () => 'black',
  // labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

export default function MySpace() {
  const [visible, setVisible] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [warehouse, setWarehouse] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [availableSpace, setAvailableSpace] = useState();
  const [totalSpace, setTotalSpace] = useState();
  const [rate, setRate] = useState();
  const [warehouseList, setWarehouseList] = useState([]);
  const [dropdownList, setDropdownList] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [stackData, setStackData] = useState('');
  const [displaySpace, setDisplaySpace] = useState(0);
  const [lastUpdate, setLastUpdate] = useState();
  const logged_user = useSelector(state => state.main_app.logged_user);
  const dispatch = useDispatch();
  const LogUser = logindata => dispatch(logUser(logindata));

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  var data = JSON.stringify({
    name: name,
    address: address,
    space_available: availableSpace,
    total_space: totalSpace,
    rate: rate,
    wareowner_id: logged_user.id,
  });

  var config = {
    method: 'post',
    url: 'http://192.168.0.109:3000/api/v1/warehouses/',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  const AddWarehouse = async () => {
    await axios(config)
      .then(async function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data.status === 'success') {
          LogUser({
            ...logged_user,
            container: response.data.data.user.container,
          });
        }
        setVisible(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const clearFields = () => {
    setName('');
    setAddress('');
    setAvailableSpace('');
    setTotalSpace('');
    setRate('');
  };

  var load_config = {
    method: 'get',
    url: `http://192.168.0.109:3000/api/v1/warehouses/${logged_user.id}`,
    headers: {},
  };

  const LoadWarehouses = async () => {
    await axios(load_config)
      .then(function (response) {
        var temp = response.data.data.warehouses.map(obj => {
          let ware = {
            label: obj.name,
            value: obj.name,
            arr: obj.container,
            total_space: obj.total_space,
            free_space: obj.space_available,
            last_update: obj.last_update,
          };

          return ware;
        });
        setDropdownList(temp);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // var call_config = {
  //   method: 'post',
  //   url: 'http://192.168.0.109:3000/api/v1/produces/call/',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   data: produceIds,
  // };

  const CallProduces = async (arr, total, free, update_time) => {
    await axios({
      method: 'post',
      url: 'http://192.168.0.109:3000/api/v1/produces/call/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: arr,
    })
      .then(async function (response) {
        var p_data = response.data.data.storedProduces;
        setLastUpdate(update_time);
        if (p_data.length > 0) {
          p_data.push({name: 'Free Space', quantity: Number(free)});
          p_data.push({
            name: 'Preoccupied',
            quantity: Number(total) - Number(free),
          });
        } else {
          if (total === free)
            p_data.push({name: 'Free Space', quantity: Number(total)});
          else if (free < total) {
            p_data.push({
              name: 'Preoccupied',
              quantity: Number(total) - Number(free),
            });
            p_data.push({
              name: 'Free Space',
              quantity: Number(free),
            });
          }
        }
        p_data.forEach(p => {
          if (p.name === 'Free Space') {
            p.color = '#c7c7c7';
          } else if (p.name === 'Preoccupied') {
            p.color = '#fff345';
          } else {
            // p.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
            p.color = getRandomColor();
          }
          p.legendFontColor = '#7F7F7F';
          p.legendFontSize = 15;
          p.quantity = Number(p.quantity);
        });
        setPieData(p_data);
        console.log('CALLED PRODUCE', JSON.stringify(p_data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    LoadWarehouses();
  }, [logged_user.container]);

  return (
    <Provider>
      <View>
        <View style={styles.containerStyle}>
          {/* <Headline>Select Warehouse:</Headline> */}
          <DropDown
            label={'Select Warehouse'}
            mode={'outlined'}
            value={warehouse}
            setValue={text => {
              setWarehouse(text);
              dropdownList.map(async obj => {
                if (obj.label === text) {
                  console.log('HELLO SELECTED WARE', obj.arr);
                  setDisplaySpace(obj.total_space);
                  CallProduces(
                    obj.arr,
                    obj.total_space,
                    obj.free_space,
                    obj.last_update,
                  );
                  // setStackData(obj.value);
                }
              });
            }}
            list={dropdownList}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            inputProps={{
              right: <TextInput.Icon name={'menu-down'} />,
            }}
            activeColor="violet"
          />
        </View>
        <Divider style={{backgroundColor: 'black', marginHorizontal: '5%'}} />
      </View>
      {warehouse ? (
        <>
          <Headline style={{alignSelf: 'center', marginTop: '2.5%'}}>
            {warehouse} Details
          </Headline>
          <Text style={{alignSelf: 'center'}}>
            Total Space {displaySpace} Sqft.
          </Text>
        </>
      ) : (
        <Text style={{alignSelf: 'center', marginTop: '2.5%'}}>
          No Warehouse Selected
        </Text>
      )}

      <Divider
        style={{
          backgroundColor: 'black',
          marginHorizontal: '5%',
          marginTop: '2.5%',
        }}
      />
      <ScrollView>
        {warehouse ? (
          <>
            <View>
              {/* <Pie /> */}
              <Subheading
                style={{
                  marginHorizontal: '5%',
                  fontStyle: 'italic',
                  textDecorationLine: 'underline',
                  fontSize: 20,
                  marginTop: '5%',
                }}>
                Current Occupancy
              </Subheading>
              <View>
                <PieChart
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                  data={pieData}
                  width={screenWidth}
                  height={250}
                  chartConfig={chartConfig}
                  accessor={'quantity'}
                  backgroundColor={'transparent'}
                  paddingLeft={'15'}
                  center={[-2, -5]}
                  // absolute
                  // hasLegend={false}
                  avoidFalseZero={true}
                  bgColor={'red'}
                />
              </View>
              <Caption style={{alignSelf: 'center'}}>
                Last Updated : {lastUpdate}
              </Caption>
            </View>
            {/* <View style={{marginTop: '5%'}}>
              <Subheading
                style={{
                  marginHorizontal: '5%',
                  fontStyle: 'italic',
                  textDecorationLine: 'underline',
                  fontSize: 20,
                }}>
                Past Data
              </Subheading>

              <StackedBarChart
                style={{alignSelf: 'center', marginTop: '5%'}}
                data={stackdata}
                withVerticalLabels={true}
                withHorizontalLabels={true}
                width={screenWidth * 0.95}
                height={220}
                chartConfig={chartConfig}
              />
              <Caption style={{alignSelf: 'center'}}>
                Last Updated : 15 May 2021, 22:59:00
              </Caption>
            </View> */}
          </>
        ) : (
          <></>
        )}

        <View style={{margin: '5%'}}>
          <TextInput
            label="Warehouse Name"
            mode="outlined"
            style={{height: 50}}
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInput
            label="Address"
            mode="outlined"
            style={{height: 50}}
            value={address}
            onChangeText={text => setAddress(text)}
          />
          <TextInput
            label="Available Space in Sqft."
            mode="outlined"
            style={{height: 50}}
            value={availableSpace}
            onChangeText={text => setAvailableSpace(text)}
          />
          <TextInput
            label="Total Space in Sqft."
            mode="outlined"
            style={{height: 50}}
            value={totalSpace}
            onChangeText={text => setTotalSpace(text)}
          />
          <TextInput
            label="Rate per Sqft."
            mode="outlined"
            style={{height: 50}}
            value={rate}
            onChangeText={text => setRate(text)}
          />
          <Button
            icon="plus"
            mode="contained"
            style={{margin: '5%'}}
            onPress={() => {
              AddWarehouse();
              clearFields();
            }}>
            Add New Warehouse
          </Button>
        </View>
      </ScrollView>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(!visible)}
        style={{width: '80%', alignSelf: 'center', marginVertical: '10%'}}
        duration={2000}
        action={{
          label: 'Ok',
          onPress: () => {
            setVisible(!visible);
          },
        }}>
        Warehouse Added Successfully!
      </Snackbar>
    </Provider>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    margin: '5%',
  },
});
