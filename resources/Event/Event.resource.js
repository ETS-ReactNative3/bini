import {Record} from 'immutable';
import fire from '../Fire';

export const inviteStatuses = {
  pending: 'pending',
  maybe: 'maybe',
  accepted: 'accepted'
};

export class EventResource extends Record({
  createdAt: null,
  creator: null,
  description: '',
  endDate: null, // @todo: implement
  endTime: null, // @todo: implement
  id: null,
  invitees: {}, // userId: {displayName, username, status}
  location: '',
  messages: [],
  name: '',
  startDate: null,
  startTime: null,
  updatedAt: null,
}) {

  static inviteStatuses = inviteStatuses;

  async save() {
    if (this.id) {
      // @todo: Do this
    } else {
      const newEventRef = fire.db
        .collection(fire.collections.events)
        .doc();
      await newEventRef.set({
        ...this.toJS(),
        id: newEventRef.id,
        createdAt: fire.getServerTimestamp(),
        updatedAt: fire.getServerTimestamp()
      }).then((res) => {
        console.log('Event created!', res);
      }).catch((err) => {
        console.error(err);
      });
    }
  }
}
