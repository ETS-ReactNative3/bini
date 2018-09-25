import {Record} from 'immutable';
import fire from '../Fire';

const collectionName = 'events';

export class Event extends Record({
  name: '',
  datetime: null,
  location: '',
  description: '',
  createdAt: null,
  updatedAt: '',
  id: null
}) {

  collectionName = collectionName;

  save() {
    fire.app.db.collection(collectionName).add(this.toJS());
  }
}
