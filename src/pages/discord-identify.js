import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import Typography from '../components/typography'
import { Link } from 'gatsby'
import Footer from '../components/footer'

// get the access token from url,
// make request to discord for user ID
const getParams = async (connectionState, setConnectionState) => {
  // try and get the access token from the url
  const accessToken = window.location.href.match(/&access_token=(\w*)&/)

  // looks like we have an access toke, use it
  // to communicate with the discord api
  if (accessToken && accessToken.length > 1) {
    // get the logged in discord user from discord
    const response = await window.fetch('https://discord.com/api/users/@me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken[1]}`
      }
    })

    const db = firebase.firestore()

    // current logged in user id
    const uid = firebase.auth().currentUser.uid

    // remember discord user id
    const discordUser = await response.json()

    // prepare the new user profile object
    const userDoc = {
      uid: uid,
      discordUid: discordUser.id,
      username: discordUser.username
    }

    // add new user profile doc to firebase
    try {
      const docRef = await db
        .collection('profile')
        .doc(firebase.auth().currentUser.uid)
        .set(userDoc)
      console.log('Document written with ID: ', docRef)
      setConnectionState('success')
    } catch (error) {
      setConnectionState('error')
      console.error('Error adding document: ', error)
    }

    // get presets from the this discord user
    // and add the uid for the logged in user!
    db
      .collection('presets')
      .where('user.id', '==', discordUser.id)
      .get()
      .then((onSnapshot) => {
        // get, change and save the doc
        onSnapshot.forEach((doc) => {
          const newDoc = doc.data()
          newDoc.uid = uid
          db.collection('presets').doc(doc.id).set(newDoc)
        })
      })
      .catch((err) => console.log('cant write preset: ', err))
  }
}

// present the user success or error
export default () => {
  const [connectionState, setConnectionState] = useState('waiting')

  // load data once
  useEffect(() => {
    getParams(connectionState, setConnectionState)
  }, [])

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
      <Footer />
    </div>
  )
}
