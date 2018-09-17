import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import {
  Text,
  Icon,
  Button
} from 'react-native-elements';
import makeNavigationHeader from 'lib/makeNavigationHeader';

export default class EventDetails extends React.Component {

  static navigationOptions = makeNavigationHeader(({navigation}) => ({
    title: 'Details',
    leftIcon: 'keyboard-arrow-left',
    onLeftPress: () => navigation.goBack()
  }));

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1}}>
          <Text>
            Gotta add a bunch of stuff to this view!
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start'
  }
});
