import Expo from 'expo';
import fire from 'resources/Fire';
import {facebook} from '../../../secrets';

export async function signInWithFacebook() {

  const appId = facebook.appId;
  const permissions = ['public_profile', 'email']; // Permissions required, consult Facebook docs

  const {
    type,
    token,
  } = await Expo.Facebook.logInWithReadPermissionsAsync(
    appId,
    {permissions}
  );

  if (type === 'success') {
    await fire.auth().setPersistence(fire.firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
    const credential = fire.firebase.auth.FacebookAuthProvider.credential(token);
    const facebookProfileData = await fire.firebase.auth().signInAndRetrieveDataWithCredential(credential);  // Sign in with Facebook credential

    // Do something with Facebook profile data
    // OR you have subscribed to auth state change, authStateChange handler will process the profile data
    
    return Promise.resolve({
      type: 'success',
      facebookProfileData
    });
  } else if (type === 'cancel') {
    return Promise.reject({type: 'cancel'});
  }
}
