import {Record} from 'immutable';
import fire from '../Fire';

export const inviteStatus = {
  pending: 'pending',
  maybe: 'maybe',
  accepted: 'accepted'
};

export class Event extends Record({
  name: '',
  startDate: null,
  startTime: null,
  endDate: null, // @todo: implement
  endTime: null, // @todo: implement
  location: '',
  description: '',
  createdAt: null,
  updatedAt: null,
  id: null,
  invited: {} // userId: inviteStatus
}) {

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
