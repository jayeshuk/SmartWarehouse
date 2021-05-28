import React, {useState} from 'react';
import RadioGroup from 'react-native-radio-buttons-group';

const radioButtonsData = [
  {
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Farmer',
    value: 'farmer',
  },
  {
    id: '2',
    label: 'Warehouse Owner',
    value: 'warehouseowner',
  },
  {
    id: '3',
    label: 'Buyer',
    value: 'buyer',
  },
];

export default function RolePicker(props) {
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    props.giveRole(radioButtons.filter(obj => obj.selected === true));
  }

  return (
    <RadioGroup
      layout="row"
      radioButtons={radioButtons}
      onPress={onPressRadioButton}
    />
  );
}
