import {
  Store
} from 'lib/bosque';
import {userActions} from './User.actions';

class UserStore extends Store {
  constructor(name) {
    super(name);
    this.setInitialData({
      firebaseUser: null,
      userData: null
    });
    this.addListener(userActions.SET_USER, this._handleUserAuth);
  }

  _handleUserAuth([firebaseUser, userData]) {
    this.set('firebaseUser', firebaseUser);
    this.set('userData', userData);
  }

  getUserId() {
    return this.firebaseUser
      ? this.firebaseUser.uid
      : null;
  }
}

export const userStore = new UserStore('UserStore');
