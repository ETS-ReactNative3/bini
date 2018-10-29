import React from 'react';
import {
  Form
} from 'components/Form/Form.react';
import {
  Text
} from 'react-native-elements';

import {LightStatusBar} from 'components/LightStatusBar/LightStatusBar.react';
import makeNavigationHeader from 'lib/makeNavigationHeader';

export default class FindFriends extends React.Component {

  static navigationOptions = makeNavigationHeader(({navigation}) => ({
    title: 'Find Friends',
    leftIcon: 'keyboard-arrow-left',
    onLeftPress: () => navigation.goBack()
  }));

  render() {
    return (
      <Form>
        <LightStatusBar />
        <Text>
          FindFriends FindFriends FindFriends
        </Text>
      </Form>
    );
  }
}