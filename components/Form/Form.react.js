import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View,
  Platform,
  StyleSheet
} from 'react-native';
import {
  Text,
  Icon,
  Input as RNEInput,
  colors as RNEColors
} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import vars from 'styles/vars';

/**
 * {
 *   name: value
 * }
 */

export class Form extends React.Component {

  handleChange = () => {

  };

  processChildren = () => {
    return this.props.children;
  };

  render() {
    return (
      <ScrollView style={{
        backgroundColor: vars.colors.bg,
        flex: 1,
        padding: 20
      }}>
        {this.processChildren()}
      </ScrollView>
    );
  }
}

class NormalizedInput extends React.Component {
  render() {
    return (
      <RNEInput
        labelStyle={{color: vars.colors.main}}
        containerStyle={styles.container}
        {...this.props}
      />
    );
  }
}

export class Input extends React.Component {
  render() {
    return (
      <NormalizedInput {...this.props} />
    );
  }
}

export class TextArea extends React.Component {

  static propTypes = {
    numberOfLines: PropTypes.number
  }

  static defaultProps = {
    numberOfLines: 4
  }

  render() {
    return (
      <NormalizedInput
        multiline={true}
        numberOfLines={this.props.numberOfLines}
        inputStyle={{height: this.props.numberOfLines * 22}}
        {...this.props}
      />
    );
  }
}

class NormalizedDatePicker extends React.Component {
  render() {
    const label = this.props.label
      ? (
        <Text style={styles.datePickerLabel}>
          {this.props.label}
        </Text>
      ) : null;
    return (
      <View
        style={styles.container}
      >
        {label}
        <DatePicker
          confirmBtnText='Confirm'
          cancelBtnText='Cancel'
          style={{
            width: '100%'
          }}
          customStyles={{
            dateInput: styles.datePickerInput,
            dateText: styles.datePickerText
          }}
          {...this.props}
        />
      </View>
    );
  }
}

export class Date extends React.Component {
  render() {
    return (
      <NormalizedDatePicker
        format='YYYY-MM-DD'
        {...this.props}
        mode='date'
        iconComponent={(
          <Icon
            type='font-awesome'
            name='calendar-o'
            color={vars.colors.main}
          />
        )}
      />
    );
  }
}

export class Time extends React.Component {
  render() {
    return (
      <NormalizedDatePicker
        {...this.props}
        mode='time'
        format='hh:mm a'
        iconComponent={(
          <Icon
            type='font-awesome'
            name='clock-o'
            color={vars.colors.main}
          />
        )}
      />
    );
  }
}

export class Datetime extends React.Component {
  render() {
    return (
      <NormalizedDatePicker
        {...this.props}
        mode='datetime'
        iconComponent={(
          <Icon
            type='font-awesome'
            name='calendar-o'
            color={vars.colors.main}
          />
        )}
      />
    );
  }
}

export class Button extends React.Component {

}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    width: '100%'
  },
  datePickerLabel: {
    color: vars.colors.main,
    fontSize: 16,
    ...Platform.select({
      ios: {
        fontWeight: 'bold',
      },
      android: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold'
      },
    })
  },
  datePickerInput: {
    alignItems: 'flex-start',
    borderColor: RNEColors.grey3,
    borderWidth: 0,
    borderBottomWidth: 1,
    // borderBottomColor: vars.colors.main,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%'
  },
  datePickerText: {
    fontSize: 17
  }
});
