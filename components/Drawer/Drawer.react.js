import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import {ListItem} from 'react-native-elements';

import {
  getStore,
  dispatch
} from 'lib/bosque';

import {drawerActions} from './Drawer.actions';
import {DrawerStore} from './Drawer.store';

const drawerWidth = 200;
const animationDuration = 200;

export class Drawer extends React.Component {

  constructor(props) {
    super();
    this.store = getStore(props.storeName) || new DrawerStore(props.storeName);
    this.store.subscribe(this);
  }

  state = {
    shadeOpacity: new Animated.Value(0),
    drawerTranslate: new Animated.Value(drawerWidth * -1),
    shouldRender: false
  };

  componentDidUpdate() {
    if (this.store.isOpen && !this.state.shouldRender) {
      this.setState({
        shouldRender: true
      }, this.animateIn);
      return;
    }
    if (!this.store.isOpen && this.state.shouldRender) {
      this.animateOut();
      return;
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

  animateOut = (onFinish = () => {}) => {
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
        this.setState({
          shouldRender: false
        }, () => {
          onFinish();
        });
      }
    });
  };

  closeDrawer = () => {
    dispatch(drawerActions.CLOSE_DRAWER, null, this.props.storeName);
  };

  makeRouteLinks() {
    return this.props.routeLinks.map((link, i) => (
      <ListItem
        key={i}
        title={link.label}
        onPress={() => {
          this.animateOut(() => {
            this.props.navigation.replace(link.to);
            this.closeDrawer();
          });
        }}
      />
    ));
  }

  render() {
    if (!this.state.shouldRender) {
      return null;
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.outerWrapper}>
          <TouchableWithoutFeedback
            onPress={this.closeDrawer}
          >
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
            {this.makeRouteLinks()}
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
