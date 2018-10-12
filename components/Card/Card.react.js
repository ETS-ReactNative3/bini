import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet
} from 'react-native';
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
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.1)',
        shadowOffset: {
          height: 1
        },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        elevation: 1
      }
    })
  }
});
