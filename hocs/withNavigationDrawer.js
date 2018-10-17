import React from 'React';
import {View} from 'react-native';

import {dispatch} from 'lib/bosque';
import {Drawer} from 'components/Drawer/Drawer.react';
import {drawerActions} from 'components/Drawer/Drawer.actions';

export const mainDrawerStoreName = 'mainNavigationMenu';

export function withNavigationDrawer(WrappedComponent) {
  return class extends React.Component {

    static navigationOptions = WrappedComponent.navigationOptions;

    render() {
      return (
        <View style={{
          flex: 1,
          height: '100%'
        }}>
          <WrappedComponent {...this.props} />
          <Drawer
            storeName={mainDrawerStoreName}
            navigation={this.props.navigation}
            routeLinks={[{
              label: 'Home',
              to: 'Home'
            }, {
              label: 'Account',
              to: 'Account'
            }]}
          />
        </View>
      );
    }
  };
}

export function openDrawer() {
  dispatch(drawerActions.OPEN_DRAWER, null, mainDrawerStoreName);
}

export function toggleDrawer() {
  dispatch(drawerActions.TOGGLE_DRAWER, null, mainDrawerStoreName);
}
