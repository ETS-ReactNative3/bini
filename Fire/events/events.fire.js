import fire from '../Fire';

const collectionName = 'events';

export default {
  createEvent() {
    fire.app.db.collection(collectionName).add({

    })
  }
}