import React from 'react';
import {
  View,
  Text
} from 'react-native';

import makeNavigationHeader from 'lib/makeNavigationHeader';

export default class Event extends React.Component {

  static navigationOptions = makeNavigationHeader(({navigation}) => ({
    title: navigation.state.params.event.name,
    leftIcon: 'keyboard-arrow-left',
    onLeftPress: () => navigation.goBack()
  }));

  get event() {
    return this.props.navigation.state.params.event;
  }

  render() {
    return (
      <View>
        <Text>
          {JSON.stringify(this.event, null, 2)}
        </Text>
      </View>
    );
  }
}