import React from 'react';
import {
  Icon
} from 'react-native-elements';
import vars from 'styles/vars';

export default function makeNavigationHeader(optionsFunc) {
  return ({navigation}) => {
    const {
      title,
      headerTitle,
      leftIcon,
      rightIcon,
      onLeftPress = () => {},
      onRightPress = () => {}
    } = optionsFunc({navigation});
    const returnObj = {
      headerStyle: {
        backgroundColor: vars.colors.purple
      },
      headerTitleStyle: {
        color: '#fff'
      }
    };
    if (title && !headerTitle) {
      returnObj.title = title;
    }
    if (headerTitle) {
      returnObj.headerTitle = headerTitle;
    }
    const iconStyle = {
      paddingLeft: 7.5,
      paddingRight: 7.5
    };
    if (leftIcon) {
      returnObj.headerLeft = (
        <Icon
          name={leftIcon}
          color='white'
          underlayColor='transparent'
          iconStyle={iconStyle}
          onPress={onLeftPress}
        />
      );
    }
    if (rightIcon) {
      returnObj.headerRight = (
        <Icon
          name={rightIcon}
          color='white'
          underlayColor='transparent'
          iconStyle={iconStyle}
          onPress={onRightPress}
        />
      );
    }
    return returnObj;
  };
}