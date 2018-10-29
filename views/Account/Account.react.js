import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import {
  Form,
  Input,
  Button
} from 'components/Form/Form.react';
import {
  Text
} from 'react-native-elements';

import {LightStatusBar} from 'components/LightStatusBar/LightStatusBar.react';
import makeNavigationHeader from 'lib/makeNavigationHeader';
import vars from 'styles/vars';

export default class Account extends React.Component {

  static navigationOptions = makeNavigationHeader(({navigation}) => ({
    title: 'Account',
    leftIcon: 'menu',
    onLeftPress: navigation.openDrawer
  }));

  render() {
    return (
      <Form>
        <LightStatusBar />
        <Text style={styles.container}>
          My account stuff will go here soon...
        </Text>
      </Form>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: vars.sizers.viewPadding,
    flex: 1
  }
});
