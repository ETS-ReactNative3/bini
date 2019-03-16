import * as firebase from 'firebase';
import 'firebase/firestore';
import {firebaseConfig} from '../secrets';
import {makeConstants} from 'lib/makeConstants';

class Fire {
  constructor(config) {
    this.app = firebase.initializeApp(config);
    this.db = firebase.firestore();
    this.db.settings({
      timestampsInSnapshots: true
    });
    this.firebase = firebase;
  }

  collections = makeConstants(
    'users',
    'events'
  );

  getServerTimestamp = () => firebase.firestore.FieldValue.serverTimestamp();

  auth = () => this.app.auth();
}

export default new Fire(firebaseConfig);
