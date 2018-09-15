import React from 'react';
import {
  StatusBar,
  View
} from 'react-native';
import {createStackNavigator} from 'react-navigation';

import Initializer from './views/Initializer/Initializer.react';
import Auth from './views/Auth/Auth.react';
import Home from './views/Home/Home.react';

const RootStack = createStackNavigator({
  Initializer,
  Auth,
  Home
}, {
  initialRouteName: 'Initializer'
});

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        {/* @todo: Figure out why StatusBar isn't working */}
        <StatusBar
          backgroundColor='#5f4b8b'
          barStyle='dark-content'
        />
        <RootStack />
      </View>
    );
  }
}
