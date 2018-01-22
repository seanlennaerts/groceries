// @flow
import React from 'react';
import { Text, View } from 'react-native';

// make component
const Header = (props) => {
  const { textStyle, viewStyle } = styles;
  // destructuring to avoid duplicate references to styles object
  // avoiding saying styles.viewStyle and styles.textStyle

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  ); // textStyle in brackets is prop (property)
};

const styles = {
  viewStyle: {
    backgroundColor: '#219cd9',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    elevation: 2,
  },
  textStyle: {
    fontSize: 18,
    color: '#fff'
  }
};
// make component available to other parts of the app
export { Header };

/* NOTES:
flexbox:
justifyContent is for vertical placement
alignItems is for horizontal placement
*/
