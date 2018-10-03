import {
  Store
} from 'lib/bosque';
import {eventActions} from './Event.actions';

class EventStore extends Store {
  constructor(name) {
    super(name);
    this.setInitialData({
      event: null
    });
    this.addListener(eventActions.SET_EVENT, this.makeSetter('event'));
  }
}

export const userStore = new EventStore('EventStore');
