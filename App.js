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

const key = require('./firebase.json');

export default class App extends Component<{}> {
  state = {
    price: 0,
    sean: '#219cd9',
    olivia: 'orange',
    totalsean: 0,
    totalolivia: 0,
  };

  componentWillMount() {
    firebase.initializeApp(key);

    firebase.database().ref('/stats/total').on('value', (snapshot) => {
      // console.log(snapshot.val());
      this.setState({ totalsean: snapshot.val().sean });
      this.setState({ totalolivia: snapshot.val().olivia });
      console.log(this.state);
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
            console.log(err);
            this.setState({ [user]: '#d9534f' });
          } else {
            console.log('successfully added expense');
            const totalUser = `total${user}`;
            const total = this.state[totalUser] + this.state.price;
            firebase.database().ref(`/stats/total/${user}`)
              .set(total, (error) => {
                if (error) {
                  console.log(error);
                  this.setState({ [user]: '#d9534f' });
                } else {
                  this.setState({ price: 0, [user]: '#5cb85c' });
                }
              });
            }
        });
      console.log(`Pushed: ${this.state.price} to ${user}`);
    }
  }

  chooseWho() {
    if (this.state.totalsean > this.state.totalolivia) {
      return { sean: 'Sean', olivia: 'Olivia is behind :(' };
    } else {
      return { sean: 'Sean is behind :(', olivia: 'Olivia' };
    }
  }

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
              >{this.chooseWho().sean}</Button>
              <Button
                onPress={this.onSubmit.bind(this, 'olivia')}
                backgroundColor={this.state.olivia}
              >{this.chooseWho().olivia}</Button>
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
  }
});
