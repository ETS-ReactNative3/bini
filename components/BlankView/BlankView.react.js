import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text
} from 'react-native';
import vars from 'styles/vars';

export default class BlankView extends React.Component {

  static propTypes = {
    backgroundColor: PropTypes.string
  };

  static defaultProps = {
    backgroundColor: vars.colors.purple
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
