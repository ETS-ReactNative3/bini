import React from 'react';
import PropTypes from 'prop-types';
import {
  View
} from 'react-native';
import {
  Input,
  FormValidationMessage, // @todo: Add this
  Button,
  Divider
} from 'react-native-elements';
import {upperFirst} from 'lodash';
import validator from 'validator';
import firebase from 'firebase';

import fire from 'resources/Fire';
import vars from 'styles/vars';

export default class SignIn extends React.Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {
    email: '',
    password: ''
  };

  signInWithEmail = async () => {
    if (!validator.isEmail(this.state.email)) {
      return; // @todo: Error messaging under the input if not email
    }
    try {
      const user = await fire.app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(async () => {
          return await fire.app.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
        });
      console.log('USER: ', user);
      this.props.navigation.replace('Home');
    } catch (err) {
      console.warn(err); // @todo: Handle this. Generic error messaging toast?
    }
  };

  signInWithFacebook = async () => {
    return;
    // @todo: do this
    try {
      const provider = new firebase.auth.FacebookAuthProvider();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const {
      email,
      password
    } = this.state;
    return (
      <View
        enabled
        style={{
          justifyContent: 'flex-start',
          height: '70%',
          width: '100%'
        }}
      >
        <SignInField
          property='email'
          value={email}
          onChangeText={(email) => this.setState({email: email.replace(/[\s]/g, '')})}
        />
        <SignInField
          property='password'
          value={password}
          onChangeText={(password) => this.setState({password: password.replace(/\s/g, '')})}
        />
        <View style={{
          marginTop: 20,
          marginBottom: 10
        }}>
          <Button
            disabled={!email || !password}
            title='Sign In'
            buttonStyle={{backgroundColor: '#477EFF'}}
            disabledStyle={{backgroundColor: '#6c7784'}}
            disabledTitleStyle={{color: '#4b525b'}}
            // @todo: Do this on successful log in
            onPress={this.signInWithEmail}
          />
        </View>
        <View style={{
          marginBottom: 20
        }}>
          <Button
            title='Sign In With Facebook'
            buttonStyle={{backgroundColor: '#3b5998'}}
            disabledStyle={{backgroundColor: '#6c7784'}}
            onPress={this.signInWithFacebook}
          />
        </View>
        <View style={{opacity: 0.25}}>
          <Divider />
        </View>
        <View style={{
          marginTop: 20
        }}>
          <Button
            title='Create Account'
            buttonStyle={{backgroundColor: '#EDEDF9'}}
            titleStyle={{color: vars.colors.main}}
            onPress={this.props.onCreateAccount}
          />
        </View>
      </View>
    );
  }
}

const SignInField = ({property, value, onChangeText, onFocus, onBlur}) => (
  <Input
    label={upperFirst(property)}
    labelStyle={{color: '#fff'}}
    autoCapitalize='none'
    autoCorrect={false}
    onChangeText={onChangeText}
    value={value}
    onFocus={onFocus}
    onBlur={onBlur}
    underlineColorAndroid='#fff'
    textContentType={property}
    inputStyle={{color: '#fff'}}
    containerStyle={{
      marginBottom: 15,
      width: '100%'
    }}
  />
);
