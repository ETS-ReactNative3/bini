import {
  Store
} from 'lib/bosque';
import fire from 'resources/Fire';
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

  _handleUserAuth(firebaseUser) {
    this.set('firebaseUser', firebaseUser);
    fire.db.collection(fire.collections.users)
      .doc(firebaseUser.uid)
      .onSnapshot((userSnapshot) => {
        this.set('userData', userSnapshot.data());
      });
  }

  getUserId() {
    return this.firebaseUser
      ? this.firebaseUser.uid
      : null;
  }
}

export const userStore = new UserStore('UserStore');
