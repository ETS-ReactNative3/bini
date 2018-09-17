import React from 'react';
import {
  StatusBar,
  View,
  SafeAreaView
} from 'react-native';
import {createStackNavigator} from 'react-navigation';

import Initializer from './views/Initializer/Initializer.react';
import Auth from './views/Auth/Auth.react';
import Home from './views/Home/Home.react';
import EventDetails from './views/Events/EventDetails.react';

const RootStack = createStackNavigator({
  Initializer,
  Auth,
  Home,
  EventDetails
}, {
  initialRouteName: 'Initializer'
});

export default class App extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        height: '100%'
      }}>
        <StatusBar  
          barStyle='light-content'
          backgroundColor='#ecf0f1'
        />
        <RootStack />
      </View>
    );
  }
}
