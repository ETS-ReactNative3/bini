import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Text,
  Icon
} from 'react-native-elements';

import {Card} from 'components/Card/Card.react';
import vars from 'styles/vars';

export class Friend extends React.Component {

  static propTypes = {
    friend: PropTypes.object,
    toggleFriend: PropTypes.func
  }

  handlePress = () => {
    if (!this.props.toggleFriend) {
      return;
    }
    this.props.toggleFriend(this.props.friend.id);
  };

  render() {
    const isToggleable = this.props.toggleFriend;
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
              {isToggleable ? (
                <Icon
                  type='font-awesome'
                  name={this.props.isInvited ? 'dot-circle-o' : 'circle-o'}
                  color={this.props.isInvited ? vars.colors.main : '#969696'}
                />
              ) : null}
            </View>
          </Card>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}