import React from 'react';
import {
  StatusBar,
  View,
  StyleSheet
} from 'react-native';
import {
  createStackNavigator
} from 'react-navigation';

import Initializer from './views/Initializer/Initializer.react';
import Auth from './views/Auth/Auth.react';
import Home from './views/Home/Home.react';
import EventDetails from './views/CreateEvent/EventDetails.react';
import InviteFriends from './views/CreateEvent/InviteFriends.react';
import Event from './views/Event/Event.react';
import Account from './views/Account/Account.react';

const RootStack = createStackNavigator({
  Initializer,
  Auth,
  Home,
  EventDetails,
  InviteFriends,
  Event,
  Account
}, {
  initialRouteName: 'Initializer'
});

export const mainDrawerStoreName = 'mainNavigationMenu';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.main}>
        <StatusBar  
          barStyle='light-content'
          backgroundColor='#ecf0f1'
        />
        <RootStack />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: '100%'
  }
});
