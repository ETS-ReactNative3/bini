import React from 'react';
import {Font} from 'expo';
import BlankView from '../../components/BlankView/BlankView.react';

export default class Initializer extends React.Component {

  static navigationOptions = {
    headerStyle: {
      height: 0
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'pacifico': require('../../assets/fonts/Pacifico-Regular.ttf')
    });
    this.props.navigation.replace('Auth');
  }

  render() {
    return <BlankView />;
  }
}
