import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';

import {getStore} from 'lib/bosque';
import vars from 'styles/vars';
import {
  closeMainDrawer
} from 'App';

import {DrawerStore} from './Drawer.store';

const drawerWidth = 180;
const animationDuration = 200;

export class Drawer extends React.Component {

  constructor(props) {
    super();
    this.store = getStore(props.storeName) || new DrawerStore(props.storeName);
    this.store.subscribe(this);
  }

  state = {
    shadeOpacity: new Animated.Value(0),
    drawerTranslate: new Animated.Value(drawerWidth * -1)
  };

  componentDidUpdate() {
    if (this.store.isOpen) {
      this.animateIn();
    }
  }

  componentWillUnmount() {
    this.store.unsubscribe(this);
  }

  animateIn = () => {
    Animated.timing(
      this.state.shadeOpacity, {
        toValue: 0.5,
        duration: animationDuration
      }
    ).start();
    Animated.timing(
      this.state.drawerTranslate, {
        toValue: 0,
        duration: animationDuration
      }
    ).start();
  };

  animateOut = () => {
    Animated.timing(
      this.state.drawerTranslate, {
        toValue: drawerWidth * -1,
        duration: animationDuration
      }
    ).start();
    Animated.timing(
      this.state.shadeOpacity, {
        toValue: 0,
        duration: animationDuration
      }
    ).start(({finished}) => {
      if (finished) {
        closeMainDrawer();
      }
    });
  };

  render() {
    console.log(this.store.isOpen);
    if (!this.store.isOpen) {
      return null;
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.outerWrapper}>
          <TouchableWithoutFeedback onPress={this.animateOut}>
            <Animated.View
              style={[
                styles.dismissView,
                {opacity: this.state.shadeOpacity}
              ]}
            />
          </TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.drawer,
              {
                transform: [
                  {
                    translateX: this.state.drawerTranslate
                  }
                ]
              }
            ]}
          >
            <Text>
              Hello
              Hello
              Hello
              Hello
              Hello
            </Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%'
  },
  outerWrapper: {
    width: '100%',
    height: '100%'
  },
  drawer: {
    backgroundColor: 'white',
    width: drawerWidth,
    height: '100%'
  },
  dismissView: {
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  }
});
