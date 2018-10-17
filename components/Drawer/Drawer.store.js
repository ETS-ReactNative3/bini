import {
  Store
} from 'lib/bosque';
import {drawerActions} from './Drawer.actions';

export class DrawerStore extends Store {
  constructor(name) {
    super(name);
    this.setInitialData({
      isOpen: false
    });
    this.addTargetedListener(drawerActions.OPEN_DRAWER, this._openDrawer);
    this.addTargetedListener(drawerActions.CLOSE_DRAWER, this._closeDrawer);
    this.addTargetedListener(drawerActions.TOGGLE_DRAWER, this._toggleDrawer);
  }

  _openDrawer() {
    this.set('isOpen', true);
  }

  _closeDrawer() {
    this.set('isOpen', false);
  }

  _toggleDrawer() {
    this.set('isOpen', !this.isOpen);
  }

}
