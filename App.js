import React from 'react';
import {
  StatusBar,
  View,
  StyleSheet
} from 'react-native';
import {
  createStackNavigator,
  createDrawerNavigator
} from 'react-navigation';

import Initializer from './views/Initializer/Initializer.react';
import Auth from './views/Auth/Auth.react';
import Home from './views/Home/Home.react';
import EventDetails from './views/CreateEvent/EventDetails.react';
import InviteFriends from './views/CreateEvent/InviteFriends.react';
import Event from './views/Event/Event.react';
import Account from './views/Account/Account.react';
import Friends from './views/Friends/Friends.react';
import FindFriends from './views/FindFriends/FindFriends.react';

const EventStack = createStackNavigator({
  Initializer,
  Auth,
  Home,
  EventDetails,
  InviteFriends,
  Event
}, {
  initialRouteName: 'Initializer'
});

const AccountStack = createStackNavigator({
  Account
}, {
  initialRouteName: 'Account'
});

const FriendsStack = createStackNavigator({
  Friends,
  FindFriends
}, {
  initialRouteName: 'Friends'
});

export default createDrawerNavigator({
  Events: EventStack,
  Friends: FriendsStack,
  Account: AccountStack
}, {
  initialRouteName: 'Events'
});
