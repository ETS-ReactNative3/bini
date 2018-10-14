import React from 'react';
import {Font} from 'expo';
import BlankView from 'components/BlankView/BlankView.react';
import fire from 'resources/Fire';
import {dispatch} from 'lib/bosque';
import {userActions} from 'stores/User/User.actions';
import vars from 'styles/vars';

export default class Initializer extends React.Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: vars.colors.main,
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
    fire.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const userData = await fire.db.collection(fire.collections.users)
          .doc(user.uid)
          .get();
        dispatch(userActions.SET_USER, [user, userData.data()]);
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
