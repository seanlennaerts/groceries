// @flow
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, backgroundColor, children }) => {
  const { buttonStyle, textStyle } = styles;

  buttonStyle.backgroundColor = backgroundColor;

  return (
    <TouchableOpacity
      onLongPress={onPress}
      style={buttonStyle}
      activeOpacity={0.8}
    >
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 18,
  },
  buttonStyle: {
    alignSelf: 'stretch',
    height: 45,
    justifyContent: 'center',
  }
};

export { Button };
