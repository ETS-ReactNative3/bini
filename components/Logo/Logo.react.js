import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class SignIn extends React.Component {

  static propTypes = {
    fontSize: PropTypes.number
  };

  static defaultProps = {
    fontSize: 60
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.text, {fontSize: this.props.fontSize}]}>
          Bini
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontFamily: 'pacifico',
    fontSize: 60,
    textAlign: 'center',
    width: '100%'
  }
});