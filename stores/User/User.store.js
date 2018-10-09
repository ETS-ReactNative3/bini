import {
  Store
} from 'lib/bosque';
import {userActions} from './User.actions';

class UserStore extends Store {
  constructor(name) {
    super(name);
    this.setInitialData({
      user: null
    });
    this.addListener(userActions.SET_USER, this.makeSetter('user'));
  }

  getUserId() {
    return this.user
      ? this.user.uid
      : null;
  }
}

export const userStore = new UserStore('UserStore');
