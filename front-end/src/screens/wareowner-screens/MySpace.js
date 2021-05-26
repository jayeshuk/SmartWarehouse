import React, {useState} from 'react';
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
} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import {PieChart, StackedBarChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;
const stackdata = {
  labels: ['Jan', 'Feb', 'March', 'April', 'May'],
  legend: ['L1', 'L2', 'L3'],
  data: [
    [60, 60, 60],
    [30, 30, 60],
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
  const [showDropDown, setShowDropDown] = useState(false);
  const [warehouse, setWarehouse] = useState();
  const warehouseList = [
    {label: 'Warehouse - 1', value: 'Warehouse - 1'},
    {label: 'Warehouse - 2', value: 'Warehouse - 2'},
    {label: 'Warehouse - 3', value: 'Warehouse - 3'},
  ];
  return (
    <Provider>
      <View>
        <View style={styles.containerStyle}>
          {/* <Headline>Select Warehouse:</Headline> */}
          <DropDown
            label={'Select Warehouse'}
            mode={'outlined'}
            value={warehouse}
            setValue={setWarehouse}
            list={warehouseList}
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
          <Text style={{alignSelf: 'center'}}>Total Space 5000 Sqft.</Text>
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
              <PieChart
                data={piedata}
                width={screenWidth}
                height={250}
                chartConfig={chartConfig}
                accessor={'population'}
                backgroundColor={'transparent'}
                paddingLeft={'15'}
                center={[10, 10]}
                // absolute
                // hasLegend={false}
                avoidFalseZero={true}
                bgColor={'red'}
              />
              <Caption style={{alignSelf: 'center'}}>
                Last Updated : 15 May 2021, 22:59:00
              </Caption>
            </View>
            <View style={{marginTop: '5%'}}>
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
            </View>
          </>
        ) : (
          <></>
        )}

        <View style={{margin: '5%'}}>
          <TextInput
            label="Warehouse Name"
            mode="outlined"
            style={{height: 50}}
            // value={text}
            // onChangeText={text => setText(text)}
          />
          <TextInput
            label="Total Space in Sqft."
            mode="outlined"
            style={{height: 50}}
            // value={text}
            // onChangeText={text => setText(text)}
          />
          <Button
            icon="plus"
            mode="contained"
            style={{margin: '5%'}}
            onPress={() => console.log('Pressed')}>
            Add New Warehouse
          </Button>
        </View>
      </ScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    margin: '5%',
  },
});
