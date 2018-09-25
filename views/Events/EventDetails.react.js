import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import {
  Form,
  Date,
  Time,
  Input,
  TextArea,
  Button
} from 'components/Form/Form.react';
import makeNavigationHeader from 'lib/makeNavigationHeader';
import {Event} from 'resources/event/event.fire';

export default class EventDetails extends React.Component {

  static navigationOptions = makeNavigationHeader(({navigation}) => ({
    title: 'Create',
    leftIcon: 'keyboard-arrow-left',
    onLeftPress: () => navigation.goBack()
  }));

  state = {
    event: new Event()
  };

  makeInputSetter = (property) => {
    return (value) => {
      this.setState({
        event: this.state.event.set(property, value)
      }, () => {
        console.log(this.state.event.toJS());
      });
    };
  }

  updateName = this.makeInputSetter('name');

  updateLocation = this.makeInputSetter('location');

  updateDescription = this.makeInputSetter('description');

  render() {
    return (
      <View style={styles.container}>
        <Form>
          <Input
            label='Name'
            placeholder='E.g. Pizza Party Fun Times'
            onChangeText={this.updateName}
            value={this.state.event.name}
          />
          <Date
            label='Start Date'
            date='2016-05-15'
            placeholder='Pick a date'
            minDate='2016-05-01'
            // maxDate='2016-06-01'
            onDateChange={() => {}}
          />
          <Time
            label='Start Time'
            placeholder='Pick a time'
            date='20:00'
            onDateChange={() => {}}
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
            value={this.state.event.name}
          />
        </Form>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start'
  }
});
