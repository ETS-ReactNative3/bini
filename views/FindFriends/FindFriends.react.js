import React from 'react';
import {
  Form,
  Input,
  Button
} from 'components/Form/Form.react';
import {
  Text
} from 'react-native-elements';

import {UserResource} from 'resources/User/User.resource';

import makeNavigationHeader from 'lib/makeNavigationHeader';

export default class FindFriends extends React.Component {

  static navigationOptions = makeNavigationHeader(({navigation}) => ({
    title: 'Add Friend',
    leftIcon: 'keyboard-arrow-left',
    onLeftPress: () => navigation.goBack()
  }));

  state = {
    username: '',
    foundUser: undefined
  };

  updateUsername = (username) => {
    this.setState({username});
  };

  handleSearch = async () => {
    const match = await UserResource.getUserByUsername(this.state.username);
    this.setState({foundUser: match});
  };

  render() {
    return (
      <Form>
        <Input
          label={`Friend's username`}
          value={this.state.username}
          onChangeText={this.updateUsername}
        />
        <Button
          title='Search'
          onPress={this.handleSearch}
        />
      </Form>
    );
  }
}