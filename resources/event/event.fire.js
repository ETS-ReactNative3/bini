import {Record} from 'immutable';
import fire from '../Fire';
import firebase from 'firebase';

const collectionName = 'events';

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

  collectionName = collectionName;

  save() {
    const path = `${collectionName}${this.id ? `/${this.id}`: ''}`;
    const eventRef = fire.app.database().ref(path);
    if (this.id) {
      // @todo: Do this
    } else {
      const newEventRef = eventRef.push();
      newEventRef.set({
        ...this.toJS(),
        id: newEventRef.key,
        createdAt: fire.getServerTimestamp(),
        updatedAt: fire.getServerTimestamp()
      }).then((res) => {
        debugger;
      }).catch((err) => {
        debugger;
      });
    }
  }
}
