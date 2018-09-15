import firebase from 'firebase';
import {firebaseConfig} from '../secrets';

class Fire {
  constructor(config) {
    this.app = firebase.initializeApp(config);
  }

  // Auth
  auth = () => this.app.auth();
}

export default new Fire(firebaseConfig);
