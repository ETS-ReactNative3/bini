import {Record} from 'immutable';
import fire from '../Fire';

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
  updatedAt: '',
  id: null,
  invited: {} // userId: inviteStatus
}) {

  collectionName = collectionName;

  save() {
    fire.app.db.collection(collectionName).add(this.toJS());
  }
}
