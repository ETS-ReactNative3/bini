import React from 'react';
import {
  Form
} from 'components/Form/Form.react';
import {
  Text
} from 'react-native-elements';

import {LightStatusBar} from 'components/LightStatusBar/LightStatusBar.react';
import makeNavigationHeader from 'lib/makeNavigationHeader';

export default class Friends extends React.Component {

  static navigationOptions = makeNavigationHeader(({navigation}) => ({
    title: 'My Friends',
    leftIcon: 'menu',
    rightIcon: 'add',
    onLeftPress: navigation.openDrawer,
    onRightPress: () => navigation.navigate('FindFriends')
  }));

  render() {
    return (
      <Form>
        <LightStatusBar />
        <Text>
          Mah franz
        </Text>
      </Form>
    );
  }
}