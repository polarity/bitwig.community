import React from 'react'
import { mapper } from '@reduxless/react'
import styles from './styles.module.css'

const Mapped = mapper({}, {
  logout: (store, ownProps, data) => {
    store.set('loggedInUser', false)
  }
})

export default Mapped(({ children, logout }) =>
  <div>
    {children} <span className={styles.logout} onClick={logout}>logout</span>
  </div>
)
