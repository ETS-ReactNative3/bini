import {
  Store,
  makeActions
} from 'lib/bosque';

export const appActions = makeActions([
  'SET_USER'
]);

class AppStore extends Store {
  constructor(name) {
    super(name);
    this.setInitialData({
      user: null,
      poop: 'poopy'
    });
    this.addListener(appActions.SET_USER, this.makeSetter('user'));
  }
}

export const appStore = new AppStore('AppStore');
