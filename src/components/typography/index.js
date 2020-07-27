import React from 'react'
import Typo from '../typo'
import styles from './styles.module.css'

export default ({ children }) => {
  return (
    <Typo>
      <div className={styles.content}>
        {children}
      </div>
    </Typo>
  )
}
