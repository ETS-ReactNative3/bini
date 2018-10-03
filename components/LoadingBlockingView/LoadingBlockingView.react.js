import React from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native';
import vars from 'styles/vars';

export default class LoadingBlockingView extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          position: 'absolute',
          paddingTop: 40,
          top: 0,
          left: 0,
          height: '100%',
          width: '100%'
        }}
      >
        <ActivityIndicator size='large' color={vars.colors.main} />
      </View>
    );
  }
}