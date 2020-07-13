import React, { useState } from 'react'
import firebase from 'firebase/app'
import Typography from '../typography'
import { Link } from 'gatsby'

// get the access token from url,
// make request to discord for user ID
const getParams = async (connectionState, setConnectionState) => {
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
    try {
      const docRef = await firebase.firestore()
        .collection('profile')
        .doc(firebase.auth().currentUser.uid)
        .set(userDoc)
      console.log('Document written with ID: ', docRef)
      setConnectionState('success')
    } catch (error) {
      setConnectionState('error')
      console.error('Error adding document: ', error)
    }

    return userDoc
  }
}

export default () => {
  const [connectionState, setConnectionState] = useState('waiting')

  getParams(connectionState, setConnectionState)

  return (
    <div>
      {connectionState === 'success' &&
        <Typography>
          <h1>Success!!</h1>
          <p>You just connected your discord account with your bitwig.community account.!</p>
          <p>you can go back to your <Link to='/dashboard'>Dashboard!</Link></p>
        </Typography>}
      {connectionState === 'error' &&
        <Typography>
          <h1>mhhhhh...</h1>
          <p>something didn't work, try it again</p>
          <p>back to your <Link to='/dashboard'>Dashboard!</Link></p>
        </Typography>}
      {connectionState === 'waiting' &&
        <Typography>
          <h1>Just a moment...</h1>
          <p>If you see this screen for too long, something went wrong. go back to your <Link to='/dashboard'>Dashboard!</Link></p>
        </Typography>}
    </div>
  )
}
