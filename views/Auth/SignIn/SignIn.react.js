import React from 'react';
import PropTypes from 'prop-types';
import {
  View
} from 'react-native';
import {
  Input,
  FormValidationMessage, // @todo: Add this
  Divider
} from 'react-native-elements';
import {upperFirst} from 'lodash';
import validator from 'validator';
import firebase from 'firebase';
import Expo from 'expo';

import fire from 'resources/Fire';
import vars from 'styles/vars';

import {Button} from 'components/Form/Form.react';

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
  };

  signInWithGoogle = async () => {
    const androidClientId = '545044442094-0smsjslt0hmchuslq10du5capkgre3ji.apps.googleusercontent.com';
    const iosClientId = '545044442094-052aktbotof9bogna5n8ld42g6v7aue1.apps.googleusercontent.com';
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId,
        iosClientId,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        return result.accessToken;
      } else {
        return {cancelled: true};
      }
    } catch(e) {
      return {error: true};
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
        <Button
          disabled={!email || !password}
          title='Sign in'
          buttonStyle={{backgroundColor: '#477EFF'}}
          disabledStyle={{backgroundColor: '#7D8A99'}}
          disabledTitleStyle={{color: '#4b525b'}}
          // @todo: Do this on successful log in
          onPress={this.signInWithEmail}
          containerStyle={{
            marginTop: 10,
            marginBottom: 10
          }}
        />
        <Button
          title='Sign in with Facebook'
          buttonStyle={{backgroundColor: '#3A65C1'}}
          onPress={this.signInWithFacebook}
          containerStyle={{
            marginBottom: 10
          }}
        />
        <Button
          title='Sign in with Google'
          buttonStyle={{backgroundColor: '#DC4E41'}}
          onPress={this.signInWithGoogle}
          containerStyle={{
            marginBottom: 20
          }}
        />
        <View
          style={{
            opacity: 0.25,
            marginBottom: 20
          }}
        >
          <Divider />
        </View>
        <Button
          title='Create Account'
          buttonStyle={{backgroundColor: '#EDEDF9'}}
          onPress={this.props.onCreateAccount}
          titleStyle={{
            color: vars.colors.main
          }}
        />
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
