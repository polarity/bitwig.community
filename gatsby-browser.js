import './src/styles/global.css'
import React from 'react'
import { createStore } from '@reduxless/core'
import { Container } from '@reduxless/react'
import config from './.env.js'
import firebase from 'firebase/app'
import 'firebase/auth'

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
    modalLoginState: false,
    loggedInUser: false
  }
})
window.firebase = firebase
window.firebase.initializeApp(config)
/**
 * firebase init
 * subscribe to the login event
 * and set the localStorage for the user
 */
window.firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('log in', user)
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
