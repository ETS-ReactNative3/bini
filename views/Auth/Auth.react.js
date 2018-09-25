import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import Logo from 'components/Logo/Logo.react';
import SignIn from './SignIn/SignIn.react';
import SignUp from './SignUp/SignUp.react';
import vars from 'styles/vars';

export default class Auth extends React.Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: vars.colors.main,
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
          <View style={{
            paddingLeft: 15,
            paddingRight: 15,
            width: '100%'
          }}>
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
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: vars.colors.main,
    flex: 1,
    justifyContent: 'center'
  }
});