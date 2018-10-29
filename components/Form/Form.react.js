import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Platform,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import {
  Text,
  Icon,
  Button as RNEButton,
  Input as RNEInput,
  colors as RNEColors
} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import LoadingBlockingView from 'components/LoadingBlockingView/LoadingBlockingView.react';
import {ScrollView} from 'components/ViewComponents/ScrollView.react';
import vars from 'styles/vars';

export class Form extends React.Component {

  static propTypes = {
    isReady: PropTypes.bool
  };

  static defaultProps = {
    isReady: true
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={{flex: 1}}
      >
        <ScrollView>
          {this.props.children}
          {!this.props.isReady ? <LoadingBlockingView /> : null}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

class NormalizedInput extends React.Component {

  static defaultProps = {
    containerStyle: {},
    errorStyle: {}
  }

  render() {
    const {
      containerStyle,
      errorStyle,
      ...passthroughProps
    } = this.props;

    return (
      <RNEInput
        labelStyle={{color: vars.colors.main}}
        containerStyle={[styles.container, containerStyle]}
        errorStyle={[{
          color: vars.colors.error,
          fontWeight: 'bold',
          ...errorStyle
        }, errorStyle]}
        {...passthroughProps}
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
            dateText: styles.datePickerText,
            placeholderText: styles.datePickerText
          }}
          {...this.props}
        />
      </View>
    );
  }
}

export class DateInput extends React.Component {

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

export class TimeInput extends React.Component {
  render() {
    return (
      <NormalizedDatePicker
        {...this.props}
        mode='time'
        format='hh:mm A'
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

export class DatetimeInput extends React.Component {
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

  static propTypes = {
    buttonStyle: PropTypes.object,
    backgroundColor: PropTypes.string,
    pushToBottom: PropTypes.bool
  };

  static defaultProps = {
    buttonStyle: {},
    backgroundColor: vars.colors.main
  };

  render() {
    const buttonStyleWithDefaults = {
      backgroundColor: this.props.backgroundColor,
      ...this.props.buttonStyle
    };
    // eslint-disable-next-line no-unused-vars
    const {buttonStyle, ...passthroughProps} = this.props;
    return (
      <RNEButton
        containerStyle={this.props.pushToBottom
          ? {
            flex: 1,
            justifyContent: 'flex-end'
          }
          : {}}
        buttonStyle={buttonStyleWithDefaults}
        {...passthroughProps}
      />
    );
  }
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
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%'
  },
  datePickerText: {
    fontSize: 17
  }
});
