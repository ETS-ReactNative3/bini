import React from 'react';
import moment from 'moment';
import {
  Form,
  DateInput,
  TimeInput,
  Input,
  TextArea,
  Button
} from 'components/Form/Form.react';
import makeNavigationHeader from 'lib/makeNavigationHeader';
import {Event} from 'resources/event/event.fire';

export default class InviteFriends extends React.Component {

  static navigationOptions = makeNavigationHeader(({navigation}) => ({
    title: 'Create',
    leftIcon: 'keyboard-arrow-left',
    onLeftPress: () => navigation.goBack()
  }));

  state = {
    event: new Event(),
    hasEventError: false
  };

  makeInputSetter = (property) => {
    return (value) => {
      this.setState({
        event: this.state.event.set(property, value)
      });
    };
  }

  updateName = this.makeInputSetter('name');

  updateLocation = this.makeInputSetter('location');

  updateDescription = this.makeInputSetter('description');

  updateDate = (val, dateObj) => {
    const formatted = moment(dateObj).format('YYYY-MM-DD');
    this.setState({
      event: this.state.event.set('startDate', formatted)
    });
  }

  updateTime = (val, dateObj) => {
    const formatted = moment(dateObj).format('hh:mm A');
    this.setState({
      event: this.state.event.set('startTime', formatted)
    });
  }

  handleCreate = async () => {
    const that = this;
    if (!that.state.event.name) {
      this.setState({hasEventError: true});
    } else {
      await this.state.event.save();
      that.props.navigation.pop();
    }
  }

  render() {
    return (
      <Form>
        <Input
          label='Name'
          placeholder='E.g. Pizza Party Fun Times'
          onChangeText={this.updateName}
          value={this.state.event.name}
          errorMessage={this.state.hasEventError
            ? 'This field is required'
            : null}
        />
        <DateInput
          label='Start Date'
          date={this.state.event.startDate}
          placeholder='Pick a date'
          onDateChange={this.updateDate}
        />
        <TimeInput
          label='Start Time'
          placeholder='Pick a time'
          date={this.state.event.startTime}
          onDateChange={this.updateTime}
        />
        <Input
          label='Location'
          placeholder='E.g. 123 Fake St.'
          onChangeText={this.updateLocation}
          value={this.state.event.location}
        />
        <TextArea
          label='Description'
          placeholder='What does the future hold in store?'
          onChangeText={this.updateDescription}
          value={this.state.event.description}
        />
        <Button
          title='Create Plans'
          onPress={this.handleCreate}
        />
      </Form>
    );
  }
}
