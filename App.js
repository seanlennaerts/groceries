/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import firebase from 'firebase';
import Swiper from 'react-native-swiper';
import { TextInputMask } from 'react-native-masked-text';
import { Header, Input, Button } from './src/components/common';

export default class App extends Component<{}> {
  state = {
    price: 0,
    // submitState: null, // null = default, true = success, false = error
    sean: '#219cd9',
    olivia: 'orange',
  };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: '***REMOVED***',
      authDomain: 'grocery-expenses.firebaseapp.com',
      databaseURL: 'https://grocery-expenses.firebaseio.com',
      projectId: 'grocery-expenses',
      storageBucket: '',
      messagingSenderId: '216322644054',
    });

    firebase.database().ref('/users/sean').once('value')
      .then((snapshot) => {
        console.log(snapshot.val());
      });
  }

  onChangeText(text) {
    this.setState({ price: this.refs.price.getRawValue(), sean: '#219cd9', olivia: 'orange' });
  }

  onSubmit(user) {
    if (this.state.price > 0) {
      const date = new Date();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      firebase.database().ref(`/users/${user}/${year}/${month}`)
        .push(this.state.price, (err) => {
          if (err) {
            console.log('error');
            this.setState({ [user]: '#d9534f' });
          } else {
            console.log('success!');
            this.setState({ price: 0, [user]: '#5cb85c' });
          }
        });
      console.log(`Pushed: ${this.state.price} to ${user}`);
    }
  }
  //
  // onSubmitOlivia() {
  //   console.log('Olivia');
  // }

  // onIndexChanged(index) {
  //   this.setState({ user: index });
  //   if (this.state.user === 0) {
  //     console.log('User is Sean');
  //   } else if (this.state.user === 1) {
  //     console.log('User is Olivia');
  //   }
  // }

  // onTouchEnd(e, state, context) {
  //   if (context.state.index === this.state.user) {
  //     console.log('submitting');
  //     console.log(context.state.index);
  //     console.log(state.index);
  //   } else {
  //     console.log('scrolling');
  //   }
  // }

  // buttonColor(color, user) {
  //   console.log(`Choosing buttonColor: ${color}, ${user}`);
  //   if (this.state.submitState === true && this.state.submitUser === user) {
  //     return '#5cb85c';
  //   } else if (this.state.submitState === false && this.state.submitUser === user) {
  //     return '#d9534f';
  //   }
  //   return color;
  // }

  render() {
    return (
      <View style={styles.headerContainer}>
        <StatusBar
          barStyle="light-content"
        />
        <Header headerText='Grocery Expenses' />
        <View style={styles.container}>
          <TextInputMask
            ref={'price'}
            type={'money'}
            options={{
              unit: '$',
              separator: '.',
              delimiter: ',',
            }}
            onChangeText={this.onChangeText.bind(this)}
            customTextInput={Input}
            value={this.state.price}
            keyboardType='number-pad'
          />
          {/* <Button
            onPress={this.onSubmit.bind(this)}
            backgroundColor={this.buttonColor()}
          >Submit</Button> */}
          <View style={{ height: 45 }}>
            <Swiper
              ref={'swiper'}
              showsPagination={false}
              loop={false}
              keyboardShouldPersistTaps={'always'}
            >
              <Button
                onPress={this.onSubmit.bind(this, 'sean')}
                backgroundColor={this.state.sean}
              >Add to Sean</Button>
              <Button
                onPress={this.onSubmit.bind(this, 'olivia')}
                backgroundColor={this.state.olivia}
              >Add to Olivia</Button>
            </Swiper>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 391,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  headerContainer: {
    flex: 1
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#219cd9',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  }
});
