import React from 'react';
import {Font} from 'expo';
import BlankView from '../../components/BlankView/BlankView.react';
import fire from '../../Fire/Fire';

export default class Initializer extends React.Component {

  static navigationOptions = {
    headerStyle: {
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
        console.log(user);
        this.props.navigation.replace('Home');
      } else {
        this.props.navigation.replace('Auth');
      }
    });
  }

  render() {
    return <BlankView />;
  }
}
