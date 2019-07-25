import React from 'react'
import { mapper } from '@reduxless/react'
import styles from './styles.module.css'

const Mapped = mapper({}, {
  openLogin: (store, ownProps, data) => {
    store.set('modalLoginState', true)
  }
})

export default Mapped(({openLogin}) =>
  <div>
    <span
      className={styles.login}
      onClick={openLogin}>
      login
    </span>
  </div>
)
