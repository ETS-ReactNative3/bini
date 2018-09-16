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
import Logo from 'components/Logo/Logo.react';
import vars from 'styles/vars';

export default class Home extends React.Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: vars.colors.purple
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
    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1}}>
          <Text h1>
            Hello, {userStore.user.email}!
          </Text>
        </ScrollView>
        <HomeActions />
      </View>
    );
  }
}

class HomeActions extends React.Component {
  render() {
    return (
      <View style={{
        flexDirection: 'row',
        borderTopWidth: 2,
        borderTopColor: 'rgba(0, 0, 0, 0.1)'
      }}>
        <View style={{width: '50%'}}>
          <Button
            icon={{name: 'schedule'}}
            title='Plans'
            titleStyle={{color: vars.colors.purple}}
            buttonStyle={{backgroundColor: 'transparent'}}
            onPress={() => console.log('tapped plans')}
          />
        </View>
        <View
          pointerEvents='box-none'
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            alignItems: 'center',
            zIndex: 1
          }}
        >
          <Icon
            reverse
            raised
            name='add'
            underlayColor='transparent'
            color={vars.colors.purple}
            onPress={() => console.log('tapped schedule')}
          />
        </View>
        <View style={{width: '50%'}}>
          <Button
            icon={{name: 'inbox'}}
            title='Inbox'
            titleStyle={{color: vars.colors.purple}}
            buttonStyle={{backgroundColor: 'transparent'}}
            onPress={() => console.log('tapped inbox')}
          />
        </View>
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