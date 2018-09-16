import React from 'react';
import {Font} from 'expo';
import BlankView from 'components/BlankView/BlankView.react';
import fire from 'Fire/Fire';
import {dispatch} from 'lib/bosque';
import {appActions} from 'App.store';

export default class Initializer extends React.Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#5f4b8b',
      height: 0
    }
  }

  state = {
    isReady: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      'pacifico': require('../../assets/fonts/Pacifico-Regular.ttf')
    });
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(appActions.SET_USER, user);
        this.props.navigation.replace('Auth');
      } else {
        this.props.navigation.replace('Auth');
      }
    });
  }

  render() {
    return <BlankView />;
  }
}
