import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Font} from 'expo';
import Logo from './components/Logo/Logo.react';
import SignIn from './views/SignIn/SignIn.react';

export default class App extends React.Component {

  state = {
    isReady: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      'pacifico': require('./assets/fonts/Pacifico-Regular.ttf')
    });
    this.setState({isReady: true});
  }

  render() {
    if (!this.state.isReady) {
      return <View style={styles.container} />
    }
    return (
      <View style={styles.container}>
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
  },
  text: {
    color: '#fff',
    fontFamily: 'pacifico',
    fontSize: 60,
    textAlign: 'center',
    width: '100%'
  }
});
