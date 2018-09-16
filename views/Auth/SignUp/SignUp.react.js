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
import fire from 'Fire/Fire';
import vars from 'styles/vars';

export default class SignUp extends React.Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {
    username: '',
    email: '',
    password: ''
  };

  createAccount = async () => {
    if (!validator.isEmail(this.state.email)) {
      return; // @todo: Error messaging under the input if not email
    }
    try {
      const userCredentials = await fire.app.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
      await userCredentials.user.updateProfile({
        username: this.state.username
      });
      this.props.navigation.replace('Home');
    } catch (err) {
      console.warn(err); // @todo: Handle this. Generic error messaging toast?
    }
  };

  stripWhiteSpace

  render() {
    const {
      username,
      email,
      password
    } = this.state;
    console.log(this.state);
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
          property='username'
          value={username}
          onChangeText={(username) => this.setState({username: username.replace(/[^\w-]/g, '')})}
        />
        <SignInField
          property='email'
          value={email}
          onChangeText={(email) => this.setState({email: email.replace(/\s/g, '')})}
        />
        <SignInField
          property='password'
          value={password}
          onChangeText={(password) => this.setState({password: password.replace(/\s/g, '')})}
        />
        <View style={{
          marginTop: 20,
          marginBottom: 20
        }}>
          <Button
            disabled={!username || !email || !password}
            title='Create Account'
            backgroundColor='#477EFF'
            disabledStyle={{backgroundColor: '#6c7784'}}
            disabledTextStyle={{color: '#4b525b'}}
            // @todo: Do this on successful log in
            onPress={this.createAccount}
          />
        </View>
        <View style={{opacity: 0.25}}>
          <Divider />
        </View>
        <View style={{
          marginTop: 20
        }}>
          <Button
            title='Sign In'
            backgroundColor='#EDEDF9'
            color={vars.colors.purple}
            onPress={this.props.onGoToSignIn}
          />
        </View>
      </View>
    );
  }
}

const SignInField = ({property, label, value, onChangeText, onFocus, onBlur}) => (
  <View>
    <FormLabel labelStyle={{color: '#fff'}}>
      {label || upperFirst(property)}
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
