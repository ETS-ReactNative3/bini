import React from 'react';
import PropTypes from 'prop-types';
import {Set} from 'immutable';
import {
  ScrollView,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Text,
  Card,
  CheckBox,
  Icon
} from 'react-native-elements';

import {
  Button
} from 'components/Form/Form.react';
import makeNavigationHeader from 'lib/makeNavigationHeader';

import {userStore} from 'stores/User/User.store';
import {createEventStore} from './CreateEvent.store';
import fire from 'resources/Fire';
import vars from 'styles/vars';

/**
 * @todo: Auth rules for reading whose friends you can read
 */

export default class InviteFriends extends React.Component {

  static navigationOptions = makeNavigationHeader(({navigation}) => ({
    title: 'Invite Friends',
    leftIcon: 'keyboard-arrow-left',
    onLeftPress: () => navigation.goBack()
  }));

  state = {
    friends: [],
    invitees: Set(),
    isReady: false
  }

  async componentDidMount() {
    fire.db.collection(fire.collections.friends)
      .doc(userStore.getUserId())
      .get()
      .then((friendsSnapshot) => {
        const friends = Object.entries(friendsSnapshot.data())
          .map(([id, data]) => {
            data.id = id;
            return data;
          });
        this.setState({
          friends,
          isReady: true
        });
      });
  }

  toggleFriend = (friendId) => {
    const method = this.state.invitees.includes(friendId) ? 'delete' : 'add';
    this.setState({
      invitees: this.state.invitees[method](friendId)
    });
  };

  renderFriends = () => {
    /**
     * @todo: No friends view
     */
    return this.state.friends.map((friend, i) => (
      <Friend
        friend={friend}
        toggleFriend={this.toggleFriend}
        isInvited={this.state.invitees.includes(friend.id)}
        key={i}
      />
    ));
  }

  createEvent = async () => {
    await createEventStore.event.save();
    this.props.navigation.replace('Home');
  };

  render() {
    return (
      <ScrollView style={{padding: vars.sizers.viewPadding}}>
        {this.renderFriends()}
        <Button
          title='Create Event'
          onPress={this.createEvent}
        />
      </ScrollView>
    );
  }
}

/**
 * @todo: Component this out
 */
class Friend extends React.Component {

  static propTypes = {
    friend: PropTypes.object,
    toggleFriend: PropTypes.func
  }

  handlePress = () => {
    this.props.toggleFriend(this.props.friend.id);
  };

  render() {
    return (
      <View>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <Card
            containerStyle={{
              margin: 0,
              marginBottom: 15
            }}
            wrapperStyle={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <View style={{marginRight: 10}}>
              <Text style={{
                fontWeight: 'bold'
              }}>
                {this.props.friend.displayName}
              </Text>
              <Text style={{
                fontStyle: 'italic',
                color: vars.colors.textMeta,
                fontSize: 12
              }}>
                @{this.props.friend.username}
              </Text>
            </View>
            <View>
              <Icon
                type='font-awesome'
                name={this.props.isInvited ? 'dot-circle-o' : 'circle-o'}
                color={this.props.isInvited ? vars.colors.main : '#969696'}
              />
            </View>
          </Card>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
