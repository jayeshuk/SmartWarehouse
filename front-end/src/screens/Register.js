import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  Button,
  Title,
  TextInput,
  IconButton,
  HelperText,
} from 'react-native-paper';
import RolePicker from '../components/atoms/RolePicker';
import axios from 'axios';

export default function Register({route, navigation}) {
  const [p, setP] = useState(false);
  const [cP, setCP] = useState(false);
  const [firstName, setFirstName] = useState({value: '', isValid: true});
  const [lastName, setLastName] = useState({value: '', isValid: true});
  const [phone, setPhone] = useState({value: '', isValid: true});
  const [email, setEmail] = useState({value: '', isValid: true});
  const [password, setPassword] = useState({value: '', isValid: true});
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    isValid: true,
  });
  const [match, setMatch] = useState(true);
  const [role, setRole] = useState('');
  const giveRole = n => {
    setRole(n[0].value);
  };

  var formFieldsData = [
    {id: 0, obj: firstName, label: 'First Name', change: setFirstName},
    {id: 1, obj: lastName, label: 'Last Name', change: setLastName},
    {id: 2, obj: phone, label: 'Contact No.', change: setPhone},
    {id: 3, obj: email, label: 'Email Id', change: setEmail},
  ];
  var data = JSON.stringify({
    role: role.length > 0 ? role.toLowerCase() : '',
    firstName: firstName.value,
    lastName: lastName.value,
    phone: phone.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    // address: address || '',
  });
  var config = {
    method: 'post',
    url: 'http://192.168.43.132:3000/api/v1/users/signup',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  const onRegister = async () => {
    await axios(config)
      .then(function (res) {
        if (res.data.status === 'success') {
          navigation && navigation.goBack();
          route.params.setVisible(true);
        }
        return res.data;
      })
      .catch(function (error) {
        if (error.message.endsWith('500')) {
          window.alert(error.message);
        }
      });
  };
  // let regName = /^[a-zA-Z]+$/;
  let regName = /^[a-zA-Z][a-zA-Z\\s]+$/;
  // let regPhone = /^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/;
  let regPhone = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
  let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;

  const ValidateFields = () => {
    const c1 = regName.test(firstName.value);
    const c2 = regName.test(lastName.value);
    const c3 = regPhone.test(phone.value);
    const c4 = regEmail.test(email.value);
    const c5 = regPass.test(password.value);
    const c6 = regPass.test(confirmPassword.value);

    if (c1 && c2 && c3 && c4 && c5 && c6) {
      onRegister();
    } else {
      c1
        ? setFirstName({...firstName, isValid: c1})
        : setFirstName({...firstName, isValid: c1});
      c2
        ? setLastName({...lastName, isValid: c2})
        : setLastName({...lastName, isValid: c2});
      c3
        ? setPhone({...phone, isValid: c3})
        : setPhone({...phone, isValid: c3});
      c4
        ? setEmail({...email, isValid: c4})
        : setEmail({...email, isValid: c4});
      c5
        ? setPassword({...password, isValid: c5})
        : setPassword({...password, isValid: c5});
      c6
        ? password.value === confirmPassword.value
          ? setMatch(true)
          : setMatch(false)
        : setConfirmPassword({
            ...confirmPassword,
            isValid: c6,
          });
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          alignSelf: 'center',
          margin: '10%',
        }}>
        <Title>
          <Text style={{fontSize: 30}}>Create an Account</Text>
        </Title>
      </View>
      <RolePicker giveRole={giveRole} />
      <View style={{marginVertical: '10%'}}>
        {formFieldsData.map((item, index) => {
          return (
            <View key={item.id}>
              <TextInput
                label={item.label}
                error={!item.obj.isValid}
                value={item.obj.value}
                secureTextEntry={
                  item.label === 'Password' || item.label === 'Confirm Password'
                    ? true
                    : false
                }
                mode="outlined"
                onChangeText={text => item.change({...item.obj, value: text})}
                style={{width: '80%', height: 45, alignSelf: 'center'}}
              />
              {item.obj.isValid ? (
                <></>
              ) : (
                <HelperText
                  style={{marginLeft: '8%'}}
                  type="error"
                  visible={!item.obj.isValid}>
                  {item.label} is Invalid!
                </HelperText>
              )}
            </View>
          );
        })}
        <View
          style={{
            flexDirection: 'row',
            width: '80%',
            alignSelf: 'center',
          }}>
          <TextInput
            label="Password"
            error={!password.isValid}
            value={password.value}
            secureTextEntry={!p}
            mode="outlined"
            onChangeText={text => setPassword({...password, value: text})}
            style={{width: '85%', height: 45, alignSelf: 'center'}}
          />
          <IconButton
            style={{alignSelf: 'center'}}
            icon={p ? 'eye' : 'eye-off'}
            size={25}
            onPress={() => setP(!p)}
          />
        </View>
        {password.isValid ? (
          <></>
        ) : (
          <HelperText style={{marginLeft: '8%'}} type="error" visible={true}>
            Password is Invalid!
          </HelperText>
        )}
        <View style={{flexDirection: 'row', width: '80%', alignSelf: 'center'}}>
          <TextInput
            label="Confirm Password"
            error={!confirmPassword.isValid}
            value={confirmPassword.value}
            secureTextEntry={!cP}
            mode="outlined"
            onChangeText={text =>
              setConfirmPassword({...confirmPassword, value: text})
            }
            style={{width: '85%', height: 45, alignSelf: 'center'}}
          />
          <IconButton
            style={{alignSelf: 'center'}}
            icon={cP ? 'eye' : 'eye-off'}
            size={25}
            onPress={() => setCP(!cP)}
          />
        </View>
        {confirmPassword.isValid ? (
          <></>
        ) : (
          <HelperText style={{marginLeft: '8%'}} type="error" visible={true}>
            Confirmed Password is Invalid!
          </HelperText>
        )}
        {match ? (
          <></>
        ) : (
          <HelperText style={{marginLeft: '8%'}} type="error" visible={!match}>
            Passwords do not match!
          </HelperText>
        )}
      </View>
      <Button
        icon="draw"
        style={{alignSelf: 'center', marginHorizontal: '10%'}}
        labelStyle={{fontSize: 18}}
        // contentStyle={{flexDirection: 'row-reverse'}}
        mode="contained"
        onPress={() => {
          role ? ValidateFields() : alert('Please Select Role');
        }}>
        Register
      </Button>
      <Button
        style={{
          alignSelf: 'center',
          marginHorizontal: '10%',
          marginVertical: '5%',
        }}
        labelStyle={{fontSize: 18}}
        mode="text"
        onPress={() => {
          navigation.goBack();
        }}>
        Cancel
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});
