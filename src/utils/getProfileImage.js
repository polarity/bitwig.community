import firebase from 'firebase/app'
export default async (uid) => {
  return firebase.storage().ref('profile-images/' + uid + '.jpg').getDownloadURL()
}
