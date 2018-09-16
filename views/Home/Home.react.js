import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import {
  Header,
  Text,
  Icon
} from 'react-native-elements';
import {appStore} from 'App.store';
import Logo from 'components/Logo/Logo.react';

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
          width: '100%',
          // height: 80,
          // marginTop: 0
        }}
      />
    );
  }
}

export default class Home extends React.Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#5f4b8b'
    },
    headerTitle: (
      <Logo
        fontSize={20}
      />
    ),
    headerLeft: (
      <Icon
        name='menu'
        color='white'
        underlayColor='transparent'
        iconStyle={{
          paddingLeft: 7.5,
          paddingRight: 7.5
        }}
        onPress={() => console.log('tapped menu')}
      />
    ),
    headerRight: (
      <Icon
        name='person'
        color='white'
        underlayColor='transparent'
        iconStyle={{
          paddingLeft: 7.5,
          paddingRight: 7.5
        }}
        onPress={() => console.log('tapped person')}
      />
    )
  };

  render() {
    console.log(appStore.user);
    return (
      <View style={styles.container}>
        <Text>
          Hello, {appStore.user.email}!
        </Text>
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