import firebase from 'firebase/app'

export default async (currentUser) => {
  const onSnapshot = await firebase
    .firestore()
    .collection('profile')
    .where('uid', '==', currentUser.uid)
    .get()

  const newData = []
  onSnapshot.forEach((doc) => {
    const newDoc = doc.data()
    newDoc.id = doc.id
    newData.push(newDoc)
  })
  return newData[0]
}
