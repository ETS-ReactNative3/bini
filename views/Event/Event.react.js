import React from 'react';
import {
  View,
  Text
} from 'react-native';
import {List} from 'immutable';
import firebase from 'firebase';
import {GiftedChat} from 'react-native-gifted-chat';

import fire from 'resources/Fire';
import {userStore} from 'stores/User/User.store';
import {eventsListStore} from 'stores/EventsList/EventsList.store';

import makeNavigationHeader from 'lib/makeNavigationHeader';

export default class Event extends React.Component {

  static navigationOptions = makeNavigationHeader(({navigation}) => ({
    title: navigation.state.params.event.name,
    leftIcon: 'keyboard-arrow-left',
    onLeftPress: () => navigation.goBack()
  }));

  
  constructor() {
    super();
    eventsListStore.subscribe(this);
  }
  
  state = {
    messageBody: ''
  };

  componentWillUnmount() {
    eventsListStore.unsubscribe(this);
  }

  get event() {
    return this.props.navigation.state.params.event;
  }

  getMessagesAsGifted() {
    const eventResource = eventsListStore.events.get(this.event.id);
    const messages = List(eventResource.messages).reverse().toJS();
    return messages.map((message, i) => {
      const author = eventResource.invitees[message.userId];
      return {
        _id: i,
        text: message.body,
        createdAt: message.timestamp.toDate(),
        user: {
          _id: message.userId,
          name: author.displayName || `@${author.username}`,
          avatar: author.avatar
        }
      };
    });
  }

  renderMessages() {
    const eventResource = eventsListStore.events.get(this.event.id);
    const messages = eventResource.messages;
    return messages.length === 0
      ? (
        <Text>
          No chats found :-(
        </Text>
      ) : messages.map((message, i) => {
        const author = eventResource.invitees[message.userId];
        return (
          <Message
            isCreator={eventResource.creator === message.userId}
            isCurrentUser={userStore.getUserId() === message.userId}
            displayName={author.displayName}
            username={author.username}
            body={message.body}
            key={i}
          />
        );
      });
  }

  updateMessage = (messageBody) => {
    this.setState({messageBody});
  }

  sendMessage = async ([newMessage]) => {
    const message = {
      body: newMessage.text,
      userId: newMessage.user._id,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date())
    };
    await fire.db.collection(fire.collections.events)
      .doc(this.event.id)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion(message)
      });
  }

  render() {
    return (
      <GiftedChat
        messages={this.getMessagesAsGifted()}
        onSend={this.sendMessage}
        user={{
          _id: userStore.getUserId()
        }}
      />
    );
  }
}

class Message extends React.Component {
  render() {
    const {
      body,
      displayName,
      isCreator,
      isCurrentUser,
      username
    } = this.props;
    return (
      <View style={{
        marginBottom: 10
      }}>
        <Text>
          {displayName ? displayName : `@${username}`}
        </Text>
        <Text>
          {body}
        </Text>
      </View>
    );
  }
}
