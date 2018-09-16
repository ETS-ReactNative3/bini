import React from 'react';
import PropTypes from 'prop-types';
import {
  View
} from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage, // @todo: Add this
  Button,
  Divider
} from 'react-native-elements';
import {upperFirst} from 'lodash';
import validator from 'validator';
import firebase from 'firebase';
import fire from 'Fire/Fire';

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
            backgroundColor='#477EFF'
            disabledStyle={{backgroundColor: '#6c7784'}}
            disabledTextStyle={{color: '#4b525b'}}
            // @todo: Do this on successful log in
            onPress={this.signInWithEmail}
          />
        </View>
        <View style={{
          marginBottom: 20
        }}>
          <Button
            title='Sign In With Facebook'
            backgroundColor='#3b5998'
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
            backgroundColor='#EDEDF9'
            color='#5f4b8b'
            onPress={this.props.onCreateAccount}
          />
        </View>
      </View>
    );
  }
}

const SignInField = ({property, value, onChangeText, onFocus, onBlur}) => (
  <View>
    <FormLabel labelStyle={{color: '#fff'}}>
      {upperFirst(property)}
    </FormLabel>
    <FormInput
      autoCapitalize='none'
      autoCorrect={false}
      onChangeText={onChangeText}
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      underlineColorAndroid='#fff'
      textContentType={property}
      inputStyle={{
        color: '#fff',
        paddingLeft: 10
      }}
    />
  </View>
);
