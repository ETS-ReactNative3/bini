import firebase from 'firebase';

class Fire {
  constructor(config) {
    this.app = firebase.initializeApp(config);
  }

  // Auth
  auth = () => this.app.auth();
}

export default new Fire({
  apiKey: "AIzaSyBI7TKrXDc7xarS_Sv1-wAy6I3JDeAFRM0",
  authDomain: "bini-8e064.firebaseapp.com",
  databaseURL: "https://bini-8e064.firebaseio.com",
  projectId: "bini-8e064",
  storageBucket: "bini-8e064.appspot.com",
  messagingSenderId: "545044442094"
});
