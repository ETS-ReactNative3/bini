import React from 'react';
import {
  View
} from 'react-native';
import {
  Text
} from 'react-native-elements';

import makeNavigationHeader from 'lib/makeNavigationHeader';
import {
  toggleDrawer,
  withNavigationDrawer
} from '../../hocs/withNavigationDrawer';

class Account extends React.Component {

  static navigationOptions = makeNavigationHeader(() => ({
    title: 'Account',
    leftIcon: 'menu',
    onLeftPress: toggleDrawer
  }));

  render() {
    return (
      <View>
        <Text style={{
          fontWeight: 'bold'
        }}>
          My account stuff will go here soon...
        </Text>
      </View>
    );
  }
}

export default withNavigationDrawer(Account);
