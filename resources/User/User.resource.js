import {Record} from 'immutable';
import fire from '../Fire';

export class UserResource extends Record({
  displayName: '',
  friends: null,
  username: ''
}) {

  static async getUserByUsername(username) {
    let user;
    const match = await fire.db.collection(fire.collections.users)
      .where('username', '==', username)
      .get();
    match.forEach((foundUser) => {
      user = foundUser.data();
    });
    return user ? new UserResource(user) : null;
  }
}
