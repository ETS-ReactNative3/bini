import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import {Header} from 'react-native-elements';
import Logo from '../../components/Logo/Logo.react';

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{
            icon: 'menu',
            color: '#fff'
          }}
          centerComponent={(
            <Logo
              fontSize={18}
              textStyles={{
                marginTop: 12
              }}
            />
          )}
          rightComponent={{
            icon: 'person',
            color: '#fff'
          }}
          backgroundColor='#5f4b8b'
          innerContainerStyles={{
            alignItems: 'flex-end'
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start'
  }
});