import React from 'react';
import {StatusBar} from 'react-native';

export function LightStatusBar() {
  return (
    <StatusBar
      backgroundColor='transparent'
      barStyle='light-content'
    />
  );
}
