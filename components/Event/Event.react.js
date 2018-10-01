import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Card
} from 'react-native-elements';
import vars from 'styles/vars';

export default class Event extends React.Component {

  static propTypes = {
    event: PropTypes.object
  }

  render() {
    // Component this out
    return (
      <Card
        title={this.props.event.name}
        titleStyle={{
          textAlign: 'left'
        }}
      >
        <Text style={{
          fontStyle: 'italic',
          color: vars.colors.textMeta,
          fontSize: 12
        }}>
          Start Date: 01.02.2018
        </Text>
        <Text style={{
          fontStyle: 'italic',
          color: vars.colors.textMeta,
          fontSize: 12
        }}>
          Start Time: 01.02.2018
        </Text>
      </Card>
    );
  }
}
