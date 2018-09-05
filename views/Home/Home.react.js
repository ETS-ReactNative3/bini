import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import {Header} from 'react-native-elements';

class HomeTitle extends React.Component {
  render() {
    return (
      <Header
        leftComponent={{
          icon: 'menu',
          color: '#fff'
        }}
        centerComponent={{
          text: 'Bini',
          style: {
            color: 'white',
            flex: 1,
            fontFamily: 'pacifico',
            fontSize: 18,
            textAlign: 'center'
          }
        }}
        rightComponent={{
          icon: 'person',
          color: '#fff'
        }}
        backgroundColor='#5f4b8b'
        innerContainerStyles={{
          alignItems: 'center',
        }}
        outerContainerStyles={{
          width: '100%'
        }}
      />
    );
  }
}

export default class Home extends React.Component {

  static navigationOptions = {
    headerTitle: <HomeTitle />
  };

  render() {
    return (
      <View style={styles.container}>

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