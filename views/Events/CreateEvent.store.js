import {
  Store
} from 'lib/bosque';
import {createEventActions} from './CreateEvent.actions';

class CreateEventStore extends Store {
  constructor(name) {
    super(name);
    this.setInitialData({
      event: null
    });
    this.addListener(createEventActions.SET_EVENT, this.makeSetter('event'));
    this.addListener(createEventActions.RESET, this.reset);
  }
}

export const createEventStore = new CreateEventStore('CreateEventStore');
