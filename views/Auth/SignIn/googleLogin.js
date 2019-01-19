import Expo from 'expo';
import fire from 'resources/Fire';

export async function signInWithGoogle() {
  const androidClientId = '545044442094-0smsjslt0hmchuslq10du5capkgre3ji.apps.googleusercontent.com';
  const iosClientId = '545044442094-052aktbotof9bogna5n8ld42g6v7aue1.apps.googleusercontent.com';
  try {
    const result = await Expo.Google.logInAsync({
      androidClientId,
      iosClientId,
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      const credential = fire.firebase.auth.GoogleAuthProvider.credential(result);
      const user = await fire.firebase.auth().signInAndRetrieveDataWithCredential(credential);
      return user;
    } else {
      return {cancelled: true};
    }
  } catch(e) {
    return {error: true};
  }
}
