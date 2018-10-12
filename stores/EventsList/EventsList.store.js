import {
  fromJS,
  List
} from 'immutable';
import {
  Store
} from 'lib/bosque';
import {eventsListActions} from './EventsList.actions';

import {EventResource} from 'resources/Event/Event.resource';

class EventsListStore extends Store {
  constructor(name) {
    super(name);
    this.setInitialData(fromJS({
      eventsList: []
    }));
    this.addListener(eventsListActions.SET_EVENTS_LIST, this._updateEventsList);
  }

  _updateEventsList(events) {
    /**
     * todo: Order the events
     */
    const orderedEvents = List(events.map((event) => new EventResource(event)));
    this.set('eventsList', orderedEvents);
  }
}

export const eventsListStore = new EventsListStore('EventsListStore');
