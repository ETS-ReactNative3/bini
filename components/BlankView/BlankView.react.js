import React from 'react';
import PropTypes from 'prop-types';
import {
  View
} from 'react-native';
import vars from 'styles/vars';
import {LightStatusBar} from 'components/LightStatusBar/LightStatusBar.react';

export default class BlankView extends React.Component {

  static propTypes = {
    backgroundColor: PropTypes.string
  };

  static defaultProps = {
    backgroundColor: vars.colors.main
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: this.props.backgroundColor,
          flex: 1
        }}
      >
        <LightStatusBar />
      </View>
    );
  }
}
