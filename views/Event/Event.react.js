import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import fire from 'resources/Fire';
import {
  dispatch,
  getStore
} from 'lib/bosque';
import {EventStore} from './Event.store';
import {eventActions} from './Event.actions';

import {
  Input
} from 'components/Form/Form.react';

import makeNavigationHeader from 'lib/makeNavigationHeader';

export default class Event extends React.Component {

  static navigationOptions = makeNavigationHeader(({navigation}) => ({
    title: navigation.state.params.event.name,
    leftIcon: 'keyboard-arrow-left',
    onLeftPress: () => navigation.goBack()
  }));

  constructor(props) {
    super(props);
    this.storeName = `EventStore/${this.event.id}`;
    this.store = getStore(this.storeName) || new EventStore(this.storeName);
    this.store.subscribe(this);
  }

  async componentDidMount() {
    fire.db.collection(fire.collections.eventChats)
      .doc(this.event.id)
      .onSnapshot((chat) => {
        dispatch(eventActions.SET_CHAT, chat.data(), this.storeName);
      });
  }

  componentWillUnmount() {
    this.store.unsubscribe(this);
  }

  get event() {
    return this.props.navigation.state.params.event;
  }

  renderMessages() {
    if (!this.store.isReady) {
      return 'Loading...';
    }
    if (this.store.isEmpty) {
      return 'No chats found :-(';
    }
    return this.store.chat.messages.reduce((acc, message) => {
      return acc + '\n\n' + message.content;
    }, '');
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.messagesWrapper}>
          <Text>
            {this.renderMessages()}
          </Text>
        </ScrollView>
        <View style={styles.inputWrapper}>
          <Input />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  messagesWrapper: {
    backgroundColor: 'pink',
    flexGrow: 1
  },
  inputWrapper: {
    backgroundColor: 'white'
  }
});