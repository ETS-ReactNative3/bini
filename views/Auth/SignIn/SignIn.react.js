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

export default class SignIn extends React.Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {
    username: '',
    password: '',
    isFocused: false
  };

  render() {
    const {
      username,
      password,
      isFocused
    } = this.state;
    return (
      <View
        enabled
        style={{
          justifyContent: 'flex-start',
          height: '70%'
        }}
      >
        <SignInField
          property='username'
          value={username}
          onChangeText={(username) => this.setState({username})}
          onFocus={() => this.setState({isFocused: true})}
          onBlur={() => this.setState({isFocused: false})}
        />
        <SignInField
          property='password'
          value={password}
          onChangeText={(password) => this.setState({password})}
          onFocus={() => this.setState({isFocused: true})}
          onBlur={() => this.setState({isFocused: false})}
        />
        <View style={{
          marginTop: 20,
          marginBottom: 20
        }}>
          <Button
            disabled={!username || !password}
            title='Sign In'
            backgroundColor='#477EFF'
            disabledStyle={{backgroundColor: '#6c7784'}}
            disabledTextStyle={{color: '#4b525b'}}
            // @todo: Do this on successful log in
            onPress={() => this.props.navigation.replace('Home')}
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
