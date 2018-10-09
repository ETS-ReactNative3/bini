import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView as RNScrollView,
  StyleSheet
} from 'react-native';
import vars from 'styles/vars';

export class ScrollView extends React.Component {

  static propTypes = {
    contentContainerStyle: PropTypes.object,
    style: PropTypes.object
  }

  static defaultProps = {
    contentContainerStyle: {},
    style: {}
  }

  render() {
    return (
      <RNScrollView
        contentContainerStyle={[
          styles.contentContainerStyle,
          this.props.contentContainerStyle
        ]}
        style={[
          styles.mainStyles,
          this.props.style
        ]}
      >
        {this.props.children}
      </RNScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    padding: vars.sizers.viewPadding
  },
  mainStyles: {
    backgroundColor: vars.colors.bg,
    flex: 1
  }
});
