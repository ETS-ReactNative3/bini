import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import {
  Header,
  Text,
  Icon,
  Button
} from 'react-native-elements';
import {userStore} from 'stores/User/User.store';
import vars from 'styles/vars';

export default class EventDetails extends React.Component {

  static navigationOptions = ({navigation}) => ({
    headerStyle: {
      backgroundColor: vars.colors.purple,
    },
    title: 'Details',
    headerTitleStyle: {
      color: '#fff'
    },
    headerLeft: (
      <Icon
        name='keyboard-arrow-left'
        color='white'
        underlayColor='transparent'
        iconStyle={{
          paddingLeft: 7.5,
          paddingRight: 7.5
        }}
        onPress={() => navigation.goBack()}
      />
    )
  });

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
