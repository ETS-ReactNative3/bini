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
  Button as RNEButton,
  Input as RNEInput,
  ButtonGroup as RNEButtonGroup
} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import LoadingBlockingView from 'components/LoadingBlockingView/LoadingBlockingView.react';
import {ScrollView} from 'components/ViewComponents/ScrollView.react';
import {Card} from 'components/Card/Card.react';
import vars from 'styles/vars';

class Form extends React.Component {

  static propTypes = {
    isReady: PropTypes.bool
  };

  static defaultProps = {
    isReady: true
  };
  render() {
    const {
      isReady,
      children,
      bottomButton
    } = this.props;
    const bottomButtonDisplay = bottomButton
      ? React.cloneElement(bottomButton, {
        pushToBottom: true
      })
      : null;
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={{flex: 1}}
      >
        <ScrollView>
          <Card containerStyle={{
            margin: 0,
            width: '100%'
          }}>
            {children}
            {!isReady ? <LoadingBlockingView /> : null}
          </Card>
          {bottomButtonDisplay}
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
        labelStyle={[styles.label]}
        containerStyle={[styles.container, containerStyle]}
        inputContainerStyle={[styles.inputContainer]}
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

class Input extends React.Component {
  render() {
    return (
      <NormalizedInput {...this.props} />
    );
  }
}

class TextArea extends React.Component {

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
        inputContainerStyle={[styles.inputContainer, {
          paddingTop: 5,
          paddingBottom: 5
        }]}
        {...this.props}
      />
    );
  }
}

class NormalizedDatePicker extends React.Component {
  render() {
    const label = this.props.label
      ? (
        <Text style={styles.label}>
          {this.props.label}
        </Text>
      ) : null;
    return (
      <View style={styles.container}>
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
          showIcon={false}
          {...this.props}
        />
      </View>
    );
  }
}

class DateInput extends React.Component {

  render() {
    return (
      <NormalizedDatePicker
        format='YYYY-MM-DD'
        {...this.props}
        mode='date'
      />
    );
  }
}

class TimeInput extends React.Component {
  render() {
    return (
      <NormalizedDatePicker
        {...this.props}
        mode='time'
        format='hh:mm A'
      />
    );
  }
}

class DatetimeInput extends React.Component {
  render() {
    return (
      <NormalizedDatePicker
        {...this.props}
        mode='datetime'
      />
    );
  }
}

class Button extends React.Component {

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
    const {buttonStyle, ...passthroughProps} = this.props;
    const buttonStyleWithDefaults = {
      backgroundColor: this.props.backgroundColor,
      ...buttonStyle
    };
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

class ButtonGroup extends React.Component {

  static defaultProps = {
    selectedButtonStyle: {},
    containerStyle: {},
    textStyle: {},
    innerBorderStyle: {}
  }

  render() {
    const {
      selectedButtonStyle,
      containerStyle,
      textStyle,
      innerBorderStyle,
      ...rest
    } = this.props;
    return (
      <RNEButtonGroup
        {...rest}
        selectedButtonStyle={{
          backgroundColor: vars.colors.main,
          ...selectedButtonStyle
        }}
        containerStyle={{
          borderRadius: 4,
          borderWidth: 2,
          borderColor: vars.colors.main,
          backgroundColor: 'transparent',
          ...containerStyle
        }}
        textStyle={{
          color: vars.colors.main,
          fontWeight: 'bold',
          ...textStyle
        }}
        innerBorderStyle={{
          color: vars.colors.main,
          width: 2,
          ...innerBorderStyle
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
    width: '100%'
  },
  label: {
    color: vars.colors.text,
    marginBottom: 6,
    fontSize: 14,
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
  inputContainer: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.25)'
  },
  datePickerInput: {
    alignItems: 'flex-start',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%'
  },
  datePickerText: {
    fontSize: 17
  }
});

export {
  Form,
  Input,
  TextArea,
  DateInput,
  TimeInput,
  DatetimeInput,
  Button,
  ButtonGroup
};
