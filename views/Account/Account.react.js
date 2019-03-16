import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import {NavigationActions} from  'react-navigation';
import {
  Form,
  Input,
  Button
} from 'components/Form/Form.react';
import {
  Text
} from 'react-native-elements';
import fire from 'resources/Fire';

import {LightStatusBar} from 'components/LightStatusBar/LightStatusBar.react';
import makeNavigationHeader from 'lib/makeNavigationHeader';
import vars from 'styles/vars';

export default class Account extends React.Component {

  static navigationOptions = makeNavigationHeader(({navigation}) => ({
    title: 'Account',
    leftIcon: 'menu',
    onLeftPress: navigation.openDrawer
  }));

  signOut = () => {
    fire.auth().signOut();
    this.props.navigation.navigate({
      routeName: 'Events',
      action: NavigationActions.navigate({routeName: 'Auth'})
    });
  };

  render() {
    return (
      <Form>
        <LightStatusBar />
        <Button
          title='Sign Out'
          onPress={this.signOut}
        />
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
