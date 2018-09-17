import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import {
  Text,
  Icon
} from 'react-native-elements';
import {userStore} from 'stores/User/User.store';
import Logo from 'components/Logo/Logo.react';
import vars from 'styles/vars';
import makeNavigationHeader from 'lib/makeNavigationHeader';

export default class Home extends React.Component {

  static navigationOptions = makeNavigationHeader(({navigation}) => ({
    headerTitle: <Logo fontSize={20} />,
    leftIcon: 'menu',
    rightIcon: 'person',
    onLeftPress: () => console.log('onLeftPress'),
    onRightPress: () => console.log('onRightPress')
  }));

  createEvent = () => {
    this.props.navigation.navigate('EventDetails')
  };

  render() {
    return (
      <View style={{
        alignItems: 'stretch',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'flex-start'
      }}>
        <ScrollView style={{flex: 1}}>
          <Text>
            Hello, {userStore.user.email}!
          </Text>
        </ScrollView>
        <BottomButtonRow>
          <Icon
            name='schedule'
            color={vars.colors.purple}
            containerStyle={{backgroundColor: 'transparent'}}
            iconStyle={{
              paddingRight: 15,
              paddingTop: 7.5,
              paddingBottom: 7.5
            }}
            onPress={() => console.log('tapped plans')}
          />
          <Icon
            name='inbox'
            color={vars.colors.purple}
            containerStyle={{backgroundColor: 'transparent'}}
            iconStyle={{
              paddingLeft: 15,
              paddingTop: 7.5,
              paddingBottom: 7.5
            }}
            onPress={() => console.log('tapped inbox')}
          />
        </BottomButtonRow>
        <AddEventButton
          onPress={this.createEvent}
        />
      </View>
    );
  }
}

class AddEventButton extends React.Component {

  static propTypes = {
    onPress: PropTypes.func
  }

  render() {
    return (
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
          onPress={this.props.onPress}
        />
      </View>
    );
  }
}

class BottomButtonRow extends React.Component {
  render() {
    const width = `${100 / this.props.children.length}%`;
    return (
      <View style={{
        flexDirection: 'row',
        borderTopWidth: 2,
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
        zIndex: 1
      }}>
        {this.props.children.map((child, i) => (
          <View
            style={{width}}
            key={i}
          >
            {child}
          </View>
        ))}
      </View>
    );
  }
}
