import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Logo extends React.Component {

  static propTypes = {
    fontSize: PropTypes.number,
    viewStyles: PropTypes.object,
    textStyles: PropTypes.object
  };

  static defaultProps = {
    fontSize: 40,
    viewStyles: {},
    textStyles: {}
  };

  render() {
    return (
      <View style={[styles.container, this.props.viewStyles]}>
        <Text style={[styles.text, this.props.textStyles, {fontSize: this.props.fontSize}]}>
          Bini
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  text: {
    color: '#fff',
    fontFamily: 'pacifico',
    fontSize: 60,
    textAlign: 'center',
    width: '100%'
  }
});