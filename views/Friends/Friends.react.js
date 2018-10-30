import React from 'react';
import {ScrollView} from 'react-native';
import {Form} from 'components/Form/Form.react';
import {Friend} from 'components/Friend/Friend.react';
import {
  Text
} from 'react-native-elements';

import {LightStatusBar} from 'components/LightStatusBar/LightStatusBar.react';
import makeNavigationHeader from 'lib/makeNavigationHeader';
import {userStore} from 'stores/User/User.store';

export default class Friends extends React.Component {

  static navigationOptions = makeNavigationHeader(({navigation}) => ({
    title: 'My Friends',
    leftIcon: 'menu',
    rightIcon: 'add',
    onLeftPress: navigation.openDrawer,
    onRightPress: () => navigation.navigate('FindFriends')
  }));

  constructor() {
    super();
    userStore.subscribe(this);
  }

  componentWillUnmount() {
    userStore.unsubscribe(this);
  }

  getFriends() {
    const friends = userStore.userData.friends;
    return friends
      ? Object.values(friends).map((friend, i) => (
        <Friend
          friend={friend}
          key={i}
        />
      )) : (
        <Text>
          Tap the plus on the top right to invite friends!
        </Text>
      );
  }

  render() {
    return (
      <Form>
        <LightStatusBar />
        <ScrollView>
          {this.getFriends()}
        </ScrollView>
      </Form>
    );
  }
}