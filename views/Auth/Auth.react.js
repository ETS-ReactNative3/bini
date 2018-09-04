import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar
} from 'react-native';
import Logo from '../../components/Logo/Logo.react';
import SignIn from '../SignIn/SignIn.react';

export default class Auth extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor='#5f4b8b'
          barStyle='light-content'
        />
        <Logo />
        <SignIn />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#5f4b8b',
    flex: 1,
    justifyContent: 'center',
  }
});