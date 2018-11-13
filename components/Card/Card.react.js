import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Card as RNECard} from 'react-native-elements';

export class Card extends React.Component {

  static propTypes = {
    containerStyle: PropTypes.object
  }

  static defaultProps = {
    containerStyle: {}
  }

  render() {
    const {
      containerStyle,
      ...passthroughProps
    } = this.props;
    return (
      <RNECard
        containerStyle={[styles.containerStyle, containerStyle]}
        {...passthroughProps}
      >
        {this.props.children}
      </RNECard>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 0,
    borderRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 4
    },
    shadowOpacity: 0.08,
    shadowRadius: 6
  }
});
