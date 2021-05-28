import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {
  Button,
  Title,
  TextInput,
  Snackbar,
  IconButton,
  Colors,
  Divider,
} from 'react-native-paper';
import axios from 'react-native-axios';
import RolePicker from '../components/atoms/RolePicker';
import jwt_decode from 'jwt-decode';
import {logUser} from '../redux-store/actions';
import {useSelector, useDispatch} from 'react-redux';
import {LogBox} from 'react-native';
import {getMaxListeners} from 'node:process';

export default function Home({navigation}) {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [hidePass, setHidePass] = useState(false);
  const [role, setRole] = useState('');

  const dispatch = useDispatch();
  const LogUser = logindata => dispatch(logUser(logindata));
  const giveRole = n => {
    setRole(n[0].value);
  };

  var data = JSON.stringify({
    email: 'hariomlapshetwar@gmail.com',
    password: 'Jayesh@1234',
    role: 'warehouseowner',
  });
  // var data = JSON.stringify({
  //   email: email,
  //   password: password,
  //   role: role.length > 0 ? role.toLowerCase() : '',
  // });
  var config = {
    method: 'post',
    url: 'http://192.168.43.132:3000/api/v1/users/login',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  const loginByPass = () => {
    // console.log(data.role);
    if (role) {
      switch (role) {
        case 'farmer':
          navigation && navigation.navigate('FarmerNav');
          break;
        case 'warehouseowner':
          navigation && navigation.navigate('WareNav');
          break;
        case 'buyer':
          navigation && navigation.navigate('BuyerNav');
          break;
        default:
          console.log('Login Route Failed!!');
      }
    } else {
      alert('Login Failed. Please Select a Role.');
    }
  };

  const loginPress = async () => {
    await axios(config)
      .then(function (res) {
        console.log('RESPONSE LOGIN', JSON.stringify(res.data));

        let decoded = jwt_decode(res.data.token);
        if (res.data.status === 'success') {
          LogUser({
            token: res.data.token,
            email: email,
            id: decoded.id,
            role: role.toLowerCase(),
            address: decoded.add,
            container: res.data.container,
          });
        }
        loginByPass();
        return res.data;
      })
      .catch(function (error) {
        if (error.message.endsWith('0')) {
          window.alert(`Please provide Email Id and Password`);
        } else if (error.message.endsWith('1')) {
          window.alert(`Enter a valid Email Id or Password`);
        } else {
          window.alert(error);
        }
        console.log(error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'space-evenly',
        // backgroundColor: 'red',
        // alignItems: 'center',
      }}>
      <View
        style={{
          alignSelf: 'center',
          margin: '10%',
        }}>
        <Title>
          <Text style={{fontSize: 30}}>Smart Warehouse</Text>
        </Title>
      </View>
      <RolePicker giveRole={giveRole} />
      <View style={{marginVertical: '10%'}}>
        <TextInput
          label="Email"
          value={email}
          mode="outlined"
          onChangeText={text => setEmail(text)}
          style={{width: '80%', height: 45, alignSelf: 'center'}}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginLeft: '10%',
          }}>
          <TextInput
            secureTextEntry={hidePass ? false : true}
            label="Password"
            value={password}
            mode="outlined"
            onChangeText={text => setPassword(text)}
            // right={<TextInput.Icon name="textbox-password" onPress={() => {}} />}
            style={{width: '75%', height: 45, alignSelf: 'center'}}
          />
          <Divider
            style={{
              marginLeft: '3%',
              width: 1,
              height: '60%',
              marginVertical: '4%',
              backgroundColor: 'black',
            }}
          />
          <IconButton
            icon={hidePass ? 'eye' : 'eye-off'}
            size={25}
            style={{
              marginVertical: '3%',
              marginHorizontal: '1%',
            }}
            onPress={() => {
              setHidePass(!hidePass);
            }}
          />
        </View>
      </View>
      <Button
        mode="contained"
        icon="account-arrow-right"
        style={{alignSelf: 'center', margin: '10%'}}
        labelStyle={{fontSize: 16}}
        onPress={() => {
          loginPress();
        }}>
        Log In
      </Button>

      <Text style={{alignSelf: 'center'}}>Don't have an Account ? </Text>
      <Button
        icon="draw"
        style={{alignSelf: 'center', marginHorizontal: '10%'}}
        labelStyle={{fontSize: 18}}
        // contentStyle={{flexDirection: 'row-reverse'}}
        mode="text"
        onPress={() => navigation.navigate('Register', {setVisible})}>
        Register
      </Button>
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
        Successfully Registered !!{'\n'}Please verify your Account.
      </Snackbar>
    </View>
  );
}
