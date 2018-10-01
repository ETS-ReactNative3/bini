import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView
} from 'react-native';
import {
  Text,
  Icon
} from 'react-native-elements';

import Logo from 'components/Logo/Logo.react';
import Event from 'components/Event/Event.react';
import vars from 'styles/vars';

import {userStore} from 'stores/User/User.store';

import makeNavigationHeader from 'lib/makeNavigationHeader';
import fire from 'resources/Fire';

export default class Home extends React.Component {

  static navigationOptions = makeNavigationHeader(({navigation}) => ({
    headerTitle: <Logo fontSize={20} />,
    leftIcon: 'menu',
    rightIcon: 'person',
    onLeftPress: () => console.log('onLeftPress'),
    onRightPress: () => console.log('onRightPress')
  }));

  state = {
    events: []
  }

  async componentDidMount() {
    fire.db.collection(fire.collections.events).onSnapshot((eventsSnapshot) => {
      const events = [];
      eventsSnapshot.forEach((doc) => {
        events.push(doc.data());
      });
      this.setState({events});
    });
  }

  createEvent = () => {
    this.props.navigation.navigate('EventDetails');
  };

  renderEvents() {
    if (this.state.events.length === 0) {
      return (
        <Text style={{
          color: vars.colors.textMeta,
          fontWeight: 'bold',
          fontStyle: 'italic',
          textAlign: 'center',
          paddingTop: 40
        }}>
          You have no upcoming events
        </Text>
      );
    }

    return this.state.events.map((event) => <Event event={event} key={event.id} />);
  }

  render() {
    return (
      <View style={{
        alignItems: 'stretch',
        backgroundColor: vars.colors.bg,
        flex: 1,
        justifyContent: 'flex-start'
      }}>
        <ScrollView style={{flex: 1}}>
          {this.renderEvents()}
        </ScrollView>
        <BottomButtonRow>
          <Icon
            name='schedule'
            color={vars.colors.main}
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
            color={vars.colors.main}
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
          color={vars.colors.main}
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
        backgroundColor: vars.palette.white,
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
