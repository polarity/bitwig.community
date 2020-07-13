import React from 'react'
import { mapper } from '@reduxless/react'
import styles from './styles.module.css'
import firebase from 'firebase/app'

const Mapped = mapper({}, {
  logout: (store, ownProps, data) => {
    firebase.auth().signOut().then(() => {
      store.set('loggedInUser', false)
    }).catch((error) => {
      console.log('error: ', error)
    })
  }
})

export default Mapped(({ children, logout }) =>
  <div>
    {children} <span className={styles.logout} onClick={logout}>logout</span>
  </div>
)
