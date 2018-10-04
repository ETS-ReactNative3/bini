import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Text,
  Card
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
    invitees: [],
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

  renderFriends = () => {
    /**
     * @todo: No friends view
     */
    return this.state.friends.map((friend, i) => (
      <Friend
        friend={friend}
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
    friend: PropTypes.object
  }

  render() {
    return (
      <View>
        <TouchableWithoutFeedback>
          <Card
            containerStyle={{
              margin: 0,
              marginBottom: 15
            }}
          >
            <View>
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

            </View>
          </Card>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
