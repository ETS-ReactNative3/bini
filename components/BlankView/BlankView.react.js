import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text
} from 'react-native';

export default class BlankView extends React.Component {

  static propTypes = {
    backgroundColor: PropTypes.string
  };

  static defaultProps = {
    backgroundColor: '#5f4b8b'
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: this.props.backgroundColor,
          flex: 1
        }}
      />
    );
  }
}
