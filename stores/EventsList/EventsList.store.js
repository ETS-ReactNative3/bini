import {
  OrderedMap,
  List,
  Map
} from 'immutable';
import moment from 'moment';
import {
  Store
} from 'lib/bosque';
import { eventsListActions } from './EventsList.actions';

import fire from 'resources/Fire';
import { EventResource } from 'resources/Event/Event.resource';

class EventsListStore extends Store {
  constructor(name) {
    super(name);
    this.setInitialData(Map({
      events: OrderedMap(),
      hasInit: false
    }));
    this.addListener(eventsListActions.INIT_EVENTS_LIST, this._initEventsList);
  }

  _initEventsList() {
    if (this.hasInit) {
      return;
    }
    this.set('hasInit', true);
    fire.db.collection(fire.collections.events)
      .onSnapshot((eventsSnapshot) => {
        const events = [];
        eventsSnapshot.forEach((doc) => {
          events.push(doc.data());
        });
        const orderedEvents = events.reduce((acc, evt) => {
          return acc.set(evt.id, new EventResource(evt));
        }, Map())
          .sort((a, b) => {
            if (!b.startDate) {
              return -1;
            }
            const aStart = this.getStartDateTimeMoment(a).valueOf();
            const bStart = this.getStartDateTimeMoment(b).valueOf();
            return aStart < bStart ? -1 : 1;
          });
        this.set('events', orderedEvents);
      });
  }

  // @todo: DO THIS
  _handleEventUpdates() {
    // const test = this;
    // fire.db.collection(fire.collections.events)
    //   .onSnapshot((eventsSnapshot) => {
    //     eventsSnapshot.forEach((change) => {
    //       if (change.type === 'added') {
    //         console.log('New city: ', change.doc.data());
    //       }
    //       if (change.type === 'modified') {
    //         console.log('Modified city: ', change.doc.data());
    //       }
    //       if (change.type === 'removed') {
    //         console.log('Removed city: ', change.doc.data());
    //       }
    //     });
    //   });
  }

  getStartDateTimeMoment = (evt) => moment(
    `${evt.startDate} ${evt.startTime || '01:00 AM '}`,
    'YYYY-MM-DD hh:mm A'
  );

  get eventsAsList() {
    return this.events.toList();
  }

  get eventsGroupedByStartDate() {
    return this.events.reduce((acc, evt) => {
      const startDate = evt.startDate;
      if (!acc.has(startDate)) {
        acc = acc.set(startDate, List());
      }
      return acc.update(startDate, (list) => list.push(evt));
    }, OrderedMap());
  }

  get hasEvents() {
    return !this.eventsAsList.isEmpty();
  }
}

export const eventsListStore = new EventsListStore('EventsListStore');
