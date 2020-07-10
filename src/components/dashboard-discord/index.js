import React from 'react'
import firebase from 'firebase/app'

// get the access token from url,
// make request to discord for user ID
const getParams = async () => {
  const accessToken = window.location.href.match(/&access_token=(\w*)&/)
  if (accessToken && accessToken.length > 1) {
    const response = await window.fetch('https://discord.com/api/users/@me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken[1]}`
      }
    })

    const discordUser = await response.json()

    const userDoc = {
      uid: firebase.auth().currentUser.uid,
      discordUid: discordUser.id,
      username: discordUser.username
    }

    // add to firebase
    firebase.firestore()
      .collection('profile')
      .doc(firebase.auth().currentUser.uid)
      .set(userDoc)
      .then((docRef) => console.log('Document written with ID: ', docRef))
      .catch((error) => {
        console.error('Error adding document: ', error)
      })

    return userDoc
  }
}

export default () => {
  getParams()
  return (
    <div>
      cool
    </div>
  )
}

// http://localhost:8000/dashboard/discord-identify#token_type=Bearer&access_token=xlNF2WnQIGXyAh8HaOLjG1DF8WlQ8i&expires_in=604800&scope=identify&state=15773059ghq9183habn
