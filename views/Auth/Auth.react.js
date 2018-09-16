import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import Logo from '../../components/Logo/Logo.react';
import SignIn from './SignIn/SignIn.react';
import SignUp from './SignUp/SignUp.react';

export default class Auth extends React.Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#5f4b8b',
      height: 0
    }
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {
    isCreatingAccount: false
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
      >
        <View style={styles.container}>
          <Logo />
          {this.state.isCreatingAccount
            ? (
              <SignUp
                navigation={this.props.navigation}
                onGoToSignIn={() => this.setState({isCreatingAccount: false})}
              />
            ) : (
              <SignIn
                navigation={this.props.navigation}
                onCreateAccount={() => this.setState({isCreatingAccount: true})}
              />
            )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#5f4b8b',
    flex: 1,
    justifyContent: 'center'
  }
});