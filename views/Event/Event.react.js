import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import firebase from 'firebase';

import fire from 'resources/Fire';
import {userStore} from 'stores/User/User.store';
import {eventsListStore} from 'stores/EventsList/EventsList.store';

import {
  Input,
  Button
} from 'components/Form/Form.react';

import makeNavigationHeader from 'lib/makeNavigationHeader';

export default class Event extends React.Component {

  static navigationOptions = makeNavigationHeader(({navigation}) => ({
    title: navigation.state.params.event.name,
    leftIcon: 'keyboard-arrow-left',
    onLeftPress: () => navigation.goBack()
  }));

  state = {
    messageBody: ''
  };

  get event() {
    return this.props.navigation.state.params.event;
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
            username={author.userName}
            body={message.body}
            key={i}
          />
        );
      });
  }

  updateMessage = (messageBody) => {
    this.setState({messageBody});
  }

  sendMessage = async () => {
    const messageBody = this.state.messageBody;
    if (!messageBody) {
      return;
    }
    const message = {
      body: messageBody,
      userId: userStore.getUserId(),
      timestamp: firebase.firestore.Timestamp.fromDate(new Date())
    };
    await fire.db.collection(fire.collections.events)
      .doc(this.event.id)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion(message)
      });
    this.setState({
      messageBody: ''
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.messagesWrapper}>
          {this.renderMessages()}
        </ScrollView>
        <View style={styles.inputWrapper}>
          <Input
            containerStyle={{
              flexGrow: 1,
              width: 'auto'
            }}
            value={this.state.messageBody}
            onChangeText={this.updateMessage}
          />
          <Button
            title='Send'
            onPress={this.sendMessage}
          />
        </View>
      </View>
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
    console.log(this.props);
    return (
      <View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  messagesWrapper: {
    padding: 10,
    flexGrow: 1
  },
  message: {

  },
  inputWrapper: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row'
  }
});
