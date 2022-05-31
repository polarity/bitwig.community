import './src/styles/global.css'
import React from 'react'
import { createStore } from '@reduxless/core'
import { Container } from '@reduxless/react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'

/**
 * Reduxless init
 * {
      uid: '',
      displayName: '',
      email: '',
      photoURL: ''
    }
 */
const store = createStore({
  initialState: {
    modalPresetForm: false,
    modalChallengeForm: false,
    modalLoginState: false,
    loggedInUser: false
  }
})

const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DB_URL,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_SENDER_ID,
  measurementId: process.env.GATSBY_FIREBASE_MEASUREMENTID,
  appId: process.env.GATSBY_FIREBASE_APPID
}

window.firebase = firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics().logEvent('app started')

/**
 * firebase init
 * subscribe to the login event
 * and set the localStorage for the user
 */
window.firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    store.set('loggedInUser', {
      uid: user.uid || false,
      displayName: user.displayName || (user.email).split('@')[0],
      email: user.email || '',
      photoURL: user.photoURL || ''
    })
  } else {
  // User is signed out.
    console.log('Logged out')
    store.set('loggedInUser', false)
  }
})

export const wrapRootElement = ({ element }) => {
  return (
    <Container store={store}>
      {element}
    </Container>
  )
}
