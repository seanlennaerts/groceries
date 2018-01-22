// @flow
import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Input = ({ value, onChangeText, keyboardType }) => {

  // deconstruct the styles object
  const { inputStyle, labelStyle, containerStyle } = styles;
  return (
    <View style={containerStyle}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={inputStyle}
        caretHidden
        textAlign={'center'}
        autoFocus
        maxLength={7}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    fontSize: 70,
    fontWeight: '100',
    flex: 1
  },
  containerStyle: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  }
};

export { Input };
